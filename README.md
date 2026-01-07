# Digital Knowledge Hub Portfolio

Premium bilingual (EN/AR) portfolio for a Knowledge Management & Digital Library Transformation leader.

## Setup

```bash
npm install
npm run dev
```

The site runs on `http://localhost:3000/en` (English) or `http://localhost:3000/ar` (Arabic).

## Content editing guide

All content lives in `/content` and is structured per language:

- `/content/en` for English
- `/content/ar` for Arabic

### Experience

Edit `content/<lang>/experience/experience.json`.

### Case studies

Add MDX files in `content/<lang>/case-studies/` with the required frontmatter fields:

```mdx
---
title: "..."
slug: "..."
year: "2024"
overview: "..."
role: "..."
problem: "..."
approach: "..."
standardsAndTools: ["..."]
outcomes: ["..."]
images: ["/images/case-studies/example.svg"]
links:
  - label: "..."
    url: "https://..."
---
```

### Publications

Edit `content/<lang>/publications/publications.json`.

### Workshops

Edit `content/<lang>/workshops/workshops.json`.

### Books

Add MDX files in `content/<lang>/books/` with this frontmatter:

```mdx
---
title: "..."
slug: "..."
year: "2021"
publisher: "..."
description: "..."
coverImage: "/images/books/example.svg"
access: "public"
fileRef: "books/files/example.pdf"
---
```

Place PDF files in the server-only folder `content/books/files/`.

## Book access control

- **Option A (default):** books are streamed from `/api/books/[slug]`.
- **Option B (gated):** set `BOOK_ACCESS_CODE` in your environment and mark a book as `access: "gated"`. Requests without the code will receive `403`.

## Environment variables

Create `.env.local`:

```
BOOK_ACCESS_CODE=optional-secret
```

## Deployment (Vercel)

- Ensure the `content` directory is included in your deployment.
- Set `BOOK_ACCESS_CODE` if you enable gated books.
- Run `npm run build` before deploying.
