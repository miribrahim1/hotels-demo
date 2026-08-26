// src/app/rooms/[slug]/page.js
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Users, Maximize, Check } from 'lucide-react';
import { getRoomBySlug, getRooms } from '@/lib/appwrite';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);

  if (!room) {
    return { title: 'Room Not Found' };
  }

  return {
    title: room.name,
    description: room.description,
    openGraph: {
      title: room.name,
      description: room.description,
      images: [room.image],
    },
  };
}

export default async function RoomDetailPage({ params }) {
  const { slug } = await params;

  const [rawRoom, rawAllRooms] = await Promise.all([getRoomBySlug(slug), getRooms()]);
  if (!rawRoom) {
    notFound();
  }
  const room = JSON.parse(JSON.stringify(rawRoom));
  const allRooms = JSON.parse(JSON.stringify(rawAllRooms));
  const otherRooms = allRooms.filter((r) => r.slug !== slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      {/* Hero image */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <Image src={room.image} alt={room.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="max-w-6xl mx-auto">
            <Link href="/rooms" className="text-white/80 text-sm hover:text-white transition-colors">
              ← Back to Rooms
            </Link>
            <h1 className="text-white text-4xl md:text-6xl font-semibold mt-3">{room.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-6 mb-8 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Users size={16} /> {room.capacity}
            </span>
            <span className="flex items-center gap-2">
              <Maximize size={16} /> {room.size}
            </span>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mb-10">{room.description}</p>

          <h2 className="text-xl font-semibold text-gray-900 mb-5">What&apos;s Included</h2>
          <div className="grid grid-cols-2 gap-4">
            {room.amenities.map((a) => (
              <div key={a} className="flex items-center gap-3 text-gray-700">
                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Check size={14} />
                </span>
                <span className="text-sm">{a}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="sticky top-28 bg-gray-50 rounded-2xl p-6">
            <p className="text-3xl font-semibold text-gray-900 mb-1">
              ₹{room.price.toLocaleString('en-IN')}
              <span className="text-sm font-normal text-gray-500"> / night</span>
            </p>
            <p className="text-sm text-gray-500 mb-6">Inclusive of taxes</p>
            <Link
              href="/#booking"
              className="block text-center bg-gray-900 text-white py-3.5 rounded-full font-medium hover:bg-gray-800 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              Book This Room
            </Link>
          </div>
        </div>
      </div>

      {otherRooms.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-24">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Other Rooms</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {otherRooms.map((r) => (
              <Link key={r.slug} href={`/rooms/${r.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[16/10]">
                  <Image
                    src={r.image}
                    alt={r.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                    {r.name}
                  </h3>
                  <p className="text-sm font-semibold text-gray-900">
                    ₹{r.price.toLocaleString('en-IN')}/night
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}