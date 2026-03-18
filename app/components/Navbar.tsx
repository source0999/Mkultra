"use client";
import Link from 'next/link';
import { keys } from '../data/keys';

export default function Navbar() {
  const displayedKeys = keys.slice(0, 4);

  return (
      <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none flex justify-center pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 font-['Bruno_Ace']">
      <nav className="pointer-events-auto bg-black/90 border border-white/10 rounded-full w-fit max-w-[95vw] lg:max-w-[1100px] px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4 sm:gap-6 lg:gap-8 shadow-2xl">
        <Link
          href="/"
          className="flex-shrink-0 whitespace-nowrap text-base sm:text-lg tracking-tighter text-white hover:text-[var(--purple-accent)] transition-all uppercase"
        >
          Gnosis<span className="text-[var(--purple-accent)]">.</span>
        </Link>

        <div className="flex-shrink-0 h-4 w-[1px] bg-white/20" />

        <div className="hidden md:flex flex-1 min-w-0 items-center gap-6 overflow-x-auto no-scrollbar">
          {displayedKeys.map((key) => (
            <Link 
              key={key.id} 
              href={`/keys/${key.slug}`}
              className="group flex-shrink-0 text-[9px] uppercase tracking-[0.2em] text-zinc-400 hover:text-white flex items-center"
            >
              <span className="text-[var(--purple-accent)] mr-2">{'//'}</span>
              {key.title}
            </Link>
          ))}
        </div>

        <Link
          href="/keys"
          className="flex-shrink-0 whitespace-nowrap text-[9px] uppercase tracking-[0.2em] text-white border border-[var(--purple-accent)] bg-[var(--purple-accent)]/80 px-4 sm:px-5 py-2 rounded-full hover:scale-105 transition-all"
        >
          [ KEYS ]
        </Link>
      </nav>
    </div>
  );
}