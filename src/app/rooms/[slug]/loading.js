export default function RoomDetailLoading() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-20">
      <div className="w-full h-[50vh] md:h-[60vh] bg-gray-100 animate-pulse" />
      <div className="max-w-6xl mx-auto px-6 mt-12 grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-4">
          <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
          <div className="h-24 w-full bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="h-40 bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    </main>
  );
}
