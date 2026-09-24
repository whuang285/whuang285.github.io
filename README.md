# Wendy Huang — Personal Site

A complete redesign of the personal site, replacing the old Jekyll presentation with a Next.js static site suitable for GitHub Pages.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The static output is generated in `out/`.

## Blog migration

The old Jekyll `_posts` directory is intentionally represented by placeholders for now. Replace the sample objects in `content/posts/index.ts` with the original post data. The article renderer is already separated from the content, so migrating the archive does not require redesigning the UI.
