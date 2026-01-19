import { NextResponse } from 'next/server';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    // Check if any admin user exists in Firestore
    const usersRef = collection(db, 'adminUsers');
    const q = query(usersRef, limit(1));
    const querySnapshot = await getDocs(q);
    
    const userExists = !querySnapshot.empty;
    
    return NextResponse.json({ userExists });
  } catch (error) {
    console.error('Error checking user:', error);
    return NextResponse.json(
      { error: 'Failed to check user', userExists: false },
      { status: 500 }
    );
  }
}

