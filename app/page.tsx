'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { theories } from './data/theories'; // Path check: app/data/theories.ts

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const heroRef = useRef<HTMLDivElement>(null); 
  const [isInitialized, setIsInitialized] = useState(false);

  const startArchive = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsInitialized(true);
    }
  };

  // The Intersection Observer handles the "Audio Stopping" on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isInitialized && audioRef.current) {
          entry.isIntersecting ? audioRef.current.play() : audioRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [isInitialized]);

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black">
      <audio ref={audioRef} src="/bg.mp3" loop />

      {!isInitialized && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
          <button onClick={startArchive} className="border border-white/20 px-12 py-5 text-[10px] tracking-[1em] text-white hover:bg-white hover:text-black transition-all font-mono">
            [ INITIALIZE SYSTEM ]
          </button>
        </div>
      )}

      {/* HERO SECTION */}
      <section ref={heroRef} className="snap-start h-screen w-full relative flex items-center justify-center">
        <img src="/background.gif" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
        <h1 className="relative z-10 text-8xl font-black italic tracking-tighter text-white uppercase">MKULTRA.</h1>
      </section>

      {/* THEORY PREVIEW SECTIONS (Infinite Scroll) */}
      {theories.map((theory) => (
        <section key={theory.id} className="snap-start h-screen w-full relative flex flex-col items-center justify-center p-10">
          <div className="absolute inset-0 opacity-20">
            <img src={theory.image} className="w-full h-full object-cover grayscale" alt="" />
          </div>
          <div className="relative z-10 text-center max-w-2xl">
            <span className="text-red-600 font-mono text-xs tracking-[0.5em]">{theory.era}</span>
            <h2 className="text-6xl font-black italic uppercase my-4">{theory.title}</h2>
            <p className="text-zinc-400 font-mono text-sm mb-10">{theory.desc}</p>
            
            <Link 
              href={`/theories/${theory.slug}`}
              className="border border-red-900/40 px-8 py-3 text-[10px] tracking-[0.3em] text-white hover:bg-red-600 transition-all font-mono"
            >
              [ ENTER ARCHIVE ]
            </Link>
          </div>
        </section>
      ))}
    </main>
  );
}