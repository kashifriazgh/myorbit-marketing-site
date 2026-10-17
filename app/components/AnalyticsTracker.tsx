'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getClientVisitorId } from '@/lib/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedRef = useRef<{ path: string; timestamp: number } | null>(null);

  useEffect(() => {
    // 1. Skip server-side execution
    if (typeof window === 'undefined') return;

    // 2. Skip tracking for dashboard, login, and internal routes
    if (!pathname || pathname.startsWith('/dashboard') || pathname.startsWith('/api')) {
      return;
    }

    // 3. Prevent duplicate pings for identical path in short window (< 2 seconds)
    const now = Date.now();
    if (
      lastTrackedRef.current &&
      lastTrackedRef.current.path === pathname &&
      now - lastTrackedRef.current.timestamp < 2000
    ) {
      return;
    }
    lastTrackedRef.current = { path: pathname, timestamp: now };

    // 4. Track only when the page is actually visible to a real user
    const sendTrackingPing = () => {
      try {
        const visitorId = getClientVisitorId();
        const payload = {
          visitorId,
          path: pathname,
          referrer: document.referrer || '',
        };

        // Use standard fetch with keepalive to ensure delivery even if navigating
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {
          // Silent catch to prevent any user-facing disruptions
        });
      } catch {
        // Tracker should never crash site
      }
    };

    if (document.visibilityState === 'visible') {
      sendTrackingPing();
    } else {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          sendTrackingPing();
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [pathname]);

  return null;
}
