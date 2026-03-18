import { NextResponse } from 'next/server';
import { getResend, isResendConfigured } from '@/lib/resend';

/**
 * Test route to verify Resend works.
 * POST with { "to": "your@email.com" } or we use RESEND_TEST_TO from env.
 * Replace re_xxxxxxxxx with your real API key in .env.local (RESEND_API_KEY).
 */
export async function POST(request: Request) {
  if (!isResendConfigured()) {
    return NextResponse.json(
      {
        error: 'Set RESEND_API_KEY in .env.local',
        hint: 'Add RESEND_API_KEY=re_xxxxx to .env.local then restart the dev server (npm run dev).',
      },
      { status: 503 }
    );
  }
  try {
    const body = await request.json().catch(() => ({}));
    const to =
      typeof body?.to === 'string'
        ? body.to.trim()
        : process.env.RESEND_TEST_TO;
    if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return NextResponse.json(
        { error: 'Provide "to" in the request body or set RESEND_TEST_TO in .env.local' },
        { status: 400 }
      );
    }
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 });
  } catch (err) {
    console.error('[test-email]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Something went wrong' },
      { status: 500 }
    );
  }
}
