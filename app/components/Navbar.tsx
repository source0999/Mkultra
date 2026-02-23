"use client";
import Link from 'next/link';
import { archives } from '../data/archives'; 

export default function Navbar() {
  const displayedarchives = archives.slice(0, 4);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none flex justify-center pt-8 font-['Bruno_Ace']">
      <nav className="pointer-events-auto bg-black/90 border border-white/10 rounded-full px-8 py-3 flex items-center gap-8 shadow-2xl">
        <Link href="/" className="text-lg tracking-tighter text-white hover:text-[var(--purple-accent)] transition-all uppercase">
          PANDORAS BOX<span className="text-[var(--purple-accent)]">.</span>
        </Link>

        <div className="h-4 w-[1px] bg-white/20" />

        <div className="hidden lg:flex items-center gap-8">
          {displayedarchives.map((archive) => (
            <Link 
              key={archive.id} 
              href={`/archives/${archive.slug}`}
              className="group text-[9px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white flex items-center"
            >
              <span className="text-[var(--purple-accent)] mr-2">//</span>
              {archive.title}
            </Link>
          ))}
        </div>

        <Link href="/archive" className="text-[9px] uppercase tracking-[0.2em] text-white border border-[var(--purple-accent)] bg-[var(--purple-accent)]/80 px-5 py-2 rounded-full hover:scale-105 transition-all">
          [ ARCHIVES ]
        </Link>
      </nav>
    </div>
  );
}