"use client";
import Link from 'next/link';
import { theories } from '../data/theories'; 

export default function Navbar() {
  const displayedTheories = theories.slice(0, 4);

  return (
    // Fixed: pointer-events-none ensures the invisible wrapper doesn't block clicks
    // top-0 ensures it stays at the very top of the viewport
    <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none flex justify-center pt-8">
      
      {/* The actual Pill - pointer-events-auto makes it clickable again */}
      <nav className="pointer-events-auto bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 flex items-center gap-8 shadow-2xl">
        <Link href="/" className="font-black text-xl tracking-tighter text-white hover:text-red-600 transition-all">
          MKULTRA<span className="text-red-600">.</span>
        </Link>

        <div className="h-4 w-[1px] bg-white/20" />

        <div className="hidden lg:flex items-center gap-8">
          {displayedTheories.map((theory) => (
            <Link 
              key={theory.id} 
              href={`/theories/${theory.slug}`}
              className="group text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-white flex items-center"
            >
              <span className="text-red-600 mr-2 font-mono">//</span>
              {theory.title}
            </Link>
          ))}
        </div>

        <Link href="/theories" className="text-[9px] font-black uppercase tracking-[0.2em] text-red-600 border border-red-600/30 px-5 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all">
          [ ARCHIVES ]
        </Link>
      </nav>
    </div>
  );
}