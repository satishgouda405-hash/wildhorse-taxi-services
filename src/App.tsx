import { useState, useCallback } from 'react';
import LoadingScreen from './sections/LoadingScreen';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Fleet from './sections/Fleet';
import Services from './sections/Services';
import Destinations from './sections/Destinations';
import WhyChooseUs from './sections/WhyChooseUs';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import BookingModal from './sections/BookingModal';
import WhatsAppButton from './sections/WhatsAppButton';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedVehicle, setPreselectedVehicle] = useState<string | undefined>();

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const openBooking = useCallback((vehicleType?: string) => {
    setPreselectedVehicle(vehicleType);
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setBookingOpen(false);
    setPreselectedVehicle(undefined);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation onBookClick={() => openBooking()} />
        <Hero onBookClick={() => openBooking()} />
        <Fleet onBookClick={openBooking} />
        <Services />
        <Destinations />
        <WhyChooseUs />
        <Testimonials />
        <Contact onBookClick={() => openBooking()} />
        <Footer />
        <WhatsAppButton />

        <BookingModal
          isOpen={bookingOpen}
          onClose={closeBooking}
          preselectedVehicle={preselectedVehicle}
        />
      </div>
    </>
  );
}
