"use client";
import Link from 'next/link';
import { theories } from '../data/theories'; 

export default function Navbar() {
  // Limiting to 3-4 items ensures they don't squish on smaller screens
  const MAX_DISPLAY = 4;
  const displayedTheories = theories.slice(0, MAX_DISPLAY);
  const hasMore = theories.length > MAX_DISPLAY;

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95%] whitespace-nowrap">
      <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 flex items-center gap-8 shadow-2xl">
        
        {/* Logo - Force no wrap */}
        <Link href="/" className="font-black text-xl tracking-tighter text-white hover:text-red-600 transition-all flex-shrink-0">
          MKULTRA<span className="text-red-600">.</span>
        </Link>

        {/* Vertical Divider */}
        <div className="h-4 w-[1px] bg-white/20 hidden md:block" />

        {/* Redacted Links - Strictly One Line */}
        <div className="hidden lg:flex items-center gap-8 flex-nowrap">
          {displayedTheories.map((theory) => (
            <Link 
              key={theory.id} 
              href={theory.link} 
              className="group text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 hover:text-white transition-all flex items-center flex-shrink-0"
            >
              <span className="text-red-600 mr-2 font-mono">//</span>
              {theory.title}
            </Link>
          ))}
        </div>

        {/* Archive Button - Compact Style */}
        <div className="flex-shrink-0">
          {hasMore && (
            <Link 
              href="/theories" 
              className="text-[9px] font-black uppercase tracking-[0.2em] text-red-600 border border-red-600/30 px-5 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all"
            >
              [ archives ]
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}