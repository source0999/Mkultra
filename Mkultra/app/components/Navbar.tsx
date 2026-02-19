import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-[100] flex justify-between items-center px-6 py-6 md:px-12 bg-black/60 backdrop-blur-md border-b border-purple-900/20">
      <Link href="/" className="text-purple-500 font-bold tracking-tighter text-2xl uppercase italic">
        Omitted
      </Link>
      
      <div className="flex gap-6 md:gap-10">
        <Link href="/" className="text-[10px] uppercase tracking-[0.4em] text-stone-300 hover:text-purple-400 transition-all"> Ritual </Link>
        <Link href="/control" className="text-[10px] uppercase tracking-[0.4em] text-stone-300 hover:text-purple-400 transition-all"> Control </Link>
        <Link href="/archive" className="text-[10px] uppercase tracking-[0.4em] text-stone-300 hover:text-purple-400 transition-all"> Archive </Link>
      </div>
    </nav>
  );
}