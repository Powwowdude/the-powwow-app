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
  poster_url: string;
};

export default function SavedPage() {
  const [savedPowwows, setSavedPowwows] = useState<Powwow[]>([]);

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data: favorites, error: favoritesError } = await supabase
      .from("favorites")
      .select("powwow_id")
      .eq("user_id", user.id);

    if (favoritesError) {
      console.error(favoritesError);
      alert(favoritesError.message);
      return;
    }

    const powwowIds = favorites.map((item) => item.powwow_id);

    if (powwowIds.length === 0) {
      setSavedPowwows([]);
      return;
    }

    const { data: powwows, error: powwowsError } = await supabase
      .from("powwows")
      .select("*")
      .in("id", powwowIds);

    if (powwowsError) {
      console.error(powwowsError);
      alert(powwowsError.message);
    } else {
      setSavedPowwows(powwows || []);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">My Saved Powwows</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {savedPowwows.map((powwow) => (
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
              <h2 className="text-2xl font-bold mb-2">{powwow.name}</h2>

              <p className="text-gray-300">
                📍 {powwow.city}, {powwow.state_province}, {powwow.country}
              </p>

              <p className="text-gray-300">🏟️ {powwow.venue}</p>

              <p className="text-gray-400 mt-2">📅 {powwow.date}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}