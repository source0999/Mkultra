interface HeaderProps {
  title: string;
  subtitle: string;
  pattern: string;
}

export default function TimelineHeader({ title, subtitle, pattern }: HeaderProps) {
  return (
    <div className="py-20 px-10 bg-black text-white">
      <p className="text-purple-500 uppercase tracking-widest text-xs mb-2">{pattern}</p>
      <h2 className="text-5xl font-bold mb-4">{title}</h2>
      <p className="text-stone-400 max-w-lg">{subtitle}</p>
    </div>
  );
}