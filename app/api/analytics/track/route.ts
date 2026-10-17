import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  isBotUser,
  parseDevice,
  parseBrowser,
  parseReferrer,
  getUtcDateString,
  VISITOR_COOKIE_NAME,
} from '@/lib/analytics';
import { getAuthCookieName } from '@/lib/auth';

interface TrackRequestBody {
  visitorId?: string;
  path?: string;
  referrer?: string;
}

export async function POST(request: Request) {
  try {
    const userAgent = request.headers.get('user-agent') || '';

    // 1. Strict Bot Filtering: Never allow bots, spiders, or headless crawlers
    // to pollute marketing metrics.
    if (isBotUser(userAgent)) {
      return NextResponse.json({ success: true, filtered: 'bot' });
    }

    // 2. Ignore internal Admin traffic: Ensure the dashboard owner's visits
    // don't distort marketing analytics.
    const cookieHeader = request.headers.get('cookie') || '';
    const adminCookieName = getAuthCookieName();
    if (cookieHeader.includes(`${adminCookieName}=`)) {
      return NextResponse.json({ success: true, filtered: 'admin' });
    }

    // 3. Ignore router prefetch headers
    const purpose = request.headers.get('purpose') || request.headers.get('x-purpose');
    if (purpose === 'prefetch') {
      return NextResponse.json({ success: true, filtered: 'prefetch' });
    }

    const body = (await request.json().catch(() => ({}))) as TrackRequestBody;
    const path = typeof body.path === 'string' ? body.path.slice(0, 150) : '/';

    // Ignore dashboard and internal routes
    if (path.startsWith('/dashboard') || path.startsWith('/api')) {
      return NextResponse.json({ success: true, filtered: 'internal_route' });
    }

    // 4. Resolve Persistent Visitor ID
    let visitorId = typeof body.visitorId === 'string' && body.visitorId.length >= 8
      ? body.visitorId.trim()
      : null;

    if (!visitorId) {
      // Check cookie
      const match = cookieHeader.match(new RegExp(`(?:^|; )${VISITOR_COOKIE_NAME}=([^;]+)`));
      if (match && match[1]) {
        visitorId = match[1];
      }
    }

    if (!visitorId) {
      visitorId = 'vid_' + Math.random().toString(36).substring(2, 12) + '_' + Date.now();
    }

    const host = request.headers.get('host') || undefined;
    const referrer = typeof body.referrer === 'string' ? body.referrer : request.headers.get('referer');
    const referrerCategory = parseReferrer(referrer, host).replace(/[.#$/[\]]/g, '_'); // sanitize firestore key
    const deviceType = parseDevice(userAgent);
    const browser = parseBrowser(userAgent);
    const dateKey = getUtcDateString(); // YYYY-MM-DD in UTC

    // 5. Database Deduplication Check
    // Day Document: daily_visitors/{dateKey}
    // Visitor Document: daily_visitors/{dateKey}/visitors/{visitorId}
    const dayDocRef = doc(db, 'daily_visitors', dateKey);
    const visitorDocRef = doc(db, 'daily_visitors', dateKey, 'visitors', visitorId);

    const visitorSnap = await getDoc(visitorDocRef);
    const isFirstVisitToday = !visitorSnap.exists();

    if (isFirstVisitToday) {
      // First visit today -> Record unique visitor and atomic increment!
      await setDoc(visitorDocRef, {
        visitorId,
        firstVisitAt: serverTimestamp(),
        lastVisitAt: serverTimestamp(),
        pageViews: 1,
        deviceType,
        browser,
        referrer: referrerCategory,
        landingPath: path,
        userAgent: userAgent.slice(0, 200),
      });

      await setDoc(
        dayDocRef,
        {
          date: dateKey,
          uniqueVisitors: increment(1),
          totalPageViews: increment(1),
          [`devices.${deviceType}`]: increment(1),
          [`browsers.${browser}`]: increment(1),
          [`referrers.${referrerCategory}`]: increment(1),
          lastUpdated: serverTimestamp(),
        },
        { merge: true }
      );
    } else {
      // Duplicate visit for current day:
      // Do NOT increment uniqueVisitors! Only record page view and touch timestamp.
      await setDoc(
        visitorDocRef,
        {
          lastVisitAt: serverTimestamp(),
          pageViews: increment(1),
        },
        { merge: true }
      );

      await setDoc(
        dayDocRef,
        {
          date: dateKey,
          totalPageViews: increment(1),
          lastUpdated: serverTimestamp(),
        },
        { merge: true }
      );
    }

    const response = NextResponse.json({
      success: true,
      visitorId,
      date: dateKey,
      isUniqueToday: isFirstVisitToday,
    });

    // Set or refresh first-party visitor cookie (1 year expiry)
    response.cookies.set(VISITOR_COOKIE_NAME, visitorId, {
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false, // Accessible by tracker for client synchronization
    });

    return response;
  } catch (error) {
    console.error('Error in /api/analytics/track:', error);
    return NextResponse.json(
      { error: 'Failed to record tracking event' },
      { status: 500 }
    );
  }
}
