# Personal Website

A minimal personal website and blog built with Next.js and MDX. Posts are just `.mdx` files — drop one in a folder and it appears on the site automatically, with a table of contents and custom components included.

## Stack

- **Next.js** (App Router, static export)
- **MDX** — write posts in Markdown with embedded React components
- **Tailwind CSS** + `@tailwindcss/typography`

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a Blog Post

1. Create `app/markdown/blog-posts/my-post.mdx` with this frontmatter:

```mdx
---
slug: "my-post"
title: "My Post Title"
date: "2026-06-02"
---

Your content here...
```

2. That's it. The post appears on the homepage and gets its own page at `/blog/my-post`.

The `slug` drives the URL, `title` and `date` appear in the post list and header.

## MDX Features

Because posts are MDX, you can mix standard Markdown with React components freely.

**Any React component** — import and use inline:

```mdx
import MyChart from '@/app/ui/MyChart';

Here is the data visualized: <MyChart data={...} />
```

The table of contents on each post page is generated automatically from the headings in your MDX file — no extra configuration needed.
