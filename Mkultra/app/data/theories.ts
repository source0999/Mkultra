export interface Theory {
  id: string;
  title: string;
  desc: string;
  image: string;
  link: string;
  era: string; // This fixes the Type error
}

export const theories: Theory[] = [
  {
    id: "theory-1",
    title: "History of the cannibals",
    desc: "Uncovering the origins of ritualatic sacrifces.",
    image: "/moloch.jpg",
    link: "/theories/silent-frequency",
    era: "DECRYPTED // 001"
  },
  {
    id: "theory-2",
    title: "Isreeal plan to take over the world",
    desc: "How the world has been pupperted since the beginning.",
    image: "/canaanites.jpg",
    link: "/theories/omitted-architecture",
    era: "DECRYPTED // 002"
  }
];