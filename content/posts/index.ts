import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

export type Heading = {
  id: string;
  text: string;
  level: number;
};

export type PostStyle =
  | "article"
  | "travel-editorial"
  | "scrapbook"
  | "switzerland-guide"
  | "dashboard";

export type Post = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  category: string;
  excerpt: string;
  readingTime: string;
  featured?: boolean;
  content: string;
  headings: Heading[];
  style: PostStyle;
};

const postsDirectory = path.join(process.cwd(), "content/posts");

function calculateReadingTime(content: string) {
  const words = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function createExcerpt(content: string) {
  const text = content
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*`]/g, "")
    .replace(/\n+/g, " ")
    .trim();

  return text.length > 180 ? `${text.slice(0, 180).trim()}…` : text;
}

function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Array<Heading & { position: number }> = [];

  // Styled scrapbook and guide posts use explicit section IDs with HTML headings.
  for (const match of content.matchAll(
    /<section\b([^>]*)>([\s\S]*?)<\/section>/gi
  )) {
    const attributes = match[1];
    const sectionId = attributes.match(/\bid=["']([^"']+)["']/i)?.[1];
    const headingMarkup = match[2].match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i)?.[1];

    if (!sectionId || !headingMarkup || sectionId === "intro") {
      continue;
    }

    const text = headingMarkup.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (text) {
      headings.push({ id: sectionId, text, level: 2, position: match.index ?? 0 });
    }
  }

  // Markdown headings use GitHub-style IDs, matching the rendered MDX headings.
  for (const match of content.matchAll(/^(#{1,3})\s+(.+)$/gm)) {
    const level = match[1].length;
    const text = match[2]
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/`(.*?)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .trim();

    headings.push({
      id: slugger.slug(text),
      text,
      level,
      position: match.index ?? 0,
    });
  }

  return headings
    .sort((a, b) => a.position - b.position)
    .map(({ position: _position, ...heading }) => heading);
}

export function getPosts(): Post[] {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  return files
    .map((filename) => {
      const source = fs.readFileSync(
        path.join(postsDirectory, filename),
        "utf8"
      );

      const { data, content } = matter(source);

      const slug = data.permalink;
      if (typeof slug !== "string" || !slug.trim()) {
        throw new Error(`Missing permalink in ${filename}`);
      }

      const parsedDate = new Date(data.date ?? filename.slice(0, 10));
      if (Number.isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid or missing date in ${filename}`);
      }

      return {
        slug,

        title: data.title ?? slug,

        subtitle: data.subtitle,

        date: parsedDate.toISOString().slice(0, 10),

        category: data.category ?? "Travel",

        excerpt:
          typeof data.excerpt === "string" && data.excerpt.trim()
            ? data.excerpt.trim()
            : createExcerpt(content),

        readingTime: calculateReadingTime(content),

        featured: data.featured ?? false,

        content,

        headings: extractHeadings(content),

        style:
          data.style === "dashboard" ||
          data.style === "switzerland-guide" ||
          data.style === "scrapbook" ||
          data.style === "travel-editorial"
            ? data.style
            : "article",
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const posts = getPosts();

const duplicateSlugs = posts
  .map((post) => post.slug)
  .filter((slug, index, all) => all.indexOf(slug) !== index);

if (duplicateSlugs.length > 0) {
  throw new Error(
    `Duplicate post permalink(s): ${[...new Set(duplicateSlugs)].join(", ")}`
  );
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
