'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { submitBooking } from '@/lib/actions';
import { enquiryResolver, hotelToday, nextDate, isDate } from '@/lib/validation.mjs';
import { isDemo } from '@/lib/site-config.mjs';
import FormField, { Honeypot, inputClass } from './FormField';
import EnquiryResult from './EnquiryResult';

export default function BookingForm({ rooms }) {
  const params = useSearchParams();
  const initial = {
    roomSlug: rooms.some((room) => room.slug === params.get('room')) ? params.get('room') : '',
    checkIn: isDate(params.get('checkIn')) ? params.get('checkIn') : '',
    checkOut: isDate(params.get('checkOut')) ? params.get('checkOut') : '',
    guests: /^[1-9]$|^10$/.test(params.get('guests') || '') ? params.get('guests') : '2',
  };
  return <BookingFields key={JSON.stringify(initial)} rooms={rooms} initial={initial} />;
}

function BookingFields({ rooms, initial }) {
  const [result, setResult] = useState(null);
  const { register, handleSubmit, setError, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initial,
    resolver: enquiryResolver('booking'),
  });
  const checkIn = useWatch({ control, name: 'checkIn' });

  const onSubmit = async (data) => {
    setResult(null);
    try {
      const response = await submitBooking(data);
      if (!response.success) {
        Object.entries(response.errors || {}).forEach(([field, message]) => setError(field, { message }, { shouldFocus: true }));
        setResult(response);
        return;
      }
      const draft = `Hi! I'd like to enquire about a stay at The Verandah.\n\nRoom: ${response.roomName}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nGuests: ${data.guests}\nCheck-in: ${data.checkIn}\nCheck-out: ${data.checkOut}`;
      setResult({ ...response, draft, message: response.demo
        ? 'Demo complete. Your enquiry was validated; no personal details were saved and no booking was made.'
        : 'Your booking enquiry was saved. Your stay is only confirmed after the hotel replies.' });
    } catch {
      setResult({ success: false, message: 'Connection interrupted. Your details are still here. Please try again.' });
    }
  };

  return (
    <section id="booking" className="bg-gray-50 py-24 px-6 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-sm font-medium text-gray-500 tracking-wide uppercase">Reserve Your Stay</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mt-2">Book Your Room</h2>
          <p className="text-sm text-gray-600 mt-4">{isDemo ? 'Try the booking flow with sample details. This portfolio demo does not take real reservations.' : 'Send an enquiry. Availability and your reservation will be confirmed by the hotel.'}</p>
        </div>
        {rooms.length === 0 ? <p role="status" className="text-center text-gray-700">Rooms are temporarily unavailable. Please refresh and try again shortly.</p> : (
          <form noValidate onSubmit={handleSubmit(onSubmit, () => setResult(null))} onChange={() => setResult(null)} className="rounded-3xl p-2 md:p-10 space-y-5">
            <fieldset disabled={isSubmitting} className="space-y-5">
              <Honeypot register={register} id="booking-website" />
              <FormField label="Room" id="booking-room" error={errors.roomSlug}>
                <select id="booking-room" className={inputClass} aria-invalid={!!errors.roomSlug} aria-describedby={errors.roomSlug ? 'booking-room-error' : undefined} {...register('roomSlug')}>
                  <option value="">Choose your room</option>
                  {rooms.map((room) => <option key={room.slug} value={room.slug}>{room.name} — {room.capacity}</option>)}
                </select>
              </FormField>
              <div className="grid md:grid-cols-2 gap-5">
                <FormField label="Full Name" id="booking-name" error={errors.name} autoComplete="name" maxLength={100} {...register('name')} />
                <FormField label="Email" id="booking-email" type="email" error={errors.email} autoComplete="email" maxLength={254} {...register('email')} />
                <FormField label="Phone" id="booking-phone" type="tel" error={errors.phone} autoComplete="tel" maxLength={30} placeholder="+91 00000 00000" {...register('phone')} />
                <FormField label="Guests" id="booking-guests" type="number" min={1} max={10} step={1} error={errors.guests} {...register('guests')} />
                <FormField label="Check-in" id="booking-check-in" type="date" min={hotelToday()} error={errors.checkIn} {...register('checkIn', { deps: ['checkOut'] })} />
                <FormField label="Check-out" id="booking-check-out" type="date" min={nextDate(checkIn || hotelToday())} error={errors.checkOut} {...register('checkOut')} />
              </div>
              <button type="submit" disabled={isSubmitting || !!result?.success} className="w-full bg-gray-900 text-white py-4 rounded-full font-medium hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
                {isSubmitting ? 'Checking your enquiry…' : result?.success ? (result.demo ? 'Demo Complete' : 'Enquiry Saved') : isDemo ? 'Preview Booking Enquiry' : 'Request Booking'}
              </button>
            </fieldset>
            <EnquiryResult result={result} />
          </form>
        )}
      </div>
    </section>
  );
}
