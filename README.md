# The Verandah — Boutique Hotel Website

A full-stack hotel website built with Next.js (App Router) and Appwrite as the backend. Guests can browse rooms, amenities, and a gallery, and reach out to book a stay — either through a booking form or directly on WhatsApp.

**Live demo:** _add your deployed URL here_

## Features

- Cinematic, scroll-aware hero with a day/night toggle
- Room listing + individual room detail pages, driven entirely by Appwrite data
- Amenities, gallery, and rotating testimonials sections
- Booking form and contact form with client-side validation ([react-hook-form](https://react-hook-form.com/))
- One-click WhatsApp handoff for bookings and enquiries
- Fully responsive, animated with [Framer Motion](https://www.framer.com/motion/)
- SEO: per-page metadata, Open Graph tags, `sitemap.xml`, `robots.txt`

## Tech Stack

| Layer     | Choice                          |
| --------- | -------------------------------- |
| Framework | Next.js 16 (App Router)          |
| UI        | React 19, Tailwind CSS v4        |
| Backend   | [Appwrite](https://appwrite.io/) (Databases) |
| Forms     | react-hook-form                  |
| Animation | Framer Motion                    |
| Icons     | lucide-react                     |

## Backend (Appwrite)

Content is served from an Appwrite database with three collections:

| Collection     | Purpose                                             |
| -------------- | ---------------------------------------------------- |
| `rooms`        | Room name, slug, price, capacity, size, description, image, amenities |
| `amenities`    | Amenity title + description shown on the home and amenities pages |
| `testimonials` | Guest name, location, quote, rating                  |

All reads happen client-side via the public Appwrite Web SDK (`src/lib/appwrite.js`), scoped to `read`-only permissions — no secret keys are shipped to the browser.

## Getting Started

1. **Clone and install**

   ```bash
   git clone https://github.com/miribrahim1/hotels-demo.git
   cd hotels-demo
   npm install
   ```

2. **Set up Appwrite**

   - Create a project at [cloud.appwrite.io](https://cloud.appwrite.io) (or self-host).
   - Create a database with `rooms`, `amenities`, and `testimonials` collections matching the schema above.
   - Set collection permissions to `read: any` only — do not grant public write access.

3. **Configure environment variables**

   Copy `.env.example` to `.env.local` and fill in your Appwrite project details:

   ```bash
   cp .env.example .env.local
   ```

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
| --------------- | ------------------------- |
| `npm run dev`   | Start the dev server      |
| `npm run build` | Production build          |
| `npm run start` | Serve the production build |
| `npm run lint`  | Run ESLint                |

## Project Structure

```
src/
├── app/            # Routes (App Router) — home, rooms, amenities, gallery, contact
├── components/     # UI components (Navbar, Hero, BookingForm, ...)
├── data/           # Static site copy (hotel info, hero images)
└── lib/appwrite.js # Appwrite client + data-fetching helpers
```

## Deployment

Deployed on [Vercel](https://vercel.com). When deploying, add `NEXT_PUBLIC_APPWRITE_ENDPOINT`, `NEXT_PUBLIC_APPWRITE_PROJECT_ID`, and `NEXT_PUBLIC_SITE_URL` as environment variables in your Vercel project settings.

---

Designed & built by [@codebymir](https://github.com/miribrahim1).
