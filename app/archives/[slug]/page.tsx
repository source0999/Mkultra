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
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-[#080808] scroll-smooth no-scrollbar font-sans selection:bg-purple-500/30">
      
      {data.sections.map((section, i) => (
        <section key={section.id} className="snap-start h-screen w-full relative flex items-center justify-center p-6 md:p-16 overflow-hidden">
          
          <div className="absolute inset-0 z-0">
            <img 
              src={section.type === 'video-focus' ? '/kabbalah-main.jpg' : section.mediaUrl} 
              className="w-full h-full object-cover opacity-20 grayscale transition-opacity duration-1000"
              alt=""
              onError={(e) => { (e.target as HTMLImageElement).src = "/kabbalah-main.jpg" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#080808]/80 to-[#080808]" />
            <div className="absolute inset-0 bg-purple-900/5 mix-blend-color" />
          </div>

          <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div 
                className="relative bg-zinc-950/80 border shadow-[0_0_30px_rgba(125,60,255,0.2)] overflow-hidden"
                style={{ borderColor: `${themeColor}80` }}
              >
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: themeColor }} />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: themeColor }} />

                {section.type === 'video-focus' ? (
                  <div className="aspect-video w-full bg-black">
                    <iframe src={section.mediaUrl} className="w-full h-full" allowFullScreen />
                  </div>
                ) : (
                  <img 
                    src={section.mediaUrl} 
                    className="w-full h-auto object-cover max-h-[60vh]" 
                    alt={section.title}
                    onError={(e) => { (e.target as HTMLImageElement).src = "/kabbalah-main.jpg" }} 
                  />
                )}
              </div>
              
              {section.footnote && (
                <p className="mt-4 text-[10px] font-mono text-zinc-500 leading-relaxed border-l border-purple-500/40 pl-4 max-w-lg">
                  {section.footnote}
                </p>
              )}
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-1">
                <span className="font-mono text-[9px] tracking-[0.6em] text-purple-400 uppercase block opacity-80">
                  ARCHIVE_FILE // 0{i + 1}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.9] text-white">
                  {section.title}
                </h2>
              </div>

              <div className="relative">
                 <div className="bg-zinc-900/30 backdrop-blur-sm p-4 border-l-2 border-purple-500/20 shadow-xl">
                    <p className="text-zinc-200 font-sans font-normal text-sm md:text-base leading-relaxed">
                      {section.content}
                    </p>
                 </div>
              </div>
              
              {section.references && (
                <div className="pt-2">
                  <button 
                    onClick={() => setShowRefs(showRefs === section.id ? null : section.id)} 
                    className="text-[10px] border px-6 py-2 transition-all uppercase text-white font-mono tracking-widest bg-purple-600/10 hover:bg-purple-600/40 transition-colors"
                    style={{ borderColor: `${themeColor}90` }}
                  >
                    {showRefs === section.id ? '// CLOSE_DATA' : '// ACCESS_REF'}
                  </button>
                  {showRefs === section.id && (
                    <div className="mt-4 p-4 bg-black/90 border border-purple-500/40 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
                      {section.references.map((ref, idx) => (
                        <a key={idx} href={ref.url} target="_blank" className="block text-xs py-2 uppercase text-purple-300 hover:text-white transition-colors">
                          [{idx + 1}] {ref.sourceName}
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