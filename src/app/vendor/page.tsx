"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { User } from "@supabase/supabase-js";

export default function VendorPage() {
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

    if (!profile || profile.role !== "vendor") {
      window.location.href = "/";
      return;
    }

    setUser(user);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Vendor Dashboard</h1>

      {user && (
        <p className="text-gray-400 mb-8">
          Logged in as: {user.email}
        </p>
      )}

      <section className="grid md:grid-cols-2 gap-6">
        <div className="border border-gray-700 rounded-2xl p-6 bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">
            Apply To Powwows
          </h2>

          <p className="text-gray-300">
            Find powwows accepting vendor applications and submit your booth request.
          </p>
        </div>

        <div className="border border-gray-700 rounded-2xl p-6 bg-gray-900">
          <h2 className="text-2xl font-semibold mb-2">
            My Applications
          </h2>

          <p className="text-gray-300">
            Track application status, approvals, booth details, and organizer messages.
          </p>
        </div>
      </section>
    </main>
  );
}