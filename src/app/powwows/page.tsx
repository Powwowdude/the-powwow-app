"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Powwow = {
  id: number;
  name: string;
  city: string;
  venue: string;
  date: string;
  contact: string;
  description: string;
};

export default function PowwowsPage() {
  const [powwows, setPowwows] = useState<Powwow[]>([]);

  useEffect(() => {
    fetchPowwows();
  }, []);

  const fetchPowwows = async () => {
    const { data, error } = await supabase
      .from("powwows")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setPowwows(data || []);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">
        Upcoming Powwows
      </h1>

      <div className="grid gap-6">
        {powwows.map((powwow) => (
          <div
            key={powwow.id}
            className="border border-gray-700 rounded-xl p-6 bg-gray-900"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {powwow.name}
            </h2>

            <p className="text-gray-300">
              📍 {powwow.city}
            </p>

            <p className="text-gray-300">
              🏟️ {powwow.venue}
            </p>

            <p className="text-gray-300">
              📅 {powwow.date}
            </p>

            <p className="text-gray-300 mt-2">
              📧 {powwow.contact}
            </p>

            <p className="mt-4 text-gray-200">
              {powwow.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}