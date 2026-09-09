import { getRooms } from '@/lib/appwrite';

import { resolveSiteUrl } from '@/lib/site-config.mjs';
const siteUrl = resolveSiteUrl();

export default async function sitemap() {
  const rooms = await getRooms();

  const staticRoutes = ['', '/rooms', '/amenities', '/gallery', '/contact'].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const roomRoutes = rooms.map((room) => ({
    url: `${siteUrl}/rooms/${room.slug}`,
    lastModified: room.$updatedAt ? new Date(room.$updatedAt) : new Date(),
  }));

  return [...staticRoutes, ...roomRoutes];
}
