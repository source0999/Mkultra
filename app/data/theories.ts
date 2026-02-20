export interface TheorySection {
  id: string;
  type: 'infinite-scroll' | 'split-image' | 'video-focus' | 'text-only';
  title: string;
  content: string;
  mediaUrl: string;
  references?: { sourceName: string; url: string }[];
}

export interface Theory {
  id: string;
  title: string;
  desc: string;
  image: string;
  slug: string;
  era: string;
  sections: TheorySection[];
}

export const theories: Theory[] = [
  {
    id: "h-01",
    title: "MOLOCH & SACRIFICE",
    desc: "Tracking the continuity of blood ritual from Canaan to the modern day.",
    image: "/moloch.jpg",
    slug: "ritual-history",
    era: "ERA // 2500 BC - 2026",
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
    sections: [
      { id: "p1", type: 'video-focus', title: "The Seeing Stone", content: "Predictive modeling that turns human intent into a measurable, harvestable data point.", mediaUrl: "/palantir.jpg" },
      { id: "p2", type: 'split-image', title: "Predictive Policing", content: "Algorithmic governance replacing the traditional rule of law with statistical 'pre-crime' probabilities.", mediaUrl: "/window.svg" },
      { id: "p3", type: 'infinite-scroll', title: "Digital Enclosure", content: "The final phase of total information awareness and the end of the private individual.", mediaUrl: "/background.gif" }
    ]
  }
];