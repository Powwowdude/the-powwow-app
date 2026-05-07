"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Powwow = {
  id: number;
  name: string;
  city: string;
  state_province: string;
  country: string;
  venue: string;
  date: string;
  contact: string;
  description: string;
  poster_url: string;
};

export default function PowwowsPage() {
  const [powwows, setPowwows] = useState<Powwow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");

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

  const filteredPowwows = powwows.filter((powwow) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      powwow.name?.toLowerCase().includes(search) ||
      powwow.city?.toLowerCase().includes(search) ||
      powwow.state_province?.toLowerCase().includes(search) ||
      powwow.country?.toLowerCase().includes(search) ||
      powwow.venue?.toLowerCase().includes(search);

    const matchesCountry =
      countryFilter === "" ||
      powwow.country?.toLowerCase() === countryFilter.toLowerCase();

    const matchesState =
      stateFilter === "" ||
      powwow.state_province?.toLowerCase() === stateFilter.toLowerCase();

    return matchesSearch && matchesCountry && matchesState;
  });

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Upcoming Powwows</h1>

      <input
        type="text"
        placeholder="Search by powwow, city, province/state..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-xl p-3 rounded bg-gray-900 border border-gray-700 mb-8"
      />

      <div className="flex gap-4 mb-8 flex-wrap">
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="p-3 rounded bg-gray-900 border border-gray-700"
        >
          <option value="">All Countries</option>
          <option value="Canada">Canada</option>
          <option value="USA">USA</option>
        </select>

        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="p-3 rounded bg-gray-900 border border-gray-700"
        >
          <option value="">All Provinces/States</option>
          <option value="Alberta">Alberta</option>
          <option value="Saskatchewan">Saskatchewan</option>
          <option value="Montana">Montana</option>
          <option value="Arizona">Arizona</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPowwows.map((powwow) => (
          <div
            key={powwow.id}
            className="overflow-hidden border border-gray-700 rounded-2xl bg-gray-900 shadow-lg hover:scale-[1.02] transition"
          >
            {powwow.poster_url && (
              <img
                src={powwow.poster_url}
                alt={powwow.name}
                className="w-full h-80 object-cover"
              />
            )}

            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{powwow.name}</h2>

              <p className="text-gray-300">
                📍 {powwow.city}, {powwow.state_province}, {powwow.country}
              </p>

              <p className="text-gray-300">🏟️ {powwow.venue}</p>

              <p className="text-gray-300">📅 {powwow.date}</p>

              <p className="text-gray-300 mt-2">📧 {powwow.contact}</p>

              <p className="mt-4 text-gray-200">{powwow.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}