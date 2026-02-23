'use client';
import Link from 'next/link';
import { archives } from '@/app/data/archives';

export default function MasterArchives() {
  return (
    <main className="min-h-screen bg-[#080808] pt-40 pb-20 px-10 selection:bg-purple-500/30">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header section matching your screenshot */}
        <header className="mb-20 border-l-4 border-purple-600 pl-8">
          <h1 className="text-6xl font-bold text-white tracking-tighter uppercase italic">Master_Archives</h1>
          <p className="text-zinc-600 font-mono text-xs mt-2 tracking-[0.5em]">SELECT ENTRY TO INITIALIZE DECRYPTION</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {archives.map((entry) => (
            <Link 
              key={entry.id} 
              href={`/archives/${entry.slug}`}
              className="group relative bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
            >
              {/* Media Preview Area */}
              <div className="aspect-video w-full overflow-hidden bg-zinc-900">
                <img 
                  src={entry.image} 
                  alt={entry.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" 
                />
              </div>

              <div className="p-8">
                {/* Dynamic Accent Line */}
                <div 
                  className="w-12 h-[2px] mb-6 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: entry.accentColor || '#7D3CFF' }}
                />

                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] tracking-widest text-purple-500 uppercase">{entry.era}</span>
                </div>

                <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter">
                  {entry.title}
                </h2>
                
                <p className="text-zinc-500 text-sm leading-relaxed mb-8 line-clamp-2">
                  {entry.desc}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-zinc-600 font-mono uppercase">Status:</span>
                    <span className="text-[9px] text-green-500 font-mono uppercase tracking-widest animate-pulse">Decrypted</span>
                  </div>
                  <span className="text-purple-600 font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                    Initialize_File &gt;&gt;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}