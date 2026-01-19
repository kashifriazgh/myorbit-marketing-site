import { NextResponse } from 'next/server';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAuthCookieName, signAdminSession } from '@/lib/auth';

type LoginRequestBody = {
  idToken?: string;
};

type IdentityToolkitUser = {
  localId?: string;
  email?: string;
};

type IdentityToolkitResponse = {
  users?: IdentityToolkitUser[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginRequestBody;
    const { idToken } = body;

    if (!idToken) {
      return NextResponse.json(
        { error: 'idToken is required' },
        { status: 400 }
      );
    }

    // Verify token via Identity Toolkit (no firebase-admin needed)
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing NEXT_PUBLIC_FIREBASE_API_KEY' },
        { status: 500 }
      );
    }

    const lookupRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      }
    );

    const lookupData = (await lookupRes.json()) as IdentityToolkitResponse;
    const user = lookupData.users?.[0];

    const uid = user?.localId;
    const email = user?.email;

    if (!lookupRes.ok || !uid || !email) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Ensure this user is the (only) admin user
    const adminsRef = collection(db, 'adminUsers');
    const q = query(adminsRef, where('uid', '==', uid), limit(1));
    const snap = await getDocs(q);

    if (snap.empty) {
      return NextResponse.json(
        { error: 'Not authorized. This account is not the admin.' },
        { status: 403 }
      );
    }

    const cookieName = getAuthCookieName();
    const token = await signAdminSession(
      { uid, email, role: 'admin' },
      60 * 60 * 24 * 30 // 30 days
    );

    const response = NextResponse.json({
      success: true,
      uid,
      email,
    });

    response.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    return response;
  } catch (error: unknown) {
    console.error('Error logging in:', error);

    const message =
      error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { error: 'Failed to login', details: message },
      { status: 500 }
    );
  }
}
