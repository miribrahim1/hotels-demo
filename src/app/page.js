import Amenities from '@/components/Amenities';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import RoomsPreview from '@/components/RoomsPreview';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <Highlights />
      <RoomsPreview />
      <Amenities />
      <Gallery />
      <Testimonials />
      <BookingForm />
      <Footer />
    </main>
  );
}