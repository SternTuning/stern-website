import { Resend } from 'resend';

function getApiKey(): string | undefined {
  return process.env.RESEND_API_KEY?.trim() || undefined;
}

/**
 * Resend client for sending emails and managing contacts.
 * Set RESEND_API_KEY in .env.local (e.g. re_xxxxxxxxx) — never commit the key.
 */
export function getResend() {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(apiKey);
}

export function isResendConfigured(): boolean {
  return Boolean(getApiKey());
}
