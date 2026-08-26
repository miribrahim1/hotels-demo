'use client';

import Link from 'next/link';

export default function Error({ reset }) {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
      <span className="text-gray-300 text-sm tracking-[0.3em] uppercase mb-4">Error</span>
      <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-4">Something Went Wrong</h1>
      <p className="text-gray-500 max-w-sm mb-8">
        We couldn&apos;t load this page right now. Please try again in a moment.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="bg-gray-900 text-white px-7 py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition-all"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-gray-300 text-gray-900 px-7 py-3 rounded-full font-medium text-sm hover:bg-gray-50 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
