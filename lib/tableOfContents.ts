import GithubSlugger from "github-slugger";

export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function extractTableOfContents(
  content: string
): TocItem[] {
  const slugger = new GithubSlugger();

  return content
    .split("\n")
    .map((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);

      if (!match) {
        return null;
      }

      const level = match[1].length;
      const text = match[2]
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/`(.*?)`/g, "$1")
        .trim();

      return {
        id: slugger.slug(text),
        text,
        level,
      };
    })
    .filter((item): item is TocItem => item !== null);
}