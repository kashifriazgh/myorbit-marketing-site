import { NextResponse } from 'next/server';
import {
  collection,
  getDocs,
  query,
  limit,
  addDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getAuthCookieName, signAdminSession } from '@/lib/auth';

/**
 * Firebase Identity Toolkit response types
 */
interface FirebaseLookupUser {
  localId: string;
  email?: string;
}

interface FirebaseLookupResponse {
  users?: FirebaseLookupUser[];
  error?: {
    message: string;
  };
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== 'object' ||
      body === null ||
      !('idToken' in body) ||
      typeof (body as { idToken?: unknown }).idToken !== 'string'
    ) {
      return NextResponse.json(
        { error: 'idToken is required' },
        { status: 400 }
      );
    }

    const { idToken } = body as { idToken: string };

    /**
     * Ensure only one admin user exists
     */
    const usersRef = collection(db, 'adminUsers');
    const q = query(usersRef, limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json(
        {
          error:
            'Admin user already exists. Only one admin user is allowed.',
        },
        { status: 403 }
      );
    }

    /**
     * Verify Firebase ID token via Identity Toolkit
     */
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

    const lookupData =
      (await lookupRes.json()) as FirebaseLookupResponse;

    const user = lookupData.users?.[0];
    const uid = user?.localId;
    const email = user?.email;

    if (!lookupRes.ok || !uid || !email) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    /**
     * Store admin user record
     */
    await addDoc(collection(db, 'adminUsers'), {
      uid,
      email,
      createdAt: new Date(),
    });

    /**
     * Create admin session cookie
     */
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
    console.error('Error creating user:', error);

    const message =
      error instanceof Error
        ? error.message
        : 'Unknown server error';

    return NextResponse.json(
      { error: 'Failed to create user', details: message },
      { status: 500 }
    );
  }
}
