import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import React from 'react';

const components = {
  ArchiveImage: ({ src, caption }: { src: string; caption?: string }) => (
    <div className="w-full flex flex-col items-center">
      <div 
        className="relative bg-black/60 p-1 group"
        style={{ border: '2px solid #7c3aed' }} 
      >
        <img 
          src={src} 
          alt={caption || "Archive Image"} 
          className="w-full max-h-[55vh] object-contain grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700" 
        />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(#7c3aed1a_50%,transparent_50%)] bg-[length:100%_4px]" />
      </div>
      {caption && !caption.includes("VISUAL_DATA") && (
        <p className="mt-3 text-[10px] text-[#7c3aed] font-mono tracking-widest uppercase italic opacity-80">
          {caption}
        </p>
      )}
    </div>
  ),
  Section: ({ children, source }: { children: React.ReactNode; source?: string }) => {
    const childrenArray = React.Children.toArray(children);
    const imageContent = childrenArray.find((child: any) => child.props?.mdxType === 'ArchiveImage' || child.type?.name === 'ArchiveImage');
    const textContent = childrenArray.filter((child: any) => child !== imageContent);

    return (
      <section className="min-h-screen w-full snap-start relative flex items-center justify-center p-8 md:p-20">
        <div 
          className="relative z-10 w-full max-w-6xl glass-crystal p-10 md:p-14"
          style={{ borderLeft: '4px solid #7c3aed', backgroundColor: 'rgba(10,5,20,0.85)' }} 
        >
          {source && (
            <div className="absolute -top-4 right-8">
              <a 
                href={source} 
                target="_blank" 
                className="btn-cyber px-6 py-2 text-[10px] tracking-[0.2em]"
                style={{ backgroundColor: '#7c3aed', color: '#ffffff' }}
              >
                SOURCE // {new URL(source).hostname.replace('www.', '')}
              </a>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6">
              {textContent}
            </div>
            <div className="md:col-span-5 flex justify-center">
              {imageContent}
            </div>
          </div>
        </div>
      </section>
    );
  },
  h2: (props: any) => <h2 {...props} className="text-2xl md:text-3xl font-header text-white uppercase border-b border-[#7c3aed]/50 pb-2 mb-4 tracking-tighter" />,
  p: (props: any) => <p {...props} className="text-sm md:text-base text-slate-300 font-light leading-relaxed" />,
  li: (props: any) => (
    <li className="flex gap-3 items-start text-xs md:text-sm text-slate-400 font-mono mb-2">
      <span className="text-[#7c3aed] font-bold">/</span>
      <span {...props} />
    </li>
  ),
  strong: (props: any) => <strong {...props} className="text-[#7c3aed] font-bold" />
};

export default async function ArchivePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'app', 'content', 'archives', `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return <div className="p-20 text-[#7c3aed] font-mono">FILE_LOST</div>;

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);

  return (
    <main className="bg-black h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar relative selection:bg-[#7c3aed]/40">
      
      {/* BACKGROUND WITH DARK OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="/dark-magic-101.gif" 
          className="w-full h-full object-cover brightness-[0.6] contrast-[1.1]" 
          alt="" 
        />
        {/* THIS IS THE TRANSPARENT BLACK OVERLAY */}
        <div className="absolute inset-0 bg-black/60" /> 
        
        {/* GRADIENT FADE TO EDGES */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="relative z-10">
        <section className="h-screen w-full snap-start flex items-center justify-center text-center px-6">
          <h1 className="typewriter-reveal text-5xl md:text-7xl lg:text-8xl font-display text-white uppercase tracking-tighter leading-none">
            {frontmatter.title}
          </h1>
        </section>

        <MDXRemote source={content} components={components} />
      </div>
    </main>
  );
}


//Old code
// const components = { 
//   ArchiveImage: MediaBlock, 
//   Section,
//   h1: (props: any) => <h1 {...props} className="section-header text-5xl md:text-6xl" />,
//   h2: (props: any) => <h2 {...props} className="section-header text-3xl md:text-4xl" />
// };

// export default async function ArchivePage({ params }: { params: Promise<{ slug: string }> }) {
//   const { slug } = await params;
//   const filePath = path.join(process.cwd(), 'content/archives', `${slug}.mdx`);
//   const { data: frontmatter, content } = matter(fs.readFileSync(filePath, 'utf8'));

//   return (
//     <main className="bg-[#050505] h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar relative">
      
//       {/* NAVBAR ANCHOR: Physical docking for the nav links */}
//       <div className="fixed top-0 left-0 w-full z-50">
//         <div className="h-16 bg-black/90 border-b border-white/5 backdrop-blur-xl flex items-center justify-between px-12">
//             {/* The navbar links would be here using the .nav-link class */}
//         </div>
//         <div className="h-40 bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none" />
//       </div>

//       {/* BACKGROUND ART: High visibility grayscale */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <img 
//           src={frontmatter.bgImage} 
//           className="w-full h-full object-cover opacity-75 grayscale contrast-[1.1] brightness-[0.5]" 
//           alt="" 
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-transparent to-black/95" />
//       </div>

//       <div className="relative z-10 pt-16">
//         {/* HERO LANDING: White Title Only */}
//         <section className="h-screen w-full snap-start flex flex-col items-center justify-center text-center px-6">
//           <div className="space-y-6">
//              <span className="text-purple-500/40 font-mono text-[10px] tracking-[2.2em] uppercase block ml-[2.2em]">Dossier_Link_Verified</span>
//              <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-['Bruno_Ace'] uppercase leading-none tracking-tighter hero-white-glow">
//                {frontmatter.title}
//              </h1>
//              <div className="pt-24">
//                <div className="h-24 w-[1px] bg-gradient-to-b from-purple-500 to-transparent mx-auto animate-bounce opacity-50" />
//              </div>
//           </div>
//         </section>

//         {/* MDX CONTENT: Renders the Sections with Purple Headers */}
//         <MDXRemote source={content} components={components} />
//       </div>
//     </main>
//   );
// }