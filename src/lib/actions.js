'use server';

import { createHash } from 'node:crypto';
import { headers } from 'next/headers';
import { Client, Databases, ID } from 'node-appwrite';
import { DATABASE_ID, getRoomBySlug } from '@/lib/appwrite';
import { validateEnquiry } from '@/lib/validation.mjs';
import { isDemo } from '@/lib/site-config.mjs';
import { allowEnquiry } from '@/lib/rate-limit.mjs';

async function submit(input, type) {
  const { data, errors } = validateEnquiry(input, type);
  if (Object.keys(errors).length) return { success: false, errors, message: 'Please check the highlighted fields.' };

  const requestHeaders = await headers();
  const hash = (value) => createHash('sha256').update(value).digest('hex');
  const ip = process.env.VERCEL ? requestHeaders.get('x-vercel-forwarded-for') : null;
  if (!allowEnquiry(`email:${hash(data.email.toLowerCase())}`) || (ip && !allowEnquiry(`ip:${hash(ip)}`))) {
    return { success: false, message: 'Too many requests. Please try again in 10 minutes.' };
  }

  try {
    let room;
    if (type === 'booking') {
      room = await getRoomBySlug(data.roomSlug);
      if (!room) return { success: false, errors: { roomSlug: 'This room is unavailable. Please choose another room.' }, message: 'Please check your room selection.' };
      const capacity = Number.parseInt(room.capacity, 10);
      if (Number.isFinite(capacity) && data.guests > capacity) {
        return { success: false, errors: { guests: `This room accommodates up to ${capacity} guests.` }, message: 'Please choose a room that fits your group.' };
      }
    }
    // Portfolio visitors can try the flow without storing personal data.
    if (isDemo) return { success: true, demo: true, roomName: room?.name || null };

    if (!process.env.APPWRITE_API_KEY) throw new Error('Missing Appwrite server configuration');
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);
    const document = type === 'booking'
      ? { type, name: data.name, email: data.email, phone: data.phone, guests: data.guests,
          checkIn: data.checkIn, checkOut: data.checkOut,
          message: `Requested room: ${room.name} (${room.slug})` }
      : { type, ...data };
    await new Databases(client).createDocument(DATABASE_ID, 'bookings', ID.unique(), document);
    return { success: true, demo: false, roomName: room?.name || null };
  } catch (error) {
    console.error('Enquiry failed:', error.code || error.name || 'unknown');
    return { success: false, message: 'Your request could not be saved. Your details are still here; please try again shortly.' };
  }
}

export async function submitBooking(input) {
  return submit(input, 'booking');
}

export async function submitContactMessage(input) {
  return submit(input, 'contact');
}
