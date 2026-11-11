<script lang="ts">
  let { active = '' }: { active?: string } = $props()
</script>

<header class="site-header">
  <a class="brand" href="/" aria-label="Myapp home">
    <span class="brand-mark">m</span>
    <span>myapp<span class="brand-dot">.</span></span>
  </a>

  <nav aria-label="Navigasi utama">
    <a class:active={active === 'posts'} href="/posts">Posts</a>
    <a class:active={active === 'upload'} href="/upload">Upload</a>
  </nav>

  <span class="status-pill"><span class="status-dot"></span> API online</span>
</header>

<style>
  .site-header { align-items: center; display: flex; justify-content: space-between; margin: 0 auto; max-width: 1180px; padding: 28px 32px; }
  .brand { align-items: center; color: var(--ink); display: flex; font-size: 1.25rem; font-weight: 800; gap: 10px; letter-spacing: -.04em; text-decoration: none; }
  .brand-mark { align-items: center; background: var(--accent); border-radius: 10px; color: white; display: flex; font-family: Georgia, serif; font-size: 1.35rem; height: 34px; justify-content: center; transform: rotate(-8deg); width: 34px; }
  .brand-dot { color: var(--accent); }
  nav { display: flex; gap: 8px; margin-left: 100px; }
  nav a { border-radius: 999px; color: var(--muted); font-size: .85rem; font-weight: 700; padding: 9px 16px; text-decoration: none; }
  nav a:hover, nav a.active { background: #fff; box-shadow: 0 4px 16px rgba(28, 37, 44, .06); color: var(--ink); }
  .status-pill { align-items: center; background: rgba(221, 245, 232, .7); border: 1px solid #c5ebd5; border-radius: 999px; color: #27734b; display: flex; font-size: .72rem; font-weight: 700; gap: 7px; padding: 8px 12px; }
  .status-dot { background: #37b56b; border-radius: 50%; height: 7px; width: 7px; }
  @media (max-width: 600px) { .site-header { padding: 20px; } nav { margin-left: 0; } .status-pill { display: none; } }
</style>
