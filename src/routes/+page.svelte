<svelte:head><title>myapp — ruang kerja sederhana</title></svelte:head>

<section class="hero">
  <div class="eyebrow">FRONTEND STANDALONE · TERHUBUNG KE MYAPP API</div>
  <h1>Tempat kecil untuk<br /><em>ide-ide besar.</em></h1>
  <p class="intro">Sebuah frontend SvelteKit yang ringan untuk menjelajah posts dan mengirim file. Terpisah dari backend, siap dikembangkan sesuai kebutuhanmu.</p>
  <div class="actions">
    <a class="button primary" href="/posts">Lihat posts <span>→</span></a>
    <a class="button secondary" href="/upload">Upload file</a>
  </div>
</section>

<section class="feature-grid" aria-label="Fitur">
  <div><span class="feature-icon">✦</span><h2>API-first</h2><p>Semua data datang dari endpoint REST backend yang sudah ada.</p></div>
  <div><span class="feature-icon green">↗</span><h2>Standalone</h2><p>Tipe lokal dan API client terisolasi. Tidak perlu monorepo.</p></div>
  <div><span class="feature-icon blue">◌</span><h2>Siap tumbuh</h2><p>Struktur folder rapi untuk menambahkan halaman dan modul baru.</p></div>
</section>

<style>
  .hero { padding: 76px 0 94px; max-width: 680px; }
  .eyebrow { color: var(--accent); font-size: .68rem; font-weight: 800; letter-spacing: .16em; }
  h1 { font-family: Georgia, serif; font-size: clamp(3.2rem, 8vw, 5.8rem); font-weight: 400; letter-spacing: -.075em; line-height: .98; margin: 24px 0; }
  h1 em { color: var(--accent); font-style: italic; }
  .intro { color: var(--muted); font-size: 1.05rem; line-height: 1.75; max-width: 560px; }
  .actions { display: flex; gap: 12px; margin-top: 34px; }
  .button { border-radius: 8px; font-size: .85rem; font-weight: 800; padding: 13px 18px; text-decoration: none; }
  .button.primary { background: var(--ink); color: white; }
  .button.primary span { color: #f8b09d; font-size: 1.1rem; margin-left: 10px; }
  .button.secondary { border: 1px solid #d8d0c8; color: var(--ink); }
  .button:hover { transform: translateY(-1px); }
  .feature-grid { border-top: 1px solid var(--line); display: grid; gap: 38px; grid-template-columns: repeat(3, 1fr); padding-top: 30px; }
  .feature-icon { align-items: center; background: #fff0ec; border-radius: 9px; color: var(--accent); display: inline-flex; font-size: 1.1rem; height: 34px; justify-content: center; width: 34px; }
  .feature-icon.green { background: #e9f6ed; color: #42a66a; }
  .feature-icon.blue { background: #e9f1f8; color: #4c90bb; }
  h2 { font-size: .92rem; margin: 17px 0 7px; }
  .feature-grid p { color: var(--muted); font-size: .85rem; line-height: 1.65; margin: 0; max-width: 250px; }
  @media (max-width: 650px) { .hero { padding: 48px 0 68px; } .feature-grid { grid-template-columns: 1fr; gap: 24px; } }
</style>
