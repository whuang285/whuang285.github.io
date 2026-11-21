# Wendy Huang — Personal Site

A personal website and travel-writing archive built with Next.js, React, TypeScript, and MDX. The site is configured for static export and GitHub Pages.

## Requirements

- Node.js 20 or later
- npm

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks and production build

```bash
npm run typecheck
npm run build
```

Next.js writes the static site to `out/` because `output: "export"` is enabled in `next.config.ts`.

## Project structure

```text
app/                 App Router pages and layouts
components/          Shared React and MDX components
content/posts/       Published Markdown and MDX articles
content/drafts/      Unpublished writing and outlines
public/assets/img/   Article photography and static images
styles/              Global and article-specific styles
```

## Writing a post

Add a `.md` or `.mdx` file to `content/posts/` with frontmatter containing at least:

```yaml
---
permalink: my-post-slug
title: My post title
date: 2026-11-20
category: Travel
---
```

Optional frontmatter includes `subtitle`, `excerpt`, `tags`, `featured`, `style`, `coverImage`, `cover-img`, `thumbnailImage`, and `thumbnail-img`.

Supported post styles are `article`, `travel-editorial`, `scrapbook`, `switzerland-guide`, and `dashboard`. Keep post-specific styling scoped to its wrapper class so it does not affect other articles.

Place unpublished drafts in `content/drafts/`; only files in `content/posts/` are included in the public archive and static routes.
