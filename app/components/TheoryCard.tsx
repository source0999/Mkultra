import React from 'react';

interface TheoryProps {
  title: string;
  desc: string;
  image: string;
  link: string;
}

export default function TheoryCard({ title, desc, image, link }: TheoryProps) {
  return (
    <div className="group relative w-full h-[500px] overflow-hidden border border-white/10 bg-stone-900/40 transition-all hover:border-purple-500/50">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-60 group-hover:scale-105" 
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
        <h3 className="text-3xl font-bold text-white uppercase italic mb-3 tracking-tighter">
          {title}
        </h3>
        <p className="text-stone-400 text-sm mb-6 max-w-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {desc}
        </p>
        
        <a 
          href={link}
          className="w-fit px-6 py-2 border border-white text-[10px] uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all"
        >
          Access Archive
        </a>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-4 right-4 text-[10px] text-stone-600 font-mono tracking-widest opacity-0 group-hover:opacity-100">
        [ THEORY_DECRYPTED ]
      </div>
    </div>
  );
}