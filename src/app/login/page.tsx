"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("dancer");

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
  email,
  password,
});

if (data.user) {
  await supabase.from("profiles").insert([
    {
      id: data.user.id,
      email,
      role,
    },
  ]);
}

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email to confirm signup!");
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Logged in successfully!");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md border border-gray-700 rounded-2xl p-8 bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Organizer Login
        </h1>

        <div className="grid gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-black border border-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-black border border-gray-700"
          />
          <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="p-3 rounded bg-black border border-gray-700"
>
  <option value="dancer">Dancer / Family</option>
  <option value="organizer">Organizer</option>
  <option value="vendor">Vendor</option>
  <option value="drum_group">Drum Group</option>
</select>

          <button
            onClick={handleLogin}
            className="bg-white text-black p-3 rounded font-semibold"
          >
            Login
          </button>

          <button
            onClick={handleSignup}
            className="border border-gray-500 p-3 rounded font-semibold"
          >
            Create Account
          </button>
        </div>
      </div>
    </main>
  );
}