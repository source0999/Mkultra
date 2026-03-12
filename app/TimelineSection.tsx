'use client';
import React from 'react';

export default function TimelineSection({ item }: any) {
  // If item is missing, return a placeholder to prevent the 500 error
  if (!item) {
    return <section className="h-screen bg-black" />;
  }

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center snap-start px-6 relative bg-black">
      <div className="z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        <div className="text-left space-y-6">
          <p className="font-mono text-purple-500 tracking-widest uppercase text-sm font-bold">
            — {item.era}
          </p>
          <h2 className="text-5xl md:text-8xl font-bold text-white leading-tight">
            {item.title}
          </h2>
          <p className="text-lg text-stone-400 max-w-md leading-relaxed">
            {item.desc}
          </p>
        </div>

        {/* This class 'archive-plate' is defined in your globals.css now */}
        <div className="archive-plate aspect-[4/5] w-full group overflow-hidden shadow-2xl">
          <div className="text-center opacity-30 group-hover:opacity-100 transition-opacity">
            <span className="text-purple-500 font-mono text-xs italic">[ ARCHIVE_{item.id} ]</span>
          </div>
          
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-purple-500/30" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-purple-500/30" />
        </div>
      </div>
    </section>
  );
}