# STERN logo assets

Use these for the site, favicon, social, and print.

## Where everything is

| File | Use |
|------|-----|
| **`/public/stern-icon.svg`** | Main mark (inherits color). Nav, inline use. |
| **`/public/stern-icon-white.svg`** | White mark on transparent. Dark backgrounds, social, email. |
| **`/app/icon.svg`** | Favicon (tab icon). Black mark; used by Next.js automatically. |

## PNG (for favicon, social, apps)

PNGs are generated from the SVGs. From the project root run:

```bash
npm run export-logo
```

This creates in **`public/`**:

- **`stern-icon-32.png`**, **`stern-icon-180.png`**, **`stern-icon-512.png`** — black mark (favicon, general).
- **`stern-icon-white-32.png`**, **`stern-icon-white-180.png`**, **`stern-icon-white-512.png`** — white mark (dark UIs, social).

Use **32** for favicons, **180** for Apple touch / social, **512** for high-res or app icons.

If you don’t have Node set up, open `stern-icon.svg` or `stern-icon-white.svg` in a browser or design tool and export to PNG at the size you need.
