'use client';
import React from 'react';

// This tells TypeScript exactly what data to expect
interface Theory {
  id: string;
  title: string;
  desc: string;
  image: string;
  link: string;
  era: string;
}

export default function TheorySection({ theory }: { theory: Theory }) {
  return (
    <section className="h-screen w-full flex flex-col md:flex-row items-center justify-center bg-black px-6 md:px-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-20 grayscale"
        style={{ 
          backgroundImage: `url(${theory.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="z-10 w-full md:w-1/2 flex flex-col items-start text-left">
        <span className="text-purple-500 font-mono text-xs md:text-sm mb-4 block tracking-[0.4em]">
          {theory.era}
        </span>
        <h2 className="text-5xl md:text-8xl font-bold text-white uppercase italic tracking-tighter mb-6 leading-none">
          {theory.title}
        </h2>
        <p className="text-stone-400 text-sm md:text-lg leading-relaxed max-w-md mb-8">
          {theory.desc}
        </p>
        <a 
          href={theory.link}
          className="group relative px-8 py-4 border border-white text-xs uppercase tracking-[0.5em] text-white overflow-hidden transition-all"
        >
          <span className="relative z-10 transition-colors group-hover:text-black">Access Archive</span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
        </a>
      </div>

      {/* Archive Ref Tag */}
      <div className="hidden md:block absolute right-20 bottom-20 border-l border-white/20 pl-4 py-2">
        <p className="text-[10px] font-mono text-stone-600 uppercase tracking-widest leading-loose">
          Ref: {theory.id}<br/>
          Status: Unverified<br/>
          Security: Level 4
        </p>
      </div>
    </section>
  );
}