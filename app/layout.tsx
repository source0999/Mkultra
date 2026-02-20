import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Ensure the background of the body matches the navbar exactly */}
      <body className="bg-black text-white antialiased">
        <Navbar />
        {/* We use pt-20 to push the content down exactly enough to clear the navbar */}
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}