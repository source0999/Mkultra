import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const currentId = url.searchParams.get("currentId") || "";

  const keysDir = path.join(process.cwd(), "app", "content", "keys");

  const files = fs
    .readdirSync(keysDir)
    .filter((f) => f.toLowerCase().endsWith(".mdx"))
    // Natural sort helps keep "h-02", "h-03", ... in the expected order if used.
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));

  const currentFile = `${currentId}.mdx`;
  const currentIndex = files.indexOf(currentFile);
  const nextFile = files[currentIndex + 1];

  if (!nextFile) {
    return Response.json({ done: true });
  }

  const nextId = nextFile.replace(/\.mdx$/i, "");
  const filePath = path.join(keysDir, nextFile);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data: frontmatter, content } = matter(fileContent);
  const mdxSource = await serialize(content);

  return Response.json({
    done: false,
    next: {
      id: nextId,
      frontmatter,
      mdxSource,
      rawContent: content,
    },
  });
}

