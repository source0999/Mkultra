'use client';

// THESE IMPORTS ARE ESSENTIAL - DO NOT REMOVE
import Navbar from './components/Navbar';
import HomeHero from './components/HomeHero';
import TimelineHeader from './components/TimelineHeader';
import TimelineSection from './TimelineSection';

export default function Home() {
  const mkUltraHistory = [
    { 
      id: "r1", 
      era: "1953", 
      title: "Project MKUltra", 
      desc: "The CIA's clandestine mind control research program, officially sanctioned in 1953." 
    },
    { 
      id: "r2", 
      era: "1973", 
      title: "Records Destroyed", 
      desc: "CIA Director Richard Helms orders the destruction of all MKUltra files, leaving only fragmented truths." 
    }
  ];

  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black overflow-x-hidden">
      <Navbar />
      
      <div id="home" className="snap-start w-full h-screen">
        <HomeHero />
      </div>

      <div id="ritual" className="w-full">
        {/* Updated to pass props correctly */}
        <TimelineHeader 
          title="Omitted History" 
          subtitle="Patterns of systemic psychological manipulation." 
          pattern="Classified Exchange" 
        />
        
        {mkUltraHistory.map((item) => (
          <div key={item.id} className="snap-start h-screen w-full">
            <TimelineSection item={item} />
          </div>
        ))}
      </div>
    </main>
  );
}