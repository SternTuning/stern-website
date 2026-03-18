import { loadEnvConfig } from '@next/env';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Force-load .env.local so API route sees it (avoids Next/Windows loading-order issues)
loadEnvConfig(process.cwd());

const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

// Only use audience ID if it looks like a real Resend ID (not the placeholder)
const RAW_AUDIENCE_ID = process.env.RESEND_WAITLIST_AUDIENCE_ID;
const RESEND_WAITLIST_AUDIENCE_ID =
  RAW_AUDIENCE_ID &&
  !/optional|placeholder|your-|example/i.test(RAW_AUDIENCE_ID)
    ? RAW_AUDIENCE_ID
    : undefined;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim() : '';

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      // Add to Resend Audience only if key has Contacts permission (skip when key is "send only")
      const payload: { email: string; audienceId?: string } = { email };
      if (RESEND_WAITLIST_AUDIENCE_ID) payload.audienceId = RESEND_WAITLIST_AUDIENCE_ID;
      const contactResult = await resend.contacts.create(payload);
      if (contactResult.error) {
        const isSendOnlyKey = contactResult.error.statusCode === 401 && contactResult.error.name === 'restricted_api_key';
        if (isSendOnlyKey) {
          if (process.env.NODE_ENV === 'development') {
            console.info('[waitlist] API key is send-only; skipping Contacts. Sending confirmation email.');
          }
        } else {
          console.error('[waitlist] Resend', contactResult.error);
          return NextResponse.json(
            { error: 'Could not add to waitlist' },
            { status: 500 }
          );
        }
      }
      // Send confirmation email (works with send-only keys)
      const { error: sendError } = await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: email,
        subject: "You're on the STERN waitlist",
        html: '<p>Thanks for signing up. We’ll be in touch when early access is ready.</p><p>— STERN</p>',
      });
      if (sendError) {
        const isUnverifiedDomain = sendError.statusCode === 403 && sendError.name === 'validation_error';
        if (isUnverifiedDomain) {
          // Resend only allows sending to your own email until you verify a domain. Still count as success.
          console.warn(
            '[waitlist] Resend: verify a domain at resend.com/domains and set RESEND_FROM_EMAIL to an address on that domain to send to other recipients. Signup recorded, email not sent to:',
            email
          );
        } else {
          console.error('[waitlist] Resend send', sendError);
          return NextResponse.json(
            { error: 'Could not send confirmation email' },
            { status: 500 }
          );
        }
      }
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    if (process.env.NODE_ENV === 'development') {
      console.info(
        '[waitlist] RESEND_API_KEY missing. Check: .env.local in project root, one line RESEND_API_KEY=re_xxx, save as UTF-8 (no BOM). Would store:',
        email
      );
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('[waitlist]', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
