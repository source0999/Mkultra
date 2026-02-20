import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="m-0 p-0 overflow-x-hidden"> 
      <body className="bg-black text-white antialiased m-0 p-0 overflow-x-hidden">
        {/* This is the ONLY place the Navbar should exist */}
        <Navbar />
        
        {/* We use a simple div here to avoid layout shifts */}
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}