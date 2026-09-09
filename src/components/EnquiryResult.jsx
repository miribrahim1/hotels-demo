import { hotelInfo } from '@/data/hotelData';

export default function EnquiryResult({ result }) {
  if (!result) return null;
  return (
    <div role="status" aria-live="polite" className={`rounded-xl p-4 text-sm ${result.success ? 'bg-green-50 text-green-900' : 'bg-red-50 text-red-800'}`}>
      <p>{result.message}</p>
      {result.success && result.draft && (
        <details className="mt-3">
          <summary className="cursor-pointer font-medium">View enquiry summary</summary>
          <p className="mt-2 whitespace-pre-wrap break-words">{result.draft}</p>
        </details>
      )}
      {result.success && !result.demo && result.draft && (
        <a href={`https://wa.me/${hotelInfo.whatsappNumber}?text=${encodeURIComponent(result.draft)}`} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 font-medium underline underline-offset-4">
          Continue on WhatsApp (opens a new tab)
        </a>
      )}
      {result.success && !result.demo && <p className="mt-2">WhatsApp opens a draft. Press Send there to send the message.</p>}
    </div>
  );
}
