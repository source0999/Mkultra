"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MDXRemote } from 'next-mdx-remote';

const extractYouTubeId = (input: string): string | undefined => {
  const trimmed = input?.trim();
  if (!trimmed) return undefined;

  // If it looks like a bare YouTube id, accept it.
  if (!trimmed.includes('://') && !trimmed.includes('/') && trimmed.length >= 6) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.toLowerCase();

    // https://youtu.be/<id>
    if (host === 'youtu.be') {
      return url.pathname.replace(/^\/+/, '').split('/')[0] || undefined;
    }

    // https://www.youtube.com/watch?v=<id>
    const v = url.searchParams.get('v');
    if (v) return v;

    // https://www.youtube.com/embed/<id>
    const parts = url.pathname.split('/').filter(Boolean);
    const embedIndex = parts.findIndex((p) => p.toLowerCase() === 'embed');
    if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];
  } catch {
    // Fall through to regex extraction.
  }

  // Regex fallback for common patterns
  const match = trimmed.match(/(?:v=|youtu\.be\/|\/embed\/)([a-zA-Z0-9_-]{6,})/);
  return match?.[1];
};

const Video = ({ src, sources = [] }: { src: string; sources?: string[] }) => {
  const videoId = extractYouTubeId(src);
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="aspect-video border border-[#7c3aed]/30 bg-black relative shadow-2xl">
        <iframe
          className="w-full h-full relative z-10"
          src={videoId ? `https://www.youtube.com/embed/${videoId}` : undefined}
          allowFullScreen
        />
      </div>
      <div className="mt-4 space-y-4">
        <span className="text-[10px] font-mono text-[#7c3aed] tracking-[0.4em] uppercase block mb-4 border-b border-white/10 pb-2">Data_Stream //</span>
        {sources.map((s, i) => (
          <div key={i} className="p-3 border border-white/5 bg-white/5 text-[10px] font-mono text-slate-500 truncate">{s}</div>
        ))}
      </div>
    </div>
  );
};

const components = {
  Chapter: ({ id }: { id: string }) => (
    <div id={id} className="absolute top-0 h-px w-full pointer-events-none slide-anchor" />
  ),
  Slide: ({ children }: { children: React.ReactNode }) => (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[70vh] slide-section">
      <div className="lg:col-span-5 flex flex-col justify-center">
        {Array.isArray(children) ? children[0] : children}
      </div>
      <div className="lg:col-span-7 flex flex-col justify-center">
        {Array.isArray(children) ? children[1] : null}
      </div>
    </div>
  ),
  KeyImage: ({ src, caption, sources = [] }: { src: string; caption?: string; sources?: string[] }) => (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="relative border border-[#7c3aed]/30 bg-black/40 p-1 w-full max-w-4xl shadow-2xl">
        <img src={src} className="max-h-[60vh] w-full object-contain grayscale hover:grayscale-0 transition-all duration-1000" alt="" />
      </div>
      {caption && <p className="mt-6 text-[10px] font-mono tracking-[0.5em] text-[#7c3aed] uppercase opacity-60 w-full text-center">{caption}</p>}
      <div className="w-full mt-6 space-y-4">
        <span className="text-[10px] font-mono text-[#7c3aed] tracking-[0.4em] uppercase block mb-4 border-b border-white/10 pb-2">Reference_Node //</span>
        {sources.map((s, i) => (
          <div key={i} className="p-3 border border-white/5 bg-white/5 text-[10px] font-mono text-slate-500 truncate">{s}</div>
        ))}
      </div>
    </div>
  ),
  Video,
  h2: (props: any) => (
    <div className="h-screen flex flex-col justify-center slide-section">
       <h2 {...props} className="text-5xl md:text-8xl font-light tracking-tighter text-white uppercase border-b border-white/5 pb-8" />
    </div>
  ),
  h3: (props: any) => (
    <div className="border-l-4 border-[#7c3aed] pl-6 mb-10 mt-20">
      <h3 {...props} className="text-lg md:text-2xl font-mono text-[#a78bfa] tracking-[0.4em] uppercase" />
    </div>
  ),
  p: (props: any) => <p {...props} className="text-xl md:text-2xl leading-relaxed text-slate-300 font-sans mb-10 opacity-80 max-w-4xl" />,
  li: (props: any) => <li {...props} className="text-slate-400 font-mono text-sm uppercase tracking-widest flex mb-4 before:content-['//'] before:mr-4 before:text-[#7c3aed]" />,
};

export default function KeyUI({ mdxSource, frontmatter }: any) {
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
      { root: scrollContainerRef.current, threshold: 0.1, rootMargin: "-10% 0% -70% 0%" }
    );

    const elements = document.querySelectorAll('.slide-anchor');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className="fixed inset-0 bg-black text-slate-200 overflow-hidden flex font-sans">
      <style jsx global>{`
        .mdx-slide-engine {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .slide-section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes titleTyping {
          0%, 100% { width: 0; }
          30%, 80% { width: 100%; }
        }
        .typewriter-title {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 4px solid #7c3aed;
          animation: titleTyping 8s steps(30, end) infinite;
        }
      `}</style>

      {/* Background Layer - Reverted to your OG settings */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <img src="/dark-magic-101.gif" className="w-full h-full object-cover" alt="" />
      </div>

      <div className="relative z-10 flex w-full h-full">
        <aside className="w-80 hidden lg:flex flex-col border-r border-white/10 bg-black/90 backdrop-blur-3xl px-10 py-20 shrink-0">
          <h1 className="text-xl text-white font-normal tracking-[0.4em] uppercase mb-16 italic border-b border-[#7c3aed]/20 pb-4">{frontmatter.title}</h1>
          <nav className="flex-1 space-y-8">
            {sections.map((section: any) => (
              <div key={section.id} className={`transition-all duration-700 ${activeId === section.id ? 'opacity-100' : 'opacity-20'}`}>
                <span className="text-[11px] font-mono text-white tracking-[0.3em] uppercase">{section.title}</span>
                <div className={`mt-2 h-px transition-all duration-1000 ${activeId === section.id ? 'w-full bg-[#7c3aed]' : 'w-0'}`} />
              </div>
            ))}
          </nav>
        </aside>

        <main ref={scrollContainerRef} className="flex-1 h-full overflow-y-auto snap-y snap-mandatory no-scrollbar relative scroll-smooth bg-black/40">
          <section id="hero" className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center text-center px-10">
              <div className="h-28">
                <h1 className="typewriter-title text-5xl md:text-8xl font-normal text-white uppercase tracking-[0.1em]">
                  {frontmatter.title}
                </h1>
              </div>
              {frontmatter.subtitle && (
                <p className="text-[#a78bfa] font-mono uppercase text-sm md:text-xl mt-12 opacity-60 tracking-[0.8em]">
                  {frontmatter.subtitle}
                </p>
              )}
          </section>

          <div className="mdx-slide-engine px-10 lg:px-24">
            <MDXRemote {...mdxSource} components={components} />
          </div>
        </main>
      </div>
    </div>
  );
}