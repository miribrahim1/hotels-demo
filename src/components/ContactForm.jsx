'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitContactMessage } from '@/lib/actions';
import { enquiryResolver } from '@/lib/validation.mjs';
import { isDemo } from '@/lib/site-config.mjs';
import FormField, { Honeypot, inputClass } from './FormField';
import EnquiryResult from './EnquiryResult';

export default function ContactForm() {
  const [result, setResult] = useState(null);
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ resolver: enquiryResolver('contact') });

  const onSubmit = async (data) => {
    setResult(null);
    try {
      const response = await submitContactMessage(data);
      if (!response.success) {
        Object.entries(response.errors || {}).forEach(([field, message]) => setError(field, { message }, { shouldFocus: true }));
        setResult(response);
        return;
      }
      setResult({ ...response,
        draft: `Hi The Verandah! I have a question.\n\nName: ${data.name}\nEmail: ${data.email}\n\nMessage: ${data.message}`,
        message: response.demo ? 'Demo complete. Your message was validated; no personal details were saved and no message was sent.' : 'Your enquiry was saved. You can also follow up on WhatsApp.',
      });
    } catch {
      setResult({ success: false, message: 'Connection interrupted. Your message is still here. Please try again.' });
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit, () => setResult(null))} onChange={() => setResult(null)} className="bg-gray-50 rounded-3xl p-6 md:p-8 space-y-5">
      {isDemo && <p className="text-sm text-gray-600">Try this form with sample details. This portfolio demo does not save or send messages.</p>}
      <fieldset disabled={isSubmitting} className="space-y-5">
        <Honeypot register={register} id="contact-website" />
        <FormField label="Full Name" id="contact-name" error={errors.name} autoComplete="name" maxLength={100} {...register('name')} />
        <FormField label="Email" id="contact-email" type="email" error={errors.email} autoComplete="email" maxLength={254} {...register('email')} />
        <FormField label="Message" id="contact-message" error={errors.message}>
          <textarea id="contact-message" rows={5} maxLength={2000} placeholder="How can we help?" className={`${inputClass} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'contact-message-error' : undefined} {...register('message')} />
        </FormField>
        <button type="submit" disabled={isSubmitting || !!result?.success} className="w-full bg-gray-900 text-white py-3.5 rounded-full font-medium hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
          {isSubmitting ? 'Checking your message…' : result?.success ? (result.demo ? 'Demo Complete' : 'Enquiry Saved') : isDemo ? 'Preview Message' : 'Send Enquiry'}
        </button>
      </fieldset>
      <EnquiryResult result={result} />
    </form>
  );
}
