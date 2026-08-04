
import Link from 'next/link';
import { getRooms } from '@/lib/appwrite';

export default async function RoomsPage() {
  const rawRooms = await getRooms();
  const rooms = JSON.parse(JSON.stringify(rawRooms));

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-semibold text-gray-900">Our Rooms</h1>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">
            Every room at The Verandah is designed for comfort, with warm interiors and thoughtful details.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <Link key={room.slug} href={`/rooms/${room.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-3 py-1.5 rounded-full">
                  {room.capacity}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{room.size}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ₹{room.price.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-gray-500">per night</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}