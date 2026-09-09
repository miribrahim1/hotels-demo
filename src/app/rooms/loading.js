export default function RoomsLoading() {
  return (
    <main id="main-content" className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="h-12 md:h-16 w-64 bg-gray-100 rounded-xl mx-auto animate-pulse" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="rounded-2xl mb-4 aspect-[4/5] bg-gray-100 animate-pulse" />
              <div className="h-5 w-2/3 bg-gray-100 rounded animate-pulse mb-2" />
              <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
