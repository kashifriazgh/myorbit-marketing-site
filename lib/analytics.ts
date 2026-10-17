/**
 * Professional Analytics & Visitor Deduplication Logic
 * Designed to provide accurate, reliable marketing metrics without duplicate inflation.
 */

export interface DailyVisitorRecord {
  date: string; // YYYY-MM-DD (UTC)
  uniqueVisitors: number;
  totalPageViews: number;
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  browsers: {
    chrome: number;
    safari: number;
    firefox: number;
    edge: number;
    other: number;
  };
  referrers: Record<string, number>;
  lastUpdated?: unknown;
}

export interface AnalyticsSummary {
  todayUnique: number;
  todayPageViews: number;
  yesterdayUnique: number;
  percentageChange: number; // vs yesterday
  sevenDaysUnique: number;
  thirtyDaysUnique: number;
  totalPageViewsInRange: number;
  viewsPerVisitor: number;
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  browserBreakdown: {
    chrome: number;
    safari: number;
    firefox: number;
    edge: number;
    other: number;
  };
  topReferrers: Array<{ source: string; count: number; percentage: number }>;
  history: DailyVisitorRecord[];
}

/**
 * Comprehensive Bot, Crawler, Spider, and Preview fetcher detection.
 * Prevents non-human traffic from skewing marketing analytics.
 */
export function isBotUser(userAgent: string | null | undefined): boolean {
  if (!userAgent || typeof userAgent !== 'string') return true;

  const botPatterns = [
    'bot',
    'crawl',
    'spider',
    'slurp',
    'mediapartners-google',
    'googlebot',
    'bingbot',
    'yandexbot',
    'duckduckbot',
    'baiduspider',
    'applebot',
    'sogou',
    'exabot',
    'facebookexternalhit',
    'whatsapp',
    'telegrambot',
    'twitterbot',
    'pinterest',
    'slackbot',
    'discordbot',
    'linkedinbot',
    'curl',
    'wget',
    'python',
    'postman',
    'lighthouse',
    'headlesschrome',
    'bytespider',
    'phantomjs',
    'prerender',
    'embedly',
    'quora link preview',
    'ahrefsbot',
    'semrushbot',
    'mj12bot',
    'dotbot',
    'rogerbot',
  ];

  const lowerUa = userAgent.toLowerCase();
  return botPatterns.some((pattern) => lowerUa.includes(pattern));
}

/**
 * Detect device type from user agent string
 */
export function parseDevice(userAgent: string | null | undefined): 'mobile' | 'tablet' | 'desktop' {
  if (!userAgent) return 'desktop';
  const ua = userAgent.toLowerCase();

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Detect browser family from user agent
 */
export function parseBrowser(userAgent: string | null | undefined): 'chrome' | 'safari' | 'firefox' | 'edge' | 'other' {
  if (!userAgent) return 'other';
  const ua = userAgent.toLowerCase();

  if (ua.includes('edg/') || ua.includes('edge/')) {
    return 'edge';
  }
  if (ua.includes('firefox/') || ua.includes('fxios/')) {
    return 'firefox';
  }
  // Chrome user agents contain Safari, so check chrome before safari
  if (ua.includes('chrome/') || ua.includes('crios/')) {
    return 'chrome';
  }
  if (ua.includes('safari/') && !ua.includes('chrome/')) {
    return 'safari';
  }
  return 'other';
}

/**
 * Normalize and categorize referrer URL
 */
export function parseReferrer(referrer: string | null | undefined, currentHost?: string): string {
  if (!referrer || referrer.trim() === '') return 'Direct / None';

  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase().replace(/^www\./, '');

    if (currentHost && (host === currentHost.toLowerCase() || host.includes('localhost'))) {
      return 'Direct / None';
    }

    if (host.includes('google.')) return 'Google Search';
    if (host.includes('bing.')) return 'Bing Search';
    if (host.includes('yahoo.')) return 'Yahoo Search';
    if (host.includes('duckduckgo.')) return 'DuckDuckGo';
    if (host.includes('baidu.')) return 'Baidu';
    if (host.includes('t.co') || host.includes('twitter.') || host.includes('x.com')) return 'Twitter / X';
    if (host.includes('linkedin.')) return 'LinkedIn';
    if (host.includes('facebook.') || host.includes('fb.com')) return 'Facebook';
    if (host.includes('instagram.')) return 'Instagram';
    if (host.includes('reddit.')) return 'Reddit';
    if (host.includes('youtube.')) return 'YouTube';
    if (host.includes('github.')) return 'GitHub';

    return host;
  } catch {
    return 'Direct / None';
  }
}

/**
 * Format UTC Date string YYYY-MM-DD
 */
export function getUtcDateString(date = new Date()): string {
  return date.toISOString().split('T')[0];
}

/**
 * Client-side Cookie & LocalStorage persistent ID manager.
 * Guarantees a persistent, first-party visitor identifier (365 days).
 */
export const VISITOR_COOKIE_NAME = '_orbit_vid';
export const VISITOR_LAST_DATE_KEY = '_orbit_last_visit_date';

export function getClientVisitorId(): string {
  if (typeof window === 'undefined') return '';

  // 1. Try localStorage
  let vid = localStorage.getItem(VISITOR_COOKIE_NAME);

  // 2. Try cookie
  if (!vid) {
    const match = document.cookie.match(new RegExp('(^| )' + VISITOR_COOKIE_NAME + '=([^;]+)'));
    if (match && match[2]) {
      vid = match[2];
    }
  }

  // 3. Generate new cryptographically secure UUID if not found
  if (!vid) {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      vid = crypto.randomUUID();
    } else {
      vid = 'vid_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();
    }
  }

  // 4. Sync to both localStorage & cookie (1 year expiry)
  try {
    localStorage.setItem(VISITOR_COOKIE_NAME, vid);
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `${VISITOR_COOKIE_NAME}=${vid}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
  } catch {
    // Ignore storage restrictions (e.g. private mode)
  }

  return vid;
}
