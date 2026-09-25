import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

export type Heading = {
  id: string;
  text: string;
  level: number;
};

export type Post = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  readingTime: string;
  featured?: boolean;
  content: string;
  image?: string;
  thumbnailImage?: string;
  headings: Heading[];
};

const postsDirectory = path.join(
  process.cwd(),
  "content/posts"
);

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

  return text.length > 180
    ? `${text.slice(0, 180).trim()}…`
    : text;
}

function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();

  return content
    .split("\n")
    .map((line) => {
      const match = line.match(/^(#{1,2})\s+(.+)$/);

      if (!match) {
        return null;
      }

      const level = match[1].length;

      const text = match[2]
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/`(.*?)`/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .trim();

      return {
        id: slugger.slug(text),
        text,
        level,
      };
    })
    .filter(
      (heading): heading is Heading =>
        heading !== null
    );
}

export function getPosts(): Post[] {
  const files = fs
    .readdirSync(postsDirectory)
    .filter(
      (file) =>
        file.endsWith(".md") ||
        file.endsWith(".mdx")
    );

  return files
    .map((filename) => {
      const source = fs.readFileSync(
        path.join(postsDirectory, filename),
        "utf8"
      );

      const { data, content } = matter(source);

      const slug = filename.replace(
        /\.(md|mdx)$/,
        ""
      );

      return {
        slug,

        title: data.title ?? slug,

        subtitle: data.subtitle,

        date: data.date
          ? new Date(data.date)
              .toISOString()
              .slice(0, 10)
          : slug.slice(0, 10),

        category: data.category ?? "Travel",

        tags: Array.isArray(data.tags)
          ? data.tags
          : [],

        excerpt:
          data.excerpt ??
          createExcerpt(content),

        readingTime:
          calculateReadingTime(content),

        featured:
          data.featured ?? false,

        content,

        image:
          data.image ??
          data.coverImage ??
          data["cover-img"],

        thumbnailImage:
          data.thumbnailImage ??
          data["thumbnail-img"] ??
          data.coverImage ??
          data["cover-img"],

        headings:
          extractHeadings(content),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );
}

export const posts = getPosts();

export function getPost(slug: string) {
  return posts.find(
    (post) => post.slug === slug
  );
}