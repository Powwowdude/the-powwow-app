"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Powwow = {
  id: number;
  name: string;
  city: string;
  state_province: string;
  country: string;
  poster_url: string;
  date: string;
};

export default function HomePage() {
  const [featuredPowwows, setFeaturedPowwows] = useState<Powwow[]>([]);

  useEffect(() => {
    fetchPowwows();
  }, []);

  const fetchPowwows = async () => {
    const today = new Date().toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("powwows")
      .select("*")
      .gte("date", today)
      .order("date", { ascending: true })
      .limit(3);

    if (error) {
      console.error(error);
    } else {
      setFeaturedPowwows(data || []);
    }
  };

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
            Featured Powwows
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredPowwows.map((powwow) => (
              <div
                key={powwow.id}
                className="overflow-hidden border border-gray-700 rounded-2xl bg-gray-900"
              >
                {powwow.poster_url && (
                  <img
                    src={powwow.poster_url}
                    alt={powwow.name}
                    className="w-full h-72 object-cover"
                  />
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {powwow.name}
                  </h3>

                  <p className="text-gray-300">
                    📍 {powwow.city}, {powwow.state_province}
                  </p>

                  <p className="text-gray-400 mt-2">
                    📅 {powwow.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {featuredPowwows.length === 0 && (
            <p className="text-center text-gray-400">
              No upcoming powwows listed yet.
            </p>
          )}
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