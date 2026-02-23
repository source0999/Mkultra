'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { archives } from './data/archives';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = "PANDORAS_BOX";
  
  // Typing/Deleting Loop Logic
  useEffect(() => {
    if (!isInitialized) return;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayText.length < fullText.length) {
        // Typing
        setDisplayText(fullText.slice(0, displayText.length + 1));
      } else if (!isDeleting && displayText.length === fullText.length) {
        // Pause at the end before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText.length > 0) {
        // Deleting
        setDisplayText(fullText.slice(0, displayText.length - 1));
      } else if (isDeleting && displayText.length === 0) {
        // Restart loop
        setIsDeleting(false);
      }
    }, isDeleting ? 50 : 150); // Deleting is faster than typing

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isInitialized]);

  const startArchive = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsInitialized(true);
    }
  };

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black no-scrollbar font-['Bruno_Ace']">
      <audio ref={audioRef} src="/bg.mp3" loop />
      
      {!isInitialized && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
          <button onClick={startArchive} className="border border-[var(--purple-accent)] bg-[var(--purple-accent)]/20 px-12 py-5 text-[10px] tracking-[1em] text-white hover:bg-[var(--purple-accent)] transition-all uppercase">
            [ INITIALIZE ]
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="snap-start h-screen w-full relative flex flex-col items-center justify-center">
        <img src="/background.gif" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
        
        <div className="relative z-10 text-center px-4">
          {/* Resized Title: decreased from 9xl to 7xl for better balance */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white uppercase typing-cursor inline-block min-h-[1.2em]">
            {displayText}
          </h1>
          
          {/* Resized Subtitle: increased tracking and size */}
          <p className="subtitle-fade text-[var(--purple-accent)] text-sm md:text-lg tracking-[1.2em] uppercase mt-8 block opacity-90">
            Eat the rich
          </p>
        </div>
      </section>

      {/* List Item Sections */}
      {archives.map((archive) => (
        <section key={archive.id} className="snap-start h-screen w-full relative flex flex-col items-center justify-center p-10">
          <div className="absolute inset-0 opacity-20">
            <img src={archive.image} className="w-full h-full object-cover grayscale" alt="" />
          </div>
          <div className="relative z-10 text-center max-w-2xl">
            <span className="text-[var(--purple-accent)] text-[10px] tracking-[0.5em] block mb-4 uppercase">{archive.era}</span>
            <h2 className="text-4xl md:text-5xl uppercase mb-6 leading-tight text-white tracking-tighter">{archive.title}</h2>
            <p className="text-zinc-400 text-sm mb-12 tracking-wide leading-relaxed">{archive.desc}</p>
            
            <Link 
              href={`/archives/${archive.slug}`} 
              className="border-2 border-[var(--purple-accent)] bg-[var(--purple-accent)]/80 px-10 py-4 text-[11px] tracking-[0.4em] text-white hover:bg-[var(--purple-accent)] transition-all inline-block shadow-[0_0_15px_rgba(124,58,237,0.3)]"
            >
              [ ENTER ARCHIVE ]
            </Link>
          </div>
        </section>
      ))}
    </main>
  );
}