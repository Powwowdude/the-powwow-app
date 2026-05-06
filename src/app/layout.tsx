import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className="min-h-screen bg-black text-white">
        
        {/* NAVBAR */}
        <nav className="flex justify-between items-center p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">The Powwow App</h1>

          <div className="flex gap-6">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/powwows" className="hover:text-gray-300">Powwows</a>
            <a href="/organizer" className="hover:text-gray-300">Organizer</a>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main>{children}</main>

      </body>
    </html>
  );
}