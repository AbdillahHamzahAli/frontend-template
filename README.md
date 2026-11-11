# myapp-web

Frontend standalone berbasis SvelteKit untuk `myapp-api`. Project ini sengaja
tidak mengimpor tipe atau package dari backend; kontrak HTTP dan tipe lokal ada
di `src/lib/api` serta `src/lib/types`.

## Mulai cepat

```bash
bun install
cp .env.example .env
bun run dev
```

Backend harus berjalan di `http://localhost:3000`. URL tersebut dapat diubah
melalui `PUBLIC_API_URL`.

## Script

| Script | Fungsi |
|---|---|
| `bun run dev` | Jalankan Vite development server |
| `bun run check` | Validasi Svelte dan TypeScript |
| `bun run build` | Build production SvelteKit |
| `bun run preview` | Preview hasil build |

## Struktur

```text
src/lib/api/       API client dan modul request
src/lib/types/     tipe lokal untuk response dan input API
src/lib/components/komponen UI bersama
src/routes/        halaman home, posts, dan upload
```

## Kontrak backend yang digunakan

- `GET /api/v1/posts?page=1`
- `POST /api/v1/posts`
- `POST /api/v1/files/presign`
- `POST /api/v1/files/confirm`

Upload file memakai presigned URL: frontend meminta URL ke backend, mengunggah
langsung ke storage, lalu mengonfirmasi key ke backend.
