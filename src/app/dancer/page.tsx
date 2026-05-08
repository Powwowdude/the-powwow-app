"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { User } from "@supabase/supabase-js";

export default function DancerPage() {
  const [user, setUser] = useState<User | null>(null);

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

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "dancer") {
      window.location.href = "/";
      return;
    }

    setUser(user);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Dancer Dashboard</h1>

      {user && (
        <p className="text-gray-400 mb-8">
          Logged in as: {user.email}
        </p>
      )}

      <section className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-700 rounded-2xl p-6 bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">My Saved Powwows</h2>
          <p className="text-gray-300">
            View your saved powwows and start building your trail.
          </p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-6 bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">Future Registration</h2>
          <p className="text-gray-300">
            Register for dance categories and reuse your dancer profile.
          </p>
        </div>
      </section>
    </main>
  );
}