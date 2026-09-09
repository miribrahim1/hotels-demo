import Amenities from '@/components/Amenities';
import BookingForm from '@/components/BookingForm';
import { Suspense } from 'react';
import Gallery from '@/components/Gallery';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import RoomsPreview from '@/components/RoomsPreview';
import Testimonials from '@/components/Testimonials';
import { getRooms, getAmenities, getTestimonials } from '@/lib/appwrite';

export const revalidate = 60;

export default async function Home() {

  const [rowRooms, rawAmenities, rawTestimonials] = await Promise.all([
    getRooms(),
    getAmenities(),
    getTestimonials(),
  ]);
  const rooms = JSON.parse(JSON.stringify(rowRooms));
  const amenities = JSON.parse(JSON.stringify(rawAmenities));
  const testimonials = JSON.parse(JSON.stringify(rawTestimonials));

  return (
    <main id="main-content">
      <Hero />
      <Highlights />
      <RoomsPreview rooms={rooms} />
      <Amenities amenitiesList={amenities} />
      <Gallery />
      <Testimonials testimonials={testimonials} />
      <Suspense fallback={<section id="booking" className="py-24 text-center text-gray-700 bg-gray-50">Loading booking form…</section>}>
        <BookingForm rooms={rooms} />
      </Suspense>
    </main>
  );
}