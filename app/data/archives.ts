export interface ArchiveSection {
  id: string;
  type: 'infinite-scroll' | 'split-image' | 'video-focus' | 'text-only';
  title: string;
  content: string;
  mediaUrl: string;
  footnote?: string; 
  references?: { sourceName: string; url: string }[];
}

export interface ArchiveEntry {
  id: string;
  title: string;
  desc: string;
  image: string;
  slug: string;
  era: string;
  accentColor: string; 
  sections: ArchiveSection[];
}

export const archives: ArchiveEntry[] = [
  {
    id: "h-06",
    title: "THE KABBALAH",
    desc: "A deep-layer analysis of the 'received' tradition and its intersection with modern power structures.",
    image: "/kabbalah-main.jpg", 
    slug: "the-kabbalah",
    era: "ERA // 1520s - PRESENT",
    accentColor: "#7D3CFF", 
    sections: [
      { 
        id: "k1", 
        type: 'text-only', 
        title: "Definition of “Kabbalah”", 
        content: "\"Jewish mystic philosophy,\" 1520s, also quabbalah, etc., from Medieval Latin cabbala, from Mishnaic Hebrew qabbalah \"reception, received lore, tradition,\" especially \"tradition of mystical interpretation of the Old Testament,\" from qibbel \"to receive, admit, accept.\" Hence \"any secret or esoteric science.\"", 
        mediaUrl: "/kabbalah-main.jpg",
        references: [{ sourceName: "Etymonline", url: "https://www.etymonline.com/word/kabbalah" }]
      },
      { 
        id: "k2", 
        type: 'split-image', 
        title: "The Received Tradition", 
        content: "“The word “Kabbalah” is, therefore, a claim by Jewish spiritualists from the High Middle Ages to this day that they have a tradition that was held secret for many centuries. “ - Joseph Dan", 
        mediaUrl: "/jewishMyst.jpg" 
      },
      { 
        id: "k3", 
        type: 'split-image', 
        title: "Architecture of Secrecy", 
        content: "The windowless, neo-Egyptian and Moorish styles were designed to physically represent the organizations' commitment to privacy and tradition.", 
        mediaUrl: "/secretSocities.jpg",
        footnote: "¹ Alice Heighes Donlevy (c. 1880), Secret Society Buildings at Yale College. Image courtesy of Yale University Manuscripts & Archives."
      },
      { 
        id: "k-video-final", 
        type: 'video-focus', 
        title: "The Androgyny Agenda", 
        content: "This segment analyzes the concept of 'Tikkun Olam' or 'Repairing the World.' It suggests a doctrine where the restoration of the divine involves merging male and female into a singular androgynous archetype (Adam Kadmon), claiming this ancient belief provides the blueprint for modern gender-fluidity agendas.", 
        mediaUrl: "https://www.youtube.com/embed/WWpOse_SFFY?start=4959", 
        footnote: "ARCHIVE_REF: B-BORN-AGAIN // KABBALAH DOCUMENTARY [01:22:39]",
        references: [{ sourceName: "Full Documentary", url: "https://www.youtube.com/watch?v=WWpOse_SFFY&t=4959s" }]
      }
    ]
  },
  {
    id: "h-01",
    title: "MOLOCH & SACRIFICE",
    desc: "Tracking the continuity of blood ritual from Canaan to the modern day.",
    image: "/moloch.jpg",
    slug: "ritual-history",
    era: "ERA // 2500 BC - 2026",
    accentColor: "#FF3C3C",
    sections: [
      {
        id: "m1",
        type: 'infinite-scroll',
        title: "The Valley of Hinnom",
        content: "Ancient records describe Tophet as a resonant chamber for ritual. This early data point tracks the frequency of sacrificial culture.",
        mediaUrl: "/canaannites.jpg"
      },
      {
        id: "m2",
        type: 'split-image',
        title: "Carthagenian Continuity",
        content: "The ritual moved via trade routes. The bronze idol became a method of population control used by the ruling class.",
        mediaUrl: "/moloch.jpg",
        references: [{ sourceName: "Archival Record #09", url: "#" }]
      },
      {
        id: "m3",
        type: 'video-focus',
        title: "Modern Iconography",
        content: "From the Grove to global summits, the owl remains a silent watcher. We monitor the continuity of these symbolic structures.",
        mediaUrl: "/background.gif"
      }
    ]
  },
  {
    id: "h-02",
    title: "SECRET SOCIETIES",
    desc: "From the Knights Templar to the P2 Lodge: How shadow groups guide policy.",
    image: "/societies.jpg",
    slug: "secret-societies",
    era: "ERA // 1119 - PRESENT",
    accentColor: "#7D3CFF",
    sections: [
      { id: "s1", type: 'infinite-scroll', title: "The Financial Guard", content: "The Order of the Temple didn't vanish; it evolved into the modern banking infrastructure.", mediaUrl: "/societies.jpg" },
      { id: "s2", type: 'text-only', title: "P2 Lodge Scandal", content: "Propaganda Due proved shadow governments aren't just a theory, but an operational reality of the 20th century.", mediaUrl: "/background.gif" },
      { id: "s3", type: 'split-image', title: "Modern Governance", content: "The transition from secret handshakes to invitation-only economic forums.", mediaUrl: "/globe.svg" }
    ]
  },
  {
    id: "h-03",
    title: "ROTHSCHILD RISE",
    desc: "The 18th-century origin of the world's most powerful banking dynasty.",
    image: "/rothschild-origin.jpg",
    slug: "rothschild-rise",
    era: "ERA // 1744 - 1815",
    accentColor: "#D4AF37",
    sections: [
      { id: "r1", type: 'split-image', title: "The Red Shield", content: "Five arrows, five capitals. The original blueprint for global financial synchronization.", mediaUrl: "/rothschild-origin.jpg" },
      { id: "r2", type: 'infinite-scroll', title: "Market Coup", content: "Utilization of private courier networks to influence the British console market during the Napoleonic wars.", mediaUrl: "/background.gif" },
      { id: "r3", type: 'text-only', title: "Dynastic Continuity", content: "The fiscal architecture of the modern world still bears the signature of the 18th-century rise.", mediaUrl: "/logo.png" }
    ]
  },
  {
    id: "h-05",
    title: "PALANTIR SURVEILLANCE",
    desc: "The rise of algorithmic control and the end of digital privacy.",
    image: "/palantir.jpg",
    slug: "palantir-rise",
    era: "ERA // 2003 - 2026",
    accentColor: "#00F0FF",
    sections: [
      { id: "p1", type: 'video-focus', title: "The Seeing Stone", content: "Predictive modeling that turns human intent into a measurable, harvestable data point.", mediaUrl: "/palantir.jpg" },
      { id: "p2", type: 'split-image', title: "Predictive Policing", content: "Algorithmic governance replacing the traditional rule of law with statistical 'pre-crime' probabilities.", mediaUrl: "/window.svg" },
      { id: "p3", type: 'infinite-scroll', title: "Digital Enclosure", content: "The final phase of total information awareness and the end of the private individual.", mediaUrl: "/background.gif" }
    ]
  }
];

export const theories = archives;