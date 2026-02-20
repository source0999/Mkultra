// export interface Theory {
//   id: string;
//   title: string;
//   desc: string;
//   image: string;
//   link: string;
//   slug: string;
//   era: string;
//   details?: string; // Add this for the sub-pages later
// }

// export const theories: Theory[] = [
//   {
//     id: "h-01",
//     title: "MOLOCH & SACRIFICE",
//     desc: "Tracking the continuity of blood ritual from Canaan to the modern day.",
//     image: "/moloch.jpg",
//     link: "/theories/ritual-history",
//     slug: "ritual-history",
//     era: "ERA // 2500 BC - 2026"
//   },
//   {
//     id: "h-02",
//     title: "SECRET SOCIETIES",
//     desc: "From the Knights Templar to the P2 Lodge: How shadow groups guide policy.",
//     image: "/societies.jpg",
//     link: "/theories/secret-societies",
//     slug: "secret-societies",
//     era: "ERA // 1119 - PRESENT"
//   },
//   {
//     id: "h-03",
//     title: "ROTHSCHILD RISE",
//     desc: "The 18th-century origin of the world's most powerful banking dynasty.",
//     image: "/rothschild-origin.jpg",
//     link: "/theories/rothschild-rise",
//     slug: "rothschild-rise",
//     era: "ERA // 1744 - 1815"
//   },
//   {
//     id: "h-04",
//     title: "ISRAELI HEGEMONY",
//     desc: "The secret intelligence and financial maneuvers behind the 1948 statehood.",
//     image: "/israel-control.jpg",
//     link: "/theories/israel-control",
//     slug: "israel-control",
//     era: "ERA // 1917 - 1948"
//   },
//   {
//     id: "h-05",
//     title: "PALANTIR SURVEILLANCE",
//     desc: "The rise of algorithmic control and the end of digital privacy.",
//     image: "/palantir.jpg",
//     link: "/theories/palantir-rise",
//     slug: "palantir-rise",
//     era: "ERA // 2003 - 2026"
//   },
//   {
//     id: "h-06",
//     title: "GNOSTIC FALSE REALITY",
//     desc: "Escaping the Demiurge: The ancient path to breaking the material matrix.",
//     image: "/gnostic.jpg",
//     link: "/theories/gnostic-reality",
//     slug: "gnostic-reality",
//     era: "ERA // 2ND CENTURY - 2026"
//   }
// ];

export interface Reference {
  sourceName: string;
  url: string;
}

export interface TheorySection {
  id: string;
  type: 'infinite-scroll' | 'split-image' | 'video-focus' | 'text-only';
  title?: string;
  content: string;
  mediaUrl?: string; 
  references?: Reference[];
}

export interface Theory {
  id: string;
  title: string;
  desc: string;
  image: string; 
  slug: string; // This MUST match your folder structure
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
        id: "s1",
        type: 'infinite-scroll',
        title: "The Valley of Hinnom",
        content: "Ancient records describe Tophet as the original site of the bronze idol. This section represents our oldest data point.",
        mediaUrl: "/hinnom.jpg",
        references: [{ sourceName: "Leviticus 18:21", url: "#" }]
      },
      {
        id: "s2",
        type: 'split-image',
        title: "The Bronze Bull",
        content: "As the ritual moved into the Carthaginian era, iconography shifted toward the bull. Here we see the transition into organized social control.",
        mediaUrl: "/bull.jpg"
      }
    ]
  },
  {
    id: "h-06",
    title: "GNOSTIC REALITY",
    desc: "Escaping the Demiurge: The ancient path to breaking the material matrix.",
    image: "/gnostic.jpg",
    slug: "gnostic-reality",
    era: "ERA // 2ND CENTURY - 2026",
    sections: [
      {
        id: "g1",
        type: 'text-only',
        title: "The Blind Architect",
        content: "The Gnostic view suggests our reality is a flawed simulation made by a blind god. This is the foundation of our modern simulation theory.",
      },
      {
        id: "g2",
        type: 'video-focus',
        title: "Signal Interference",
        content: "Watch how modern frequencies interact with the human pineal gland to maintain the 'matrix' state.",
        mediaUrl: "/videos/frequency.mp4",
        references: [{ sourceName: "Baudrillard Archive", url: "https://example.com" }]
      }
    ]
  }
];