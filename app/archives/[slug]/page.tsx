'use client';
import React, { use, useState } from 'react';
import { archives } from '@/app/data/archives';
import { notFound } from 'next/navigation';

export default function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const data = archives.find((a) => a.slug === resolvedParams.slug);
  const [showRefs, setShowRefs] = useState<string | null>(null);

  if (!data) notFound();

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-[#080808] scroll-smooth selection:bg-purple-500/30">
      {data.sections.map((section, i) => (
        <section key={section.id} className="snap-start h-screen w-full relative flex items-center justify-center p-8 md:p-24 overflow-hidden">
          
          {/* Background Visual Layer */}
          <div className="absolute inset-0 z-0 opacity-10 grayscale pointer-events-none">
            <img src={data.image} alt="" className="w-full h-full object-cover blur-sm" />
            <div className="absolute inset-0 bg-[#080808]/80" />
          </div>

          <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Media side */}
            <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="relative aspect-video bg-black border border-white/10 shadow-2xl">
                {section.type === 'video-focus' ? (
                  <iframe 
                    src={section.mediaUrl} 
                    className="w-full h-full border-0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                  />
                ) : (
                  <img src={section.mediaUrl} className="w-full h-full object-cover" alt={section.title} />
                )}
                {/* Corner Accents */}
                <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-purple-500" />
                <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-purple-500" />
              </div>
              {section.footnote && (
                <p className="mt-4 font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em] italic">{section.footnote}</p>
              )}
            </div>

            {/* Content side */}
            <div className="lg:col-span-7">
              <div className="mb-4 flex items-center gap-4">
                <div className="h-px w-8 bg-purple-600" />
                <span className="font-mono text-[10px] text-purple-400 tracking-[0.4em] uppercase">Archive_File // 0{i + 1}</span>
              </div>
              
              <h2 className="text-5xl font-bold text-white tracking-tighter uppercase italic mb-8">
                {section.title}
              </h2>
              
              <div className="bg-zinc-950/40 backdrop-blur-sm p-10 border border-white/5 relative">
                <div className="absolute top-0 left-0 w-[2px] h-full bg-purple-600" />
                <p className="text-zinc-200 text-xl leading-relaxed font-light">
                  {section.content}
                </p>
              </div>

              {section.references && (
                <div className="mt-8">
                  <button 
                    onClick={() => setShowRefs(showRefs === section.id ? null : section.id)}
                    className="group flex items-center gap-3 text-[10px] font-mono text-zinc-500 hover:text-white transition-colors uppercase tracking-widest"
                  >
                    <span className="px-2 py-1 bg-white/5 border border-white/10 group-hover:border-purple-500 transition-colors">
                      {showRefs === section.id ? '[-]' : '[+]'}
                    </span>
                    Access_References
                  </button>
                  {showRefs === section.id && (
                    <div className="mt-4 p-6 bg-black/60 border border-white/5 animate-in fade-in slide-in-from-top-2">
                      {section.references.map((ref, idx) => (
                        <a key={idx} href={ref.url} target="_blank" className="block py-2 text-xs text-zinc-400 hover:text-purple-400 transition-colors font-mono italic underline decoration-purple-900 underline-offset-4">
                          &gt; {ref.sourceName}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </section>
      ))}
    </main>
  );
}