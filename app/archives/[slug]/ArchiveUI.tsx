"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MDXRemote } from 'next-mdx-remote';

const Video = ({ src }: { src: string }) => {
  const videoId = src.split('v=')[1]?.split('&')[0];
  return (
    <div className="w-full aspect-video border border-[#7c3aed]/30 bg-black my-6 relative group">
      <iframe
        className="w-full h-full relative z-10"
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
      />
    </div>
  );
};

const components = {
  Chapter: ({ id }: { id: string }) => (
    <div id={id} className="absolute top-0 h-px w-full pointer-events-none slide-anchor" />
  ),
  ArchiveImage: ({ src, caption }: { src: string; caption?: string }) => (
    <div className="w-full flex flex-col items-center justify-center my-8 slide-content">
      <div className="relative border border-[#7c3aed]/30 bg-black/40 p-1 group overflow-hidden max-h-[60vh]">
        <img src={src} className="max-h-[55vh] w-auto grayscale" alt="" />
      </div>
      {caption && <p className="mt-4 text-[10px] font-mono tracking-[0.4em] text-[#7c3aed] uppercase opacity-60">{caption}</p>}
    </div>
  ),
  Video,
  h2: (props: any) => <h2 {...props} className="text-4xl md:text-7xl font-light tracking-tighter text-white uppercase mb-8 leading-none" />,
  p: (props: any) => <p {...props} className="text-xl md:text-2xl leading-relaxed text-slate-200 font-sans mb-4 opacity-70" />,
};

export default function ArchiveUI({ mdxSource, frontmatter }: any) {
  const [activeId, setActiveId] = useState('hero');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const sections = frontmatter.index?.map((title: string, i: number) => {
    const ids = ["definition", "denominations", "matters", "origins", "practices", "elite", "debate", "references"];
    return { id: ids[i], title };
  }) || [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { root: scrollContainerRef.current, threshold: 0.1, rootMargin: "-20% 0% -70% 0%" }
    );

    const heroEl = document.getElementById('hero');
    if (heroEl) observer.observe(heroEl);

    sections.forEach((s: any) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="fixed inset-0 bg-black text-slate-200 overflow-hidden flex font-sans">
      <style jsx global>{`
        .mdx-slide-engine > * {
          height: 100vh !important;
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          scroll-snap-align: start !important;
          scroll-snap-stop: always !important;
          flex-shrink: 0 !important;
          padding: 0 10% !important;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          position: relative;
        }
        .mdx-slide-engine > .slide-anchor {
          height: 0 !important;
          padding: 0 !important;
          border: none !important;
        }

        /* RANDOMIZED TYPEWRITER LOOP */
        @keyframes titleTyping {
          0% { width: 0; }
          25% { width: 100%; }
          40% { width: 100%; }
          50% { width: 45%; } 
          60% { width: 100%; } 
          85% { width: 100%; }
          100% { width: 0; }
        }

        @keyframes blink {
          50% { border-color: transparent; }
        }

        .typewriter-title {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 4px solid #7c3aed;
          width: 0;
          animation: 
            titleTyping 7s steps(35, end) infinite,
            blink 0.8s step-end infinite;
        }

        .subtitle-pop {
          letter-spacing: 0.8em;
          text-shadow: 0 0 12px rgba(124, 58, 237, 0.5);
          animation: subtitleGlow 4s ease-in-out infinite alternate;
        }

        @keyframes subtitleGlow {
          from { opacity: 0.6; filter: brightness(1); }
          to { opacity: 1; filter: brightness(1.4); }
        }
      `}</style>

      {/* BACKGROUND GIF - OPACITY TWEAKED TO 15% */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-15">
        <img src="/dark-magic-101.gif" className="w-full h-full object-cover" alt="" />
      </div>

      <div className="relative z-10 flex w-full h-full">
        <aside className="w-80 hidden lg:flex flex-col border-r border-white/10 bg-black/95 backdrop-blur-xl px-10 py-20 shrink-0">
          <h1 className="text-xl text-white font-normal tracking-[0.3em] uppercase mb-16 italic">{frontmatter.title}</h1>
          <nav className="flex-1 space-y-6">
            {sections.map((section: any) => (
              <div key={section.id} className={`transition-all duration-700 ${activeId === section.id ? 'opacity-100' : 'opacity-20'}`}>
                <span className="text-[10px] font-mono text-white tracking-[0.3em] uppercase">{section.title}</span>
                <div className={`mt-2 h-px transition-all duration-1000 ${activeId === section.id ? 'w-full bg-[#7c3aed]' : 'w-0'}`} />
              </div>
            ))}
          </nav>
        </aside>

        <main 
          ref={scrollContainerRef}
          className="flex-1 h-full overflow-y-auto snap-y snap-mandatory no-scrollbar relative scroll-smooth"
        >
          <section id="hero" className="h-screen w-full snap-start snap-always shrink-0 flex flex-col justify-center items-center text-center px-4">
             <div className="flex flex-col items-center">
               <div className="mb-6 h-16 md:h-20 flex items-center justify-center">
                 <h1 className="typewriter-title text-5xl md:text-7xl font-normal text-white uppercase tracking-[0.05em] leading-tight">
                   {frontmatter.title}
                 </h1>
               </div>
               
               {frontmatter.subtitle && (
                 <p className="subtitle-pop text-[#a78bfa] font-mono uppercase text-sm md:text-lg mt-8 border-t border-white/10 pt-10">
                   {frontmatter.subtitle}
                 </p>
               )}
             </div>
          </section>

          <div className="mdx-slide-engine">
            <MDXRemote {...mdxSource} components={components} />
          </div>
          
          <section className="h-screen w-full snap-start snap-always shrink-0 flex items-center justify-center bg-zinc-950/40">
            <p className="font-mono text-[10px] tracking-[2em] uppercase opacity-20">Link Terminated</p>
          </section>
        </main>
      </div>
    </div>
  );
}