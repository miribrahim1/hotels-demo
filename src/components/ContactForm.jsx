// src/components/ContactForm.jsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2 } from 'lucide-react';
import { hotelInfo } from '@/data/hotelData';
import { submitContactMessage } from '@/lib/actions';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const message = `Hi The Verandah! I have a question.

Name: ${data.name}
Email: ${data.email}

Message: ${data.message}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${hotelInfo.whatsappNumber}?text=${encodedMessage}`;

    // Save to Appwrite in the background — don't block the WhatsApp handoff on it
    submitContactMessage(data).catch(() => {});

    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
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
