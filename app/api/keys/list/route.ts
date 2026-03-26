import fs from "fs";
import path from "path";
import matter from "gray-matter";

type KeyCard = {
  slug: string;
  title: string;
  desc: string;
  era?: string;
  image: string;
};

function getFallbackImage(slug: string, title?: string) {
  const bySlug: Record<string, string> = {
    "the-kabbalah": "/kabbalah-main.jpg",
    "defining-kabbalah": "/gnostic.jpg",
    "rabbinic-denominations": "/sefer.jpg",
    "keys-cabal-debate": "/zohar.jpg",
  };

  if (bySlug[slug]) return bySlug[slug];

  const byTitle: Record<string, string> = {
    kabbalah: "/kabbalah.jpg",
    zohar: "/zohar.jpg",
    rabbinic: "/sefer.jpg",
  };

  const t = (title || "").toLowerCase();
  for (const [needle, img] of Object.entries(byTitle)) {
    if (t.includes(needle)) return img;
  }

  return "/logo.png";
}

export async function GET() {
  const keysDir = path.join(process.cwd(), "app", "content", "keys");
  const files = fs
    .readdirSync(keysDir)
    .filter((f) => f.toLowerCase().endsWith(".mdx"));

  const cards: KeyCard[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/i, "");
    const filePath = path.join(keysDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);

    const title = (data?.title as string) || slug;
    const subtitle = (data?.subtitle as string) || "";
    const index = data?.index as unknown;
    const era =
      Array.isArray(index) && typeof index[0] === "string" ? (index[0] as string) : undefined;

    return {
      slug,
      title: String(title).toUpperCase(),
      desc: subtitle ? String(subtitle) : "Unlock this dossier.",
      era,
      image: getFallbackImage(slug, title),
    };
  });

  return Response.json({ keys: cards });
}

