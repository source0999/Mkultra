import Image from "next/image";

export const mdxComponents = {
  h2: ({ children }: any) => (
    <h2 className="text-2xl font-bold text-[--purple-accent] mb-6 mt-12 tracking-tighter uppercase border-b border-white/10 pb-2">
      {children}
    </h2>
  ),
  p: ({ children }: any) => (
    <p className="text-zinc-400 leading-relaxed mb-6 text-lg font-light">
      {children}
    </p>
  ),
  Section: ({ children, source }: any) => (
    <section className="mb-16 p-6 border border-white/5 bg-zinc-900/20 backdrop-blur-sm">
      {children}
      {source && (
        <div className="mt-4 text-[10px] text-zinc-600 uppercase font-mono tracking-widest">
          SOURCE_NODE // {source}
        </div>
      )}
    </section>
  ),
  ArchiveImage: ({ src, caption }: any) => (
    <div className="my-8 group border border-white/10 p-1 bg-black">
      <div className="relative aspect-video w-full overflow-hidden">
        <img 
          src={src} 
          alt={caption} 
          className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="p-2 flex justify-between items-center font-mono text-[10px] text-zinc-500">
        <span>{caption}</span>
        <span className="text-[--purple-accent] animate-pulse">DECRYPTED</span>
      </div>
    </div>
  ),
};