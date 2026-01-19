import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, message, url } = body;

    const notificationMessage = message || 'You have got a new message from client';
    const notificationUrl = url || 'https://myorbit.site/dashboard/view';

    const response = await fetch(
      'https://api.onesignal.com/notifications',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Key ${process.env.ONESIGNAL_API_KEY}`,
        },
        body: JSON.stringify({
          app_id: process.env.ONESIGNAL_APP_ID || process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
          headings: { en: 'New Contact Form Submission' },
          contents: { en: notificationMessage },
          included_segments: ['All'],
          url: notificationUrl,
          web_buttons: [
            {
              id: 'view',
              text: 'View Details',
              url: notificationUrl,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to send', details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Notification error:', error);
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
