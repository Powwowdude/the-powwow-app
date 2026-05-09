"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { User } from "@supabase/supabase-js";

type Claim = {
  id: number;
  powwow_id: number;
  user_id: string;
  message: string;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);

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

    if (!profile || profile.role !== "admin") {
      window.location.href = "/";
      return;
    }

    setUser(user);
    fetchClaims();
    fetchProfiles();
  };

  const fetchClaims = async () => {
    const { data, error } = await supabase
      .from("powwow_claims")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      setClaims(data || []);
    }
  };
  const fetchProfiles = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    alert(error.message);
  } else {
    setProfiles(data || []);
  }
};

  const updateClaimStatus = async (
  claimId: number,
  status: string,
  powwowId: number,
  claimantUserId: string
) => {
  const { error: claimError } = await supabase
    .from("powwow_claims")
    .update({ status })
    .eq("id", claimId);

  if (claimError) {
    console.error(claimError);
    alert(claimError.message);
    return;
  }

  if (status === "approved") {
    const { error: powwowError } = await supabase
      .from("powwows")
      .update({ user_id: claimantUserId })
      .eq("id", powwowId);
     const { error: profileError } = await supabase
  .from("profiles")
  .update({ verified: true })
  .eq("id", claimantUserId);

if (profileError) {
  console.error(profileError);
  alert(profileError.message);
  return;
} 

    if (powwowError) {
      console.error(powwowError);
      alert(powwowError.message);
      return;
    }
  }

  alert(`Claim ${status}`);
  fetchClaims();
};

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>

      {user && (
        <p className="text-gray-400 mb-8">
          Logged in as: {user.email}
        </p>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Powwow Claims
        </h2>

        <div className="grid gap-4">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="border border-gray-700 rounded-2xl p-6 bg-gray-900"
            >
              <p className="text-gray-300">
                <strong>Claim ID:</strong> {claim.id}
              </p>

              <p className="text-gray-300">
                <strong>Powwow ID:</strong> {claim.powwow_id}
              </p>

              <p className="text-gray-300">
                <strong>User ID:</strong> {claim.user_id}
              </p>

              <p className="text-gray-300">
                <strong>Status:</strong> {claim.status}
              </p>

              <p className="text-gray-300 mt-3">
                <strong>Message:</strong> {claim.message}
              </p>

              <p className="text-gray-500 mt-3 text-sm">
                Submitted: {claim.created_at}
              </p>

              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() =>
  updateClaimStatus(
    claim.id,
    "approved",
    claim.powwow_id,
    claim.user_id
  )
}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold"
                >
                  Approve
                </button>

                <button
                  type="button"
                  onClick={() =>
  updateClaimStatus(
    claim.id,
    "denied",
    claim.powwow_id,
    claim.user_id
  )
}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
                >
                  Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-12">
  <h2 className="text-2xl font-semibold mb-4">
    Organizer Profiles
  </h2>

  <div className="grid gap-4">
    {profiles.map((profile) => (
      <div
        key={profile.id}
        className="border border-gray-700 rounded-2xl p-6 bg-gray-900"
      >
        <p className="text-gray-300">
          <strong>Email:</strong> {profile.email}
        </p>

        <p className="text-gray-300">
          <strong>Role:</strong> {profile.role}
        </p>

        <p className="text-gray-300">
          <strong>Verified:</strong>{" "}
          {profile.verified ? "Yes ✓" : "No"}
        </p>

        {profile.role === "organizer" && (
          <button
            onClick={async () => {
              const { error } = await supabase
                .from("profiles")
                .update({
                  verified: !profile.verified,
                })
                .eq("id", profile.id);

              if (error) {
                console.error(error);
                alert(error.message);
              } else {
                fetchProfiles();
              }
            }}
            className="mt-4 bg-blue-600 px-4 py-2 rounded-lg"
          >
            {profile.verified
              ? "Remove Verification"
              : "Verify Organizer"}
          </button>
        )}
      </div>
    ))}
  </div>
</section>
    </main>
  );
}