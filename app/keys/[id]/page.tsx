import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { notFound } from 'next/navigation';
import KeyUI from './KeyUI';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const filePath = path.join(process.cwd(), 'app', 'content', 'keys', `${id}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);
  const mdxSource = await serialize(content);

  return <KeyUI keyId={id} mdxSource={mdxSource} frontmatter={frontmatter} rawContent={content} />;
}


//Old code
// const components = { 
//   KeyImage: MediaBlock, 
//   Section,
//   h1: (props: any) => <h1 {...props} className="section-header text-5xl md:text-6xl" />,
//   h2: (props: any) => <h2 {...props} className="section-header text-3xl md:text-4xl" />
// };

// export default async function KeyPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
//   const filePath = path.join(process.cwd(), 'content/keys', `${id}.mdx`);
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