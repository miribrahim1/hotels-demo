// src/data/hotelData.js

export const hotelInfo = {
  name: "The Verandah",
  tagline: "Where every stay tells a story",
  description:
    "Nestled amid manicured gardens and warm stone architecture, The Verandah blends modern minimalism with timeless hospitality — a retreat designed for those who notice the details.",
  phone: "+91 98765 43210",
  email: "stay@theverandah.com",
  address: "12 Lakeview Road, Shantiniketan, West Bengal",
};

// Images used in the scroll-driven hero journey
export const heroJourney = [
  {
    id: "exterior",
    image: "/images/hero/01-exterior.png",
    label: "Arrival",
    title: "Arrive in Style",
    subtitle: "A warm welcome from the moment you step in",
  },
  {
    id: "lobby",
    image: "/images/hero/02-lobby.png",
    label: "Lobby",
    title: "A Space to Unwind",
    subtitle: "Elegant interiors designed for comfort",
  },
  {
    id: "room",
    image: "/images/hero/03-room.png",
    label: "Rooms",
    title: "Rest, Reimagined",
    subtitle: "Rooms crafted for a good night's sleep",
  },
  {
    id: "pool",
    image: "/images/hero/04-pool.png",
    label: "Pool",
    title: "Slip Into the Blue",
    subtitle: "A private infinity pool, just steps away",
  },
  {
    id: "garden",
    image: "/images/hero/05-garden.png",
    label: "Garden",
    title: "Evenings Under the Stars",
    subtitle: "Garden barbeques and warm conversations",
  },
];

// Final hero frame — day/night toggle
export const heroFinal = {
  day: "/images/hero/01-exterior.png",
  night: "/images/hero/06-hero-night.png",
};

export const rooms = [
  {
    slug: "deluxe-garden-room",
    name: "Deluxe Garden Room",
    price: 6500,
    capacity: "2 Guests",
    size: "320 sq ft",
    description:
      "A calm, sunlit room overlooking the garden, featuring warm wood accents and a private sit-out.",
    image: "/images/hero/03-room.png",
    amenities: ["Free WiFi", "Garden View", "King Bed", "Rain Shower"],
  },
  {
    slug: "poolside-suite",
    name: "Poolside Suite",
    price: 11000,
    capacity: "2-3 Guests",
    size: "480 sq ft",
    description:
      "Steps away from the infinity pool, this suite opens directly onto the deck for private evening swims.",
    image: "/images/hero/04-pool.png",
    amenities: ["Free WiFi", "Pool Access", "King Bed", "Mini Bar", "Balcony"],
  },
  {
    slug: "heritage-family-room",
    name: "Heritage Family Room",
    price: 9000,
    capacity: "4 Guests",
    size: "550 sq ft",
    description:
      "Spacious and warm, designed for families, with two separate sleeping areas and a shared lounge nook.",
    image: "/images/hero/02-lobby.png",
    amenities: ["Free WiFi", "Two Bedrooms", "Lounge Area", "Breakfast Included"],
  },
];

export const amenitiesList = [
  { title: "Free WiFi", description: "High-speed internet across the property" },
  { title: "Infinity Pool", description: "Open sunrise to midnight" },
  { title: "Garden Dining", description: "Evening barbeque under string lights" },
  { title: "24/7 Service", description: "Round-the-clock guest assistance" },
  { title: "Spa & Wellness", description: "Relax with signature treatments" },
  { title: "Free Parking", description: "Secure on-site parking for guests" },
];

export const testimonials = [
  {
    name: "Ananya Roy",
    location: "Kolkata",
    quote:
      "The pool view from our room was unreal. Every evening felt like a mini vacation within the vacation.",
    rating: 5,
  },
  {
    name: "Rohan Mehta",
    location: "Mumbai",
    quote:
      "Loved the garden barbeque nights — such a warm, personal touch you don't see at bigger hotels.",
    rating: 5,
  },
  {
    name: "Sara Ahmed",
    location: "Delhi",
    quote:
      "Clean, quiet, and beautifully designed. The staff remembered our names by day two.",
    rating: 4,
  },
];