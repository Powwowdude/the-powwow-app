 export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
        The Powwow App
      </h1>

      <p className="text-lg md:text-xl text-center max-w-xl mb-8">
        Discover powwows. Register with ease. Connect across the powwow trail.
      </p>

      <button className="bg-white text-black px-6 py-3 rounded-full text-lg hover:bg-gray-200 transition">
        Find Powwows
      </button>
    </main>
  );
}