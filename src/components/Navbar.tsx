"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-white">
          The Powwow App
        </Link>

        <div className="flex gap-6 text-sm md:text-base text-white">
          <Link href="/powwows">Powwows</Link>
          <Link href="/organizer">Organizer</Link>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}