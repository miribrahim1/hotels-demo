export const inputClass = 'w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/20 disabled:opacity-60';

export default function FormField({ label, id, error, children, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children || <input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className={inputClass} {...props} />}
      {error && <p id={`${id}-error`} className="text-xs text-red-700 mt-1">{error.message}</p>}
    </div>
  );
}

export function Honeypot({ register, id }) {
  return (
    <div hidden aria-hidden="true">
      <label htmlFor={id}>Leave this field empty</label>
      <input id={id} tabIndex={-1} autoComplete="off" {...register('website')} />
    </div>
  );
}
