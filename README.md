# The Verandah — Boutique Hotel Portfolio

A fictional boutique hotel website built with Next.js 16, React 19, Tailwind CSS and Appwrite. Designed and built by [@codebymir](https://github.com/miribrahim1), with AI assistance for implementation and illustrative imagery.

## Portfolio behaviour

The default is **demo mode** (`NEXT_PUBLIC_DEMO_MODE=true`). Visitors can browse rooms, plan dates, select a room and try the booking/contact forms. Both client and server validate the request, then show a summary. Demo submissions do not write personal details to Appwrite, open WhatsApp or make reservations. Use sample contact details when testing.

The hotel details, rates and guest reviews are sample content. The hero and footer identify the site as a portfolio concept. Demo pages use `noindex, follow` metadata so they are not presented in search as a real hotel business; direct portfolio links still work.

## Features

- Responsive hero with day/night view and pointer animation that respects reduced-motion preferences.
- Appwrite-driven rooms, amenities and testimonials; individual room pages with metadata.
- Room-specific imagery, gallery and footer on every page.
- Date and guest selection carried into the booking form; selected room included in the enquiry.
- Shared client/server validation for dates, guests, contact fields and message lengths.
- Accessible form labels, keyboard navigation, mobile-menu focus handling and a skip link.
- Honest pending, success and error states; failed submissions preserve entered details.
- Optional live enquiry storage and an explicit WhatsApp draft handoff.
- Sitemap, robots file and deployment-aware metadata URLs.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Set the Appwrite endpoint, project ID and database ID in `.env.local`. Never commit `.env.local` or server keys. `.env.example` is intentionally tracked and contains no secrets.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite endpoint, including `/v1` |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Public project identifier |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Content database identifier; defaults to the original demo database for compatibility |
| `NEXT_PUBLIC_DEMO_MODE` | Defaults to demo unless explicitly set to `false`; rebuild after changing |
| `NEXT_PUBLIC_SITE_URL` | Public site origin; use localhost only locally |
| `APPWRITE_API_KEY` | Server-only key, required only for live enquiry writes |

Content reads run from Next.js server pages. The public Appwrite SDK configuration contains project identifiers, not a secret key. `node-appwrite` and the API key are used only by server actions for optional live writes.

## Appwrite collections

Use these collection IDs in the configured database. Grant public **read only** access to content collections. Add your deployment domain to the Appwrite project platform configuration where required.

| Collection | Fields used |
| --- | --- |
| `rooms` | `name`, unique `slug`, numeric `price`, `capacity` (such as `2 Guests`), `size`, `description`, `image`, string-array `amenities` |
| `amenities` | `title`, `description` |
| `testimonials` | `name`, `location`, `quote`, integer `rating` (1–5) |

Room images use local paths. Four original non-bedroom placeholders are mapped to `public/images/rooms/` by `src/lib/room-images.mjs`. Later image updates in Appwrite are preserved. New external image hosts must be explicitly allowed in Next.js image configuration before use.

### Optional live enquiries

For real enquiries, create a `bookings` collection in the same database and set `NEXT_PUBLIC_DEMO_MODE=false`. Give this collection **no public read or write permissions**; writes go through server actions with the server key. Provision a server API key with only the document-write scope needed for this project. The public content collections remain read-only.

The collection accepts both booking and contact documents, so booking-only fields must be optional:

| Attribute | Suggested type / size | Required |
| --- | --- | --- |
| `type` | String, 20 (`booking` or `contact`) | Yes |
| `name` | String, 100 | Yes |
| `email` | String, 254 | Yes |
| `message` | String, 2000 | Yes |
| `phone` | String, 30 | No |
| `guests` | Integer, 1–10 | No |
| `checkIn` | String, 10 (`YYYY-MM-DD`) | No |
| `checkOut` | String, 10 (`YYYY-MM-DD`) | No |

Booking documents store the server-resolved room name and slug in `message`. Contact documents store the guest's message there. The live UI confirms that an enquiry was **saved**, never that a reservation was confirmed. After saving, visitors can choose to open a WhatsApp draft and press Send themselves. Set verified hotel contact details in `src/data/hotelData.js` before using live mode.

The forms include a honeypot, input-size limits and a bounded in-memory limiter (five attempts per email per ten minutes, plus an IP bucket on Vercel). This is best-effort spam protection: counters reset on cold starts and are not shared between server instances. For a real public booking service, add a shared rate limiter or hosting firewall rules. Demo mode does not write enquiry data regardless of rate limiting.

## Deployment

1. Connect the repository to Netlify (the current host) or Vercel and set the public Appwrite variables.
2. Keep `NEXT_PUBLIC_DEMO_MODE=true` for the Fiverr portfolio.
3. Set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS domain. If omitted on Netlify or Vercel, metadata uses the host's deployment/production URL; an accidentally retained localhost URL is replaced with that URL. Netlify's `URL` and `DEPLOY_PRIME_URL` variables are supported.
4. Run the checks below, deploy, then verify the public domain on mobile and desktop.
5. Share the deployed URL in the Fiverr portfolio as a **concept/demo project**. No deployment or Fiverr publication is performed by this repository itself.

On other hosts, explicitly configure the public site URL. The site has no live room-inventory, payment or reservation-confirmation system; it demonstrates an enquiry-based booking flow.

## Checks

```bash
npm run lint
npm test
npm run build
npm run start
```

The unit tests cover date boundaries, malformed inputs, guest limits, honeypots, rate-limit expiry, room-image mapping and deployment URL selection. For browser checks, verify the room-to-form handoff, search-prefilled dates, invalid dates, demo summaries, network-failure recovery, day/night view and mobile navigation. No real enquiry should be submitted while testing the portfolio.

## Image provenance

The four additional room interiors were created with the built-in image generation tool. Exact prompts and asset names are recorded in [docs/room-image-prompts.md](docs/room-image-prompts.md). They illustrate a fictional property.

Netlify URL variables follow the [official build environment documentation](https://docs.netlify.com/build/configure-builds/environment-variables/). Pushing to the connected production branch triggers the configured automatic deployment.
