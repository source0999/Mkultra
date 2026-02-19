'use client';
import Navbar from '../components/Navbar';
import TimelineSection from '../TimelineSection';

export default function ControlPage() {
  const controlData = [
    { id: "c1", era: "1984", title: "The Panopticon", desc: "Digital surveillance becomes the default logic of state power." },
    { id: "c2", era: "2026", title: "Omission", desc: "The final layer of systemic filtering." }
  ];

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black">
      <Navbar />
      {controlData.map((item) => (
        <TimelineSection key={item.id} item={item} />
      ))}
    </main>
  );
}