"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
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

export default function OrganizerPage() {
  const [powwows, setPowwows] = useState<Powwow[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [powwow, setPowwow] = useState({
    name: "",
    city: "",
    state_province: "",
    country: "",
    venue: "",
    date: "",
    contact: "",
    description: "",
    poster_url: "",
  });

 useEffect(() => {
  checkUser();
}, []);

const checkUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "/login";
    return;
  }

  setUser(user);
  fetchPowwows();
};

 const fetchPowwows = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error } = await supabase
    .from("powwows")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: true });

  if (error) {
    console.error(error);
    alert(error.message);
  } else {
    setPowwows(data || []);
  }
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPowwow({
      ...powwow,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setPowwow({
      name: "",
      city: "",
      state_province: "",
      country: "",
      venue: "",
      date: "",
      contact: "",
      description: "",
      poster_url: "",
    });

    setPosterFile(null);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    let posterUrl = powwow.poster_url;

    if (posterFile) {
      const fileName = `${Date.now()}-${posterFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("powwow-posters")
        .upload(fileName, posterFile);

      if (uploadError) {
        console.error(uploadError);
        alert(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("powwow-posters")
        .getPublicUrl(fileName);

      posterUrl = data.publicUrl;
    }

   const {
  data: { user },
} = await supabase.auth.getUser();

const powwowData = {
  ...powwow,
  poster_url: posterUrl,
  user_id: user?.id,
};

    if (editingId) {
      const { error } = await supabase
        .from("powwows")
        .update(powwowData)
        .eq("id", editingId);

      if (error) {
        console.error(error);
        alert(error.message);
      } else {
        alert("Powwow updated successfully!");
        resetForm();
        fetchPowwows();
      }

      return;
    }

    const { error } = await supabase.from("powwows").insert([powwowData]);

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      alert("Powwow saved successfully!");
      resetForm();
      fetchPowwows();
    }
  };

  const handleEdit = (selectedPowwow: Powwow) => {
    setEditingId(selectedPowwow.id);

    setPowwow({
      name: selectedPowwow.name || "",
      city: selectedPowwow.city || "",
      state_province: selectedPowwow.state_province || "",
      country: selectedPowwow.country || "",
      venue: selectedPowwow.venue || "",
      date: selectedPowwow.date || "",
      contact: selectedPowwow.contact || "",
      description: selectedPowwow.description || "",
      poster_url: selectedPowwow.poster_url || "",
    });
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this powwow?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase.from("powwows").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      alert("Powwow deleted successfully!");
      fetchPowwows();
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
  <div>
    <h1 className="text-4xl font-bold">
      Organizer Dashboard
    </h1>

    {user && (
      <p className="text-gray-400 mt-1">
        Logged in as: {user.email}
      </p>
    )}
  </div>

  <button
    onClick={async () => {
      await supabase.auth.signOut();
      location.reload();
    }}
    className="border border-gray-600 px-4 py-2 rounded-lg"
  >
    Logout
  </button>
</div>

      <section className="border border-gray-700 rounded-xl p-6 max-w-3xl mb-10">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? "Edit Powwow" : "Create Powwow"}
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
            name="state_province"
            value={powwow.state_province}
            onChange={handleChange}
            className="p-3 rounded bg-gray-900 border border-gray-700"
            placeholder="State / Province"
          />

          <input
            name="country"
            value={powwow.country}
            onChange={handleChange}
            className="p-3 rounded bg-gray-900 border border-gray-700"
            placeholder="Country"
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

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setPosterFile(e.target.files[0]);
              }
            }}
            className="p-3 rounded bg-gray-900 border border-gray-700"
          />

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200"
            >
              {editingId ? "Update Powwow" : "Save Powwow"}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                className="border border-gray-600 px-6 py-3 rounded font-semibold hover:bg-gray-900"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Powwows</h2>

        <div className="grid gap-4">
          {powwows.map((item) => (
            <div
              key={item.id}
              className="border border-gray-700 rounded-xl p-5 bg-gray-900"
            >
              {item.poster_url && (
                <img
                  src={item.poster_url}
                  alt={item.name}
                  className="w-full max-w-sm rounded-lg mb-4"
                />
              )}

              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-300">
                {item.city}, {item.state_province}, {item.country}
              </p>
              <p className="text-gray-400">{item.date}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-white text-black px-4 py-2 rounded font-semibold"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="border border-red-500 text-red-400 px-4 py-2 rounded font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}