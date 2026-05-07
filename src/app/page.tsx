import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            The Powwow App
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Follow the powwow trail across North America.
            Discover events, organizers, dancers, vendors,
            and communities all in one place.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/powwows"
              className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition"
            >
              View Powwows
            </Link>

            <Link
              href="/organizer"
              className="border border-gray-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-900 transition"
            >
              Organizer Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Built For The Trail
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-800 rounded-2xl p-8 bg-gray-900">
              <h3 className="text-2xl font-bold mb-4">
                Discover Powwows
              </h3>

              <p className="text-gray-300">
                Search powwows across Canada and the USA
                with posters, locations, dates, and organizer
                information.
              </p>
            </div>

            <div className="border border-gray-800 rounded-2xl p-8 bg-gray-900">
              <h3 className="text-2xl font-bold mb-4">
                Organizer Tools
              </h3>

              <p className="text-gray-300">
                Create and manage powwows with poster uploads,
                event editing, and future registration systems.
              </p>
            </div>

            <div className="border border-gray-800 rounded-2xl p-8 bg-gray-900">
              <h3 className="text-2xl font-bold mb-4">
                Powwow Community
              </h3>

              <p className="text-gray-300">
                Built to connect dancers, singers, vendors,
                families, and communities across the powwow trail.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}