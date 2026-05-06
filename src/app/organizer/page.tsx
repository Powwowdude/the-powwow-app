"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function OrganizerPage() {
  const [powwow, setPowwow] = useState({
    name: "",
    city: "",
    venue: "",
    date: "",
    contact: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPowwow({
      ...powwow,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { error } = await supabase.from("powwows").insert([powwow]);

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      alert("Powwow saved successfully!");

      setPowwow({
        name: "",
        city: "",
        venue: "",
        date: "",
        contact: "",
        description: "",
      });
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">
        Organizer Dashboard
      </h1>

      <section className="border border-gray-700 rounded-xl p-6 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">
          Create Powwow
        </h2>

        <div className="grid gap-4">
          <input
            name="name"
            value={powwow.name}
            onChange={handleChange}
            className="p-3 rounded bg-gray-900 border border-gray-700"
            placeholder="Powwow Name"
          />

          <input
            name="city"
            value={powwow.city}
            onChange={handleChange}
            className="p-3 rounded bg-gray-900 border border-gray-700"
            placeholder="City or Community"
          />

          <input
            name="venue"
            value={powwow.venue}
            onChange={handleChange}
            className="p-3 rounded bg-gray-900 border border-gray-700"
            placeholder="Venue"
          />

          <input
            name="date"
            type="date"
            value={powwow.date}
            onChange={handleChange}
            className="p-3 rounded bg-gray-900 border border-gray-700"
          />

          <input
            name="contact"
            value={powwow.contact}
            onChange={handleChange}
            className="p-3 rounded bg-gray-900 border border-gray-700"
            placeholder="Contact Email or Phone"
          />

          <textarea
            name="description"
            value={powwow.description}
            onChange={handleChange}
            className="p-3 rounded bg-gray-900 border border-gray-700"
            placeholder="Event Description"
            rows={4}
          />

          <button
            onClick={handleSubmit}
            className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200"
          >
            Save Powwow
          </button>
        </div>
      </section>
    </main>
  );
}