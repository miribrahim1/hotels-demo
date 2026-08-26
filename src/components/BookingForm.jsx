// src/components/BookingForm.jsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Calendar, Users, Mail, Phone, User, CheckCircle2 } from 'lucide-react';
import { hotelInfo } from '@/data/hotelData';
import { submitBooking } from '@/lib/actions';

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const message = `Hi! I'd like to book a room at The Verandah.

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Guests: ${data.guests}
Check-in: ${data.checkIn}
Check-out: ${data.checkOut}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${hotelInfo.whatsappNumber}?text=${encodedMessage}`;

    // Save to Appwrite in the background — don't block the WhatsApp handoff on it
    submitBooking(data).catch(() => {});

    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="booking" className="bg-gray-50 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <span className="text-sm font-medium text-gray-500 tracking-wide uppercase mb-2">
            Reserve Your Stay
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900">Book Your Room</h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-50 rounded-3xl p-6 md:p-10 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <Field
              icon={User}
              label="Full Name"
              error={errors.name}
              inputProps={register('name', { required: 'Name is required' })}
              placeholder="Your name"
            />
            <Field
              icon={Mail}
              label="Email"
              type="email"
              error={errors.email}
              inputProps={register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
              })}
              placeholder="you@example.com"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Field
              icon={Phone}
              label="Phone"
              type="tel"
              error={errors.phone}
              inputProps={register('phone', { required: 'Phone number is required' })}
              placeholder="+91 00000 00000"
            />
            <Field
              icon={Users}
              label="Guests"
              type="number"
              error={errors.guests}
              inputProps={register('guests', {
                required: 'Number of guests is required',
                min: { value: 1, message: 'At least 1 guest' },
              })}
              placeholder="2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <Field
              icon={Calendar}
              label="Check-in"
              type="date"
              error={errors.checkIn}
              inputProps={register('checkIn', { required: 'Check-in date is required' })}
            />
            <Field
              icon={Calendar}
              label="Check-out"
              type="date"
              error={errors.checkOut}
              inputProps={register('checkOut', { required: 'Check-out date is required' })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-4 rounded-full font-medium hover:bg-gray-800 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            {submitted ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle2 size={18} /> Request Sent
              </span>
            ) : (
              'Request Booking'
            )}
          </button>

          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-green-600"
            >
              Thank you! We&apos;ll get back to you shortly to confirm your stay.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({ icon: Icon, label, type = 'text', error, inputProps, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type={type}
          placeholder={placeholder}
          {...inputProps}
          className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 transition-all ${
            error ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-gray-900/10'
          }`}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}