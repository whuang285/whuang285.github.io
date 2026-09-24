# Wendy Huang — Personal Site

A modern rewrite of `whuang285.github.io`. The original Jekyll site has been replaced with a Next.js static site while preserving the existing travel posts as source content.

## Stack

- Next.js + TypeScript
- Static export for GitHub Pages
- `gray-matter` for post metadata
- `markdown-it` for rendering existing post content
- Original post images/assets retained under `public/assets`

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The static site is generated in `out/`.

## GitHub Pages

This repository is already a `username.github.io` repository, so no `basePath` is required. Publish the contents of `out/` using GitHub Pages, or add a GitHub Actions workflow to automate the build.

## Content

The six original posts are in `content/posts/`. Their Markdown source is intentionally preserved as the content source so the migration does not rewrite or lose the original wording. The presentation layer is completely independent of Jekyll.
