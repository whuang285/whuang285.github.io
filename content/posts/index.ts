import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readingTime: string;
  featured?: boolean;
  content: string;
  image?: string;
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
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*`]/g, "")
    .replace(/\n+/g, " ")
    .trim();

  return text.length > 180
    ? `${text.slice(0, 180).trim()}…`
    : text;
}

export function getAllPosts(): Post[] {
  const files = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"));

  return files
    .map((filename) => {
      const source = fs.readFileSync(
        path.join(postsDirectory, filename),
        "utf8"
      );

      const { data, content } = matter(source);

      const slug = filename.replace(/\.md$/, "");

      return {
        slug,
        title: data.title ?? slug,
        date: data.date
          ? new Date(data.date).toISOString().slice(0, 10)
          : slug.slice(0, 10),
        category: data.category ?? "Travel",
        excerpt: data.excerpt ?? createExcerpt(content),
        readingTime: calculateReadingTime(content),
        featured: data.featured ?? false,
        image: data.image,
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );
}

export const posts = getAllPosts();

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}