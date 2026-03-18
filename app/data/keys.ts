export interface KeyEntry {
  id: string;
  title: string;
  desc: string;
  image: string;
  slug: string;
  era: string;
  accentColor: string; 
}

export const keys: KeyEntry[] = [
  {
    id: "h-06",
    title: "THE KABBALAH",
    desc: "A deep-layer analysis of the 'received' tradition and its intersection with modern power structures.",
    image: "/kabbalah-main.jpg", 
    slug: "the-kabbalah",
    era: "ERA // 1520s - PRESENT",
    accentColor: "#7D3CFF", 
  },
  {
    id: "h-01",
    title: "MOLOCH & SACRIFICE",
    desc: "Tracking the continuity of blood ritual from Canaan to the modern day.",
    image: "/moloch.jpg",
    slug: "ritual-history",
    era: "ERA // 2500 BC - 2026",
    accentColor: "#FF3C3C",
  },
  {
    id: "h-02",
    title: "SECRET SOCIETIES",
    desc: "From the Knights Templar to the P2 Lodge: How shadow groups guide policy.",
    image: "/societies.jpg",
    slug: "secret-societies",
    era: "ERA // 1119 - PRESENT",
    accentColor: "#7D3CFF",
  },
  {
    id: "h-03",
    title: "ROTHSCHILD RISE",
    desc: "The 18th-century origin of the world's most powerful banking dynasty.",
    image: "/rothschild-origin.jpg",
    slug: "rothschild-rise",
    era: "ERA // 1744 - 1815",
    accentColor: "#D4AF37",
  },
  {
    id: "h-05",
    title: "PALANTIR SURVEILLANCE",
    desc: "The rise of algorithmic control and the end of digital privacy.",
    image: "/palantir.jpg",
    slug: "palantir-rise",
    era: "ERA // 2003 - 2026",
    accentColor: "#00F0FF",
  }
];

export const theories = keys;