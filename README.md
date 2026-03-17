# STERN

Premium Mercedes-AMG tuning platform. Next.js 14, TypeScript, Tailwind, React Three Fiber.

## Waitlist & backend

Signups from **Early Access** POST to `/api/waitlist`. To persist them and use as a **waitlist + newsletter**:

1. **Resend** (recommended): one list for early access and for sending updates.
   - Sign up at [resend.com](https://resend.com), create an API key and (optionally) an Audience.
   - In the dashboard, create an Audience (e.g. “Waitlist”) and copy its ID.
   - Add to `.env.local`:
     - `RESEND_API_KEY=re_xxxxx`
     - `RESEND_WAITLIST_AUDIENCE_ID=your-audience-id` (optional; if set, contacts are added to this audience)
   - Contacts are stored in Resend; you can email them via Resend when you launch.

2. **Organizing signups:** Treat the waitlist as your first mailing list. When you’re ready, send one email for “early access is live” and later use the same list for product/news (with unsubscribe).

No Resend key? The form still returns success in dev; in production you should set `RESEND_API_KEY` so signups are stored.

### Testing the email API (PowerShell)

On Windows, `curl` is an alias for `Invoke-WebRequest`, which uses different syntax. Use one of these:

**Option 1 — Invoke-RestMethod (simplest):**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/test-email" -Method POST -ContentType "application/json" -Body '{"to":"solimanyassin@gmail.com"}'
```

**Option 2 — If you set RESEND_TEST_TO in .env.local**, you can POST with an empty body:
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/test-email" -Method POST -ContentType "application/json" -Body "{}"
```

**Option 3 — Using curl.exe (real curl, not PowerShell’s alias):**
```powershell
curl.exe -X POST http://localhost:3000/api/test-email -H "Content-Type: application/json" -d "{\"to\": \"solimanyassin@gmail.com\"}"
```

Ensure the dev server is running (`npm run dev`) and `RESEND_API_KEY` is set in `.env.local`.  
**If you get 503:** the API key isn’t loaded. Add `RESEND_API_KEY=re_xxxxx` to `.env.local` (replace with your real key from [resend.com](https://resend.com)), save, then **restart the dev server** so Next.js picks up the new env.

## Company email (hello@yourdomain.com)

**Best approach once you have a domain:**

- **Domain email** (e.g. `hello@stern-tuning.com`) looks professional and matches the site.
- **Option A – Google Workspace:** Paid; you get Gmail with your domain (e.g. `hello@yourdomain.com`). Good if you want full Gmail and Drive.
- **Option B – Cloudflare Email Routing (free):** Add your domain to Cloudflare, enable Email Routing, create `hello@yourdomain.com` (and others) and forward to your personal Gmail. You can reply from Gmail “as” that address (set up send-as in Gmail with the SMTP details Cloudflare gives you). No cost.
- **Option C – Zoho Mail:** Free tier for one domain and a few addresses.

Use the **same domain and company email** everywhere: website, Instagram, X, Facebook, and in Resend as the “from” address when you send waitlist emails.

## Social (Instagram, X, Facebook)

- Create accounts with the same handle/name (e.g. STERN or stern.tuning).
- In bios, link to this site and (optionally) the same company email.
- No extra tech; just point “Website” to your deployed URL.

## Logo & favicon

**Where the logo files are:**

| What | Path | Use |
|------|------|-----|
| Favicon (tab icon) | `app/icon.svg` | Used by Next.js automatically. |
| Main mark (SVG) | `public/stern-icon.svg` | Nav, inline; inherits color. |
| White mark (SVG) | `public/stern-icon-white.svg` | Dark backgrounds, social, email. |
| **PNG (all sizes)** | `public/stern-icon-32.png`, `stern-icon-180.png`, `stern-icon-512.png` | Favicon, app icons, general. |
| **PNG white** | `public/stern-icon-white-32.png`, `-180.png`, `-512.png` | Dark UIs, social, email. |

To regenerate PNGs from the SVGs, run: **`npm run export-logo`**. More detail in **`public/LOGO-README.md`**.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
