import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "The Powwow App",
  description: "Powwow trail platform for organizers, dancers, and families",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <nav className="border-b border-gray-800 bg-black sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
  href="/"
  className="flex items-center gap-3"
>
  <Image
  src="/logo.png"
  alt="The Powwow App"
  width={50}
  height={50}
  className="rounded-full w-[50px] h-auto"
/>

  <span className="text-2xl font-bold text-white">
    The Powwow App
  </span>
</Link>

            <div className="flex gap-6 text-sm md:text-base text-white">
              <Link href="/powwows">
                Powwows
              </Link>

              <Link href="/organizer">
                Organizer
              </Link>

              <Link href="/login">
                Login
              </Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}