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
    id: "h-07",
    title: "DEFINING KABBALAH",
    desc: "A focused overview of Kabbalah as a received, esoteric tradition: Nigleh (revealed) vs Nistar (concealed).",
    image: "/gnostic.jpg",
    slug: "defining-kabbalah",
    era: "ERA // TERMS AND TWO-LEVEL TEXT",
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
  },
  {
    id: "h-08",
    title: "RABBINIC JUDAISM",
    desc: "How Rabbinic instruction developed around the Talmud and how four major denominations relate differently to Kabbalah.",
    image: "/sefer.jpg",
    slug: "rabbinic-denominations",
    era: "ERA // 70 AD - MODERN",
    accentColor: "#00F0FF",
  },
  {
    id: "h-09",
    title: "KEYS, CABAL & THE DEBATE",
    desc: "Lock-and-key Zohar framing, the 'Cabal' linkage to elite power, and the debate over divine light vs occult critique.",
    image: "/zohar.jpg",
    slug: "keys-cabal-debate",
    era: "ERA // CONTEMPORARY DEBATE",
    accentColor: "#D4AF37",
  },
];

export const theories = keys;