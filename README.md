# Frontend Template

![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?logo=svelte&logoColor=white)
![Svelte 5](https://img.shields.io/badge/Svelte_5-FF3E00?logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn-svelte](https://img.shields.io/badge/shadcn--svelte-171717?logo=shadcnui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

A standalone SvelteKit frontend for `myapp-api`. Browse posts and upload files (PNG, JPEG, WebP or PDF, up to 10 MB) straight from the browser. The template has no monorepo dependencies, and its API types live in `src/lib/types/`, so you can copy it into its own repo.

The UI follows the Geist-style design system described in [`DESIGN.md`](./DESIGN.md).

## Quick start

```bash
bun install
cp .env.example .env
bun run dev
```

The app runs at `http://localhost:5173`. It expects the backend at `http://localhost:3000`; change `PUBLIC_API_URL` in `.env` to point elsewhere.

## Scripts

| Script | Description |
|---|---|
| `bun run dev` | Start the Vite dev server |
| `bun run check` | Sync SvelteKit and type-check |
| `bun run build` | Build for production (`build/`) |
| `bun run preview` | Preview the production build |
| `bun run start` | Run the built server |

## Docker

```bash
docker build -t myapp-web .
docker run -p 3000:3000 -e PUBLIC_API_URL=http://localhost:3000 myapp-web
```

The browser calls the API directly, so `PUBLIC_API_URL` must be an address the user's browser can reach, not an internal Docker hostname. For the same reason, allow the frontend origin in the backend's `CORS_ORIGINS`, and allow `PUT` from it in your storage bucket's CORS so presigned uploads work.

The template ships without authentication. Add it before exposing the create-post or upload endpoints publicly.

## Project structure

```text
src/
├── lib/
│   ├── api/          Fetch wrapper, posts, presigned file upload
│   ├── components/   PostCard and shadcn-svelte UI components
│   └── types/        Local API types
└── routes/
    ├── +page.svelte  Landing page
    ├── posts/        Post list
    └── upload/       File upload
```
