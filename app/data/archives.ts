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
    era: "1520s — PRESENT",
    accentColor: "#7D3CFF", 
    sections: [
      { 
        id: "k1", 
        type: 'text-only', 
        title: "Definition of “Kabbalah”", 
        content: "\"Jewish mystic philosophy,\" 1520s, also quabbalah, etc., from Medieval Latin cabbala, from Mishnaic Hebrew qabbalah \"reception, received lore, tradition,\" especially \"tradition of mystical interpretation of the Old Testament,\" from qibbel \"to receive, admit, accept.\" Hence \"any secret or esoteric science.\"", 
        mediaUrl: "/kabbalah-main.jpg", // Restored correctly
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
      }
    ]
  },
  {
    id: "h-02",
    title: "SECRET SOCIETIES",
    desc: "From the Knights Templar to the P2 Lodge: How shadow groups guide policy.",
    image: "/societies.jpg",
    slug: "secret-societies",
    era: "1119 — PRESENT",
    accentColor: "#7D3CFF",
    sections: [
      { id: "s1", type: 'infinite-scroll', title: "Financial Evolution", content: "Historical tracing of the Order of the Temple.", mediaUrl: "/societies.jpg" }
    ]
  }
];

export const theories = archives;