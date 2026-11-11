# Frontend Template

Frontend standalone berbasis SvelteKit (Svelte 5) + Bun untuk companion `myapp-api`.
Ini dirancang sebagai **starter/template independen**: tidak ada dependency monorepo,
tidak ada import package internal backend, dan tipe API didefinisikan secara lokal.

## Karakteristik Template

- **Akses API langsung:** Browser memanggil backend langsung via URL di `PUBLIC_API_URL`.
- **Tanpa shared types:** Kontrak request/response ditulis lokal di `src/lib/types/` agar mudah dicopy atau dipisah repo.
- **Docker-ready:** Memakai `@sveltejs/adapter-node` dengan container runtime Bun/Node.
- **Pengecekan API nyata:** Header memantau liveness backend via `/health` berdasarkan config environment.
- **Tanpa auth bawaan:** Endpoint mutasi (create post, presign upload) disiapkan untuk template. Tambahkan auth middleware/session saat masuk ke fase aplikasi riil.

## Mulai Cepat (Local Dev)

```bash
bun install
cp .env.example .env
bun run dev
```

Frontend berjalan di `http://localhost:5173`.
Pastikan backend aktif di `http://localhost:3000` (atau sesuaikan `PUBLIC_API_URL` di `.env`).

## Script

| Script | Fungsi |
|---|---|
| `bun run dev` | Jalankan Vite dev server |
| `bun run check` | Validasi SvelteKit sync dan typecheck Svelte |
| `bun run build` | Build standalone production (`build/`) |
| `bun run preview` | Preview build lokal via Vite |
| `bun run start` | Jalankan server hasil build (`node build/index.js` atau `bun run build/index.js`) |

## Menjalankan dengan Docker

```bash
# Build image
docker build -t myapp-web .

# Jalankan container
docker run -p 3000:3000 -e PUBLIC_API_URL=http://localhost:3000 myapp-web
```

> Catatan: Karena frontend memanggil API langsung dari browser pengguna, `PUBLIC_API_URL`
> harus merupakan alamat backend yang bisa dijangkau oleh browser (misal `https://api.domainmu.com`
> di server publik, bukan host internal Docker container).

## Pengaturan CORS (Production Note)

Karena arsitektur ini memanggil backend dan storage langsung dari browser:

1. **Backend CORS:** Set `CORS_ORIGINS` di backend agar mengizinkan origin web frontend (contoh: `https://app.domainmu.com`).
2. **S3/Storage CORS:** Izinkan method `PUT` dari origin frontend agar upload presigned URL berhasil.

## Struktur Project

```text
src/
├── env.ts             Definisi env vars SvelteKit ($app/env/public)
├── lib/
│   ├── api/
│   │   ├── client.ts  HTTP fetch wrapper, error normalizer, health probe
│   │   ├── posts.ts   Modul posts (list, create)
│   │   └── files.ts   Alur presigned S3 upload + confirm
│   ├── components/    Header (realtime health status), PostCard
│   └── types/         Tipe data lokal (post, file, api)
└── routes/
    ├── +layout.svelte Shell UI utama
    ├── +page.svelte   Landing page template
    ├── posts/         List posts + form create post
    └── upload/        Upload file (PNG/JPEG/WebP/PDF max 10MB)
```
