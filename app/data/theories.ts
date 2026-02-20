export interface Theory {
  id: string;
  title: string;
  desc: string;
  image: string;
  link: string;
  slug: string;
  era: string;
}

export const theories: Theory[] = [
  {
    id: "h-01",
    title: "MOLOCH & SACRIFICE",
    desc: "Tracking the continuity of blood ritual from Canaan to the modern day.",
    image: "/moloch.jpg",
    link: "/theories/ritual-history",
    slug: "ritual-history",
    era: "ERA // 2500 BC - 2026"
  },
  {
    id: "h-02",
    title: "SECRET SOCIETIES",
    desc: "From the Knights Templar to the P2 Lodge: How shadow groups guide policy.",
    image: "/societies.jpg",
    link: "/theories/secret-societies",
    slug: "secret-societies",
    era: "ERA // 1119 - PRESENT"
  },
  {
    id: "h-03",
    title: "ROTHSCHILD RISE",
    desc: "The 18th-century origin of the world's most powerful banking dynasty.",
    image: "/rothschild-origin.jpg",
    link: "/theories/rothschild-rise",
    slug: "rothschild-rise",
    era: "ERA // 1744 - 1815"
  },
  {
    id: "h-04",
    title: "ISRAELI HEGEMONY",
    desc: "The secret intelligence and financial maneuvers behind the 1948 statehood.",
    image: "/israel-control.jpg",
    link: "/theories/israel-control",
    slug: "israel-control",
    era: "ERA // 1917 - 1948"
  },
  {
    id: "h-05",
    title: "PALANTIR SURVEILLANCE",
    desc: "The rise of algorithmic control and the end of digital privacy.",
    image: "/palantir.jpg",
    link: "/theories/palantir-rise",
    slug: "palantir-rise",
    era: "ERA // 2003 - 2026"
  },
  {
    id: "h-06",
    title: "GNOSTIC FALSE REALITY",
    desc: "Escaping the Demiurge: The ancient path to breaking the material matrix.",
    image: "/gnostic.jpg",
    link: "/theories/gnostic-reality",
    slug: "gnostic-reality",
    era: "ERA // 2ND CENTURY - 2026"
  }
];