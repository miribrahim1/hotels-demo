'use server';

import { Client, Databases, ID } from 'node-appwrite';
import { DATABASE_ID } from '@/lib/appwrite';

const BOOKINGS_TABLE_ID = 'bookings';

function getServerDatabases() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  return new Databases(client);
}

export async function submitBooking({ name, email, phone, guests, checkIn, checkOut }) {
  try {
    const databases = getServerDatabases();
    await databases.createDocument(DATABASE_ID, BOOKINGS_TABLE_ID, ID.unique(), {
      type: 'booking',
      name,
      email,
      phone,
      guests: Number(guests),
      checkIn,
      checkOut,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to save booking to Appwrite:', error);
    return { success: false };
  }
}

export async function submitContactMessage({ name, email, message }) {
  try {
    const databases = getServerDatabases();
    await databases.createDocument(DATABASE_ID, BOOKINGS_TABLE_ID, ID.unique(), {
      type: 'contact',
      name,
      email,
      message,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to save contact message to Appwrite:', error);
    return { success: false };
  }
}
