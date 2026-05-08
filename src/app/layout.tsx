import "./globals.css";
import Navbar from "../components/Navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}