// src/app/contact/page.js
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { hotelInfo } from '@/data/hotelData';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log('Contact form:', data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-semibold text-gray-900">Get in Touch</h1>
          <p className="text-gray-500 mt-4 max-w-md mx-auto">
            Have a question, or planning a stay? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: info */}
          <div className="space-y-8">
            <InfoRow icon={MapPin} label="Address" value={hotelInfo.address} />
            <InfoRow icon={Phone} label="Phone" value={hotelInfo.phone} />
            <InfoRow icon={Mail} label="Email" value={hotelInfo.email} />

            <div className="rounded-2xl overflow-hidden aspect-video mt-10">
              <iframe
                title="Location map"
                className="w-full h-full border-0"
                loading="lazy"
                src="https://www.google.com/maps?q=Shantiniketan,West+Bengal&output=embed"
              />
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 rounded-3xl p-6 md:p-8 space-y-5">
            <Field
              label="Full Name"
              error={errors.name}
              inputProps={register('name', { required: 'Name is required' })}
              placeholder="Your name"
            />
            <Field
              label="Email"
              type="email"
              error={errors.email}
              inputProps={register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
              })}
              placeholder="you@example.com"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
              <textarea
                rows={5}
                placeholder="How can we help?"
                {...register('message', { required: 'Message is required' })}
                className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 text-sm resize-none focus:outline-none focus:ring-2 transition-all ${
                  errors.message ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-gray-900/10'
                }`}
              />
              {errors.message && (
                <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3.5 rounded-full font-medium hover:bg-gray-800 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              {submitted ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} /> Message Sent
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <span className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-white" />
      </span>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-900 font-medium">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, type = 'text', error, inputProps, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...inputProps}
        className={`w-full px-4 py-3 rounded-xl border bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 transition-all ${
          error ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-gray-900/10'
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}