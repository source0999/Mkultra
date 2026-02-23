import "./globals.css";
import Navbar from "./components/Navbar"; // Check if 'components' is capitalized in your folder!

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}