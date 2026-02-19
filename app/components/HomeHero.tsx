'use client';
import React, { useEffect, useRef } from 'react';

export default function HomeHero() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
    }

    const startAudio = () => {
      audio?.play().catch(() => {});
      if (audio && !audio.paused) {
        window.removeEventListener('click', startAudio);
      }
    };

    window.addEventListener('click', startAudio);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          audio?.play().catch(() => {});
        } else {
          audio?.pause();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: "200px 0px 200px 0px" 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('click', startAudio);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="h-screen w-full flex flex-col justify-center items-center text-center snap-start px-4 md:px-10 bg-black relative overflow-hidden"
    >
      {/* 1. THE AUDIO TAG */}
      <audio ref={audioRef} src="/audio.mp3" loop />

{/* 2. RESPONSIVE GIF POSITIONING - MANUALLY TUNED */}
      <img 
        src="/home.gif" 
        className="absolute inset-0 w-full h-full object-cover opacity-60 md:opacity-70 mix-blend-lighten pointer-events-none 
                   object-[25%_center] md:object-center"
      />
      {/* EXPLANATION:
          object-[25%_center] -> On mobile, it nudges the GIF 25% from the left.
                                 This should frame the first guy without squishing him.
          md:object-center    -> Keeps it centered on laptops.
      */}
      {/* 3. HERO CONTENT */}
      <div className="z-10 w-full max-w-4xl">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white uppercase italic leading-tight tracking-tighter">
          Unfolding <br/> 
          <span className="text-purple-600 drop-shadow-[0_0_15px_rgba(124,58,237,0.4)]">Omitted Truth</span>
        </h1>
        <p className="text-stone-400 mt-6 text-sm md:text-lg max-w-[280px] md:max-w-xl mx-auto leading-relaxed">
          A study of the historical patterns our systems ignored.
        </p>
      </div>
    </section>
  );
}