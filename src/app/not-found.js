import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
      <span className="text-gray-300 text-sm tracking-[0.3em] uppercase mb-4">404</span>
      <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-gray-500 max-w-sm mb-8">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="bg-gray-900 text-white px-7 py-3 rounded-full font-medium text-sm hover:bg-gray-800 transition-all"
      >
        Back to Home
      </Link>
    </main>
  );
}
