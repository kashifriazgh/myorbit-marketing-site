import { NextResponse } from 'next/server';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DailyVisitorRecord, AnalyticsSummary, getUtcDateString } from '@/lib/analytics';
import { getAuthCookieName, verifyAdminSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    // 1. Authenticate admin user
    const cookieHeader = request.headers.get('cookie') || '';
    const adminCookieName = getAuthCookieName();
    const match = cookieHeader.match(new RegExp(`(?:^|; )${adminCookieName}=([^;]+)`));
    const token = match ? match[1] : null;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      await verifyAdminSession(token);
    } catch {
      return NextResponse.json({ error: 'Invalid admin session' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const rangeParam = parseInt(searchParams.get('range') || '30', 10);
    const safeRange = [7, 14, 30, 90].includes(rangeParam) ? rangeParam : 30;

    // 2. Fetch daily records from Firestore
    const dailyRef = collection(db, 'daily_visitors');
    const q = query(dailyRef, orderBy('date', 'desc'), limit(safeRange));
    const querySnapshot = await getDocs(q);

    const records: DailyVisitorRecord[] = querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        date: data.date || docSnap.id,
        uniqueVisitors: Number(data.uniqueVisitors || 0),
        totalPageViews: Number(data.totalPageViews || 0),
        devices: {
          desktop: Number(data.devices?.desktop || 0),
          mobile: Number(data.devices?.mobile || 0),
          tablet: Number(data.devices?.tablet || 0),
        },
        browsers: {
          chrome: Number(data.browsers?.chrome || 0),
          safari: Number(data.browsers?.safari || 0),
          firefox: Number(data.browsers?.firefox || 0),
          edge: Number(data.browsers?.edge || 0),
          other: Number(data.browsers?.other || 0),
        },
        referrers: (data.referrers || {}) as Record<string, number>,
      };
    });

    const todayStr = getUtcDateString();
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStr = getUtcDateString(yesterdayDate);

    // Map by date for quick lookup
    const recordMap = new Map<string, DailyVisitorRecord>();
    records.forEach((r) => recordMap.set(r.date, r));

    const todayRecord = recordMap.get(todayStr);
    const yesterdayRecord = recordMap.get(yesterdayStr);

    const todayUnique = todayRecord?.uniqueVisitors || 0;
    const todayPageViews = todayRecord?.totalPageViews || 0;
    const yesterdayUnique = yesterdayRecord?.uniqueVisitors || 0;

    let percentageChange = 0;
    if (yesterdayUnique > 0) {
      percentageChange = Math.round(((todayUnique - yesterdayUnique) / yesterdayUnique) * 100);
    } else if (todayUnique > 0) {
      percentageChange = 100;
    }

    // Build complete consecutive dates array for the chart
    const fullHistory: DailyVisitorRecord[] = [];
    let totalUniqueInRange = 0;
    let totalPageViewsInRange = 0;

    const deviceTotals = { desktop: 0, mobile: 0, tablet: 0 };
    const browserTotals = { chrome: 0, safari: 0, firefox: 0, edge: 0, other: 0 };
    const referrerTotals: Record<string, number> = {};

    for (let i = safeRange - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = getUtcDateString(d);
      const existing = recordMap.get(dStr);

      if (existing) {
        fullHistory.push(existing);
        totalUniqueInRange += existing.uniqueVisitors;
        totalPageViewsInRange += existing.totalPageViews;

        deviceTotals.desktop += existing.devices.desktop;
        deviceTotals.mobile += existing.devices.mobile;
        deviceTotals.tablet += existing.devices.tablet;

        browserTotals.chrome += existing.browsers.chrome;
        browserTotals.safari += existing.browsers.safari;
        browserTotals.firefox += existing.browsers.firefox;
        browserTotals.edge += existing.browsers.edge;
        browserTotals.other += existing.browsers.other;

        Object.entries(existing.referrers).forEach(([ref, count]) => {
          referrerTotals[ref] = (referrerTotals[ref] || 0) + Number(count);
        });
      } else {
        fullHistory.push({
          date: dStr,
          uniqueVisitors: 0,
          totalPageViews: 0,
          devices: { desktop: 0, mobile: 0, tablet: 0 },
          browsers: { chrome: 0, safari: 0, firefox: 0, edge: 0, other: 0 },
          referrers: {},
        });
      }
    }

    // Compute last 7 days unique visitors sum
    let sevenDaysUnique = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = getUtcDateString(d);
      sevenDaysUnique += recordMap.get(dStr)?.uniqueVisitors || 0;
    }

    // Top referrers list with percentage
    const totalReferrals = Object.values(referrerTotals).reduce((a, b) => a + b, 0);
    const topReferrers = Object.entries(referrerTotals)
      .map(([source, count]) => ({
        source,
        count,
        percentage: totalReferrals > 0 ? Math.round((count / totalReferrals) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    const viewsPerVisitor =
      totalUniqueInRange > 0
        ? parseFloat((totalPageViewsInRange / totalUniqueInRange).toFixed(1))
        : 1.0;

    const summary: AnalyticsSummary = {
      todayUnique,
      todayPageViews,
      yesterdayUnique,
      percentageChange,
      sevenDaysUnique,
      thirtyDaysUnique: totalUniqueInRange,
      totalPageViewsInRange,
      viewsPerVisitor,
      deviceBreakdown: deviceTotals,
      browserBreakdown: browserTotals,
      topReferrers,
      history: fullHistory,
    };

    return NextResponse.json({
      success: true,
      range: safeRange,
      summary,
    });
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics statistics' },
      { status: 500 }
    );
  }
}
