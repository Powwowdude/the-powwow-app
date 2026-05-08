"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
    const { data: profile } = await supabase
  .from("profiles")
  .select("role")
  .eq("id", user.id)
  .single();

if (profile) {
  setRole(profile.role);
}
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    location.reload();
  };

  return (
    <nav className="border-b border-gray-800 bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-white"
        >
          The Powwow App
        </Link>

        <div className="flex gap-6 text-sm md:text-base text-white items-center">
          <Link href="/powwows">
            Powwows
          </Link>
          {user && (
  <Link href="/saved">
    Saved
  </Link>
)}

          {role === "organizer" && (
  <Link href="/organizer">
    Organizer
  </Link>
)}

          {user ? (
            <button
              onClick={handleLogout}
              className="border border-gray-600 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}