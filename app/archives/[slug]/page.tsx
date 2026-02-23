'use client';
import React, { use, useState } from 'react';
import { archives } from '@/app/data/archives';
import { notFound } from 'next/navigation';

export default function ArchivePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;
  
  const data = archives.find((t) => t.slug === slug);
  const [showRefs, setShowRefs] = useState<string | null>(null);

  if (!data) notFound();

  const themeColor = "#7D3CFF"; 

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-[#080808] scroll-smooth no-scrollbar selection:bg-purple-500/30">
      
      {data.sections.map((section, i) => (
        <section key={section.id} className="snap-start h-screen w-full relative flex items-center justify-center p-8 md:p-24 overflow-hidden">
          
          {/* BACKGROUND LAYER */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/kabbalah-main.jpg" 
              className="w-full h-full object-cover opacity-25 grayscale brightness-[0.5] transition-opacity duration-1000"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-transparent to-[#080808]/80" />
          </div>

          <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* MEDIA FRAME */}
            <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div 
                className="relative bg-zinc-950 border shadow-[0_0_50px_rgba(125,60,255,0.1)] overflow-hidden rounded-sm"
                style={{ borderColor: `${themeColor}40` }}
              >
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-purple-500/50" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-purple-500/50" />

                {section.type === 'video-focus' ? (
                  <div className="aspect-video w-full bg-black">
                    <iframe 
                      src={section.mediaUrl} 
                      className="w-full h-full border-0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen 
                    />
                  </div>
                ) : (
                  <img 
                    src={section.mediaUrl} 
                    className="w-full h-auto object-cover max-h-[50vh]" 
                    alt={section.title}
                  />
                )}
              </div>
            </div>

            {/* CONTENT BLOCK */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-white/90 uppercase">
                  {section.title}
                </h2>
                <div className="w-12 h-[2px] bg-purple-600" />
              </div>

              <div className="relative">
                 <div className="bg-zinc-950/95 backdrop-blur-md p-8 md:p-12 border border-white/5 rounded-sm">
                    <p className="text-zinc-100 font-sans font-normal text-lg md:text-2xl leading-[1.6] antialiased">
                      {section.content}
                    </p>
                 </div>
              </div>
              
              {section.references && (
                <div className="pt-4">
                  <button 
                    onClick={() => setShowRefs(showRefs === section.id ? null : section.id)} 
                    className="px-8 py-3 border border-purple-500/50 bg-purple-500/10 text-purple-200 font-mono text-xs tracking-widest uppercase hover:bg-purple-500/30 hover:text-white transition-all duration-300 rounded-sm"
                  >
                    {showRefs === section.id ? '[ TERMINATE_LINK ]' : '[ ACCESS_REFERENCES ]'}
                  </button>

                  {showRefs === section.id && (
                    <div className="mt-6 p-6 bg-black/90 border border-purple-500/20 rounded-sm animate-in fade-in slide-in-from-top-4">
                      {section.references.map((ref, idx) => (
                        <a key={idx} href={ref.url} target="_blank" className="block text-sm py-3 uppercase text-purple-300 hover:text-white transition-colors border-b border-white/5 last:border-0">
                          <span className="text-purple-600 mr-2 font-mono">[{idx + 1}]</span> {ref.sourceName}
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