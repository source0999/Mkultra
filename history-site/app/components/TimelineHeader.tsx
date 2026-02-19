'use client';
import React from 'react';

interface Props {
  item: {
    id: string;
    era: string;
    title: string;
    desc: string;
  };
}

export default function TimelineSection({ item }: Props) {
  // Safety check to prevent the crash
  if (!item) return null;

  return (
    <section className="h-screen w-full flex flex-col justify-center items-center snap-start px-6 relative border-b border-purple-900/20 bg-black">
      <div className="z-10 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="text-left space-y-6">
          <p className="font-mono text-purple-500 tracking-widest uppercase text-sm font-bold">
            — {item.era}
          </p>
          <h2 className="text-5xl md:text-8xl font-serif font-bold text-stone-100 leading-tight">
            {item.title}
          </h2>
          <p className="text-lg text-stone-400 max-w-md leading-relaxed">
            {item.desc}
          </p>
        </div>
        <div className="aspect-[4/5] bg-stone-900/30 border border-purple-500/10 flex items-center justify-center italic text-purple-500/20">
          [ ARCHIVE_DATA_{item.id} ]
        </div>
      </div>
    </section>
  );
}