import { Client, Account, Databases, Query } from "appwrite";
import { withRoomImage } from './room-images.mjs';

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "6a576c1000230598e84c";
const ROOMS_TABLE_ID = "rooms";
const AMENITIES_TABLE_ID = "amenities";
const TESTIMONIALS_TABLE_ID = "testimonials";

export async function getRooms() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, ROOMS_TABLE_ID, [Query.limit(100)]);
    return response.documents.map(withRoomImage);
  } catch (error) {
    console.warn("Failed to fetch rooms:", error);
    return [];
  }
}

export async function getRoomBySlug(slug) {
  try {
    const response = await databases.listDocuments(DATABASE_ID, ROOMS_TABLE_ID, [
      Query.equal("slug", slug),
    ]);
    return withRoomImage(response.documents[0] || null);
  } catch (error) {
    console.warn("Failed to fetch room:", error);
    return null;
  }
}

export async function getAmenities() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, AMENITIES_TABLE_ID);
    return response.documents;
  } catch (error) {
    console.warn("Failed to fetch amenities:", error);
    return [];
  }
}

export async function getTestimonials() {
  try {
    const response = await databases.listDocuments(DATABASE_ID, TESTIMONIALS_TABLE_ID);
    return response.documents;
  } catch (error) {
    console.warn("Failed to fetch testimonials:", error);
    return [];
  }
}

export { client, account, databases, DATABASE_ID };
