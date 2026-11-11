<script lang="ts">
  import { onMount } from 'svelte'
  import { checkApiHealth, getApiUrl } from '#lib/api/client'

  let { active = '' }: { active?: string } = $props()
  let status = $state<'checking' | 'online' | 'offline'>('checking')
  const apiUrl = getApiUrl()

  onMount(() => {
    let activePoll = true

    async function probe() {
      const ok = await checkApiHealth()
      if (activePoll) {
        status = ok ? 'online' : 'offline'
      }
    }

    probe()
    const interval = setInterval(probe, 10000)

    return () => {
      activePoll = false
      clearInterval(interval)
    }
  })
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

  <span
    class="status-pill"
    class:online={status === 'online'}
    class:offline={status === 'offline'}
    class:checking={status === 'checking'}
    title={`Target API: ${apiUrl}`}
  >
    <span class="status-dot"></span>
    {#if status === 'online'}
      API online
    {:else if status === 'offline'}
      API offline
    {:else}
      Memeriksa API…
    {/if}
  </span>
</header>

<style>
  .site-header { align-items: center; display: flex; justify-content: space-between; margin: 0 auto; max-width: 1180px; padding: 28px 32px; }
  .brand { align-items: center; color: var(--ink); display: flex; font-size: 1.25rem; font-weight: 800; gap: 10px; letter-spacing: -.04em; text-decoration: none; }
  .brand-mark { align-items: center; background: var(--accent); border-radius: 10px; color: white; display: flex; font-family: Georgia, serif; font-size: 1.35rem; height: 34px; justify-content: center; transform: rotate(-8deg); width: 34px; }
  .brand-dot { color: var(--accent); }
  nav { display: flex; gap: 8px; margin-left: 100px; }
  nav a { border-radius: 999px; color: var(--muted); font-size: .85rem; font-weight: 700; padding: 9px 16px; text-decoration: none; }
  nav a:hover, nav a.active { background: #fff; box-shadow: 0 4px 16px rgba(28, 37, 44, .06); color: var(--ink); }
  .status-pill { align-items: center; border-radius: 999px; display: flex; font-size: .72rem; font-weight: 700; gap: 7px; padding: 8px 12px; transition: background-color .2s, border-color .2s, color .2s; }
  .status-dot { border-radius: 50%; height: 7px; width: 7px; }

  .status-pill.online { background: rgba(221, 245, 232, .7); border: 1px solid #c5ebd5; color: #27734b; }
  .status-pill.online .status-dot { background: #37b56b; }

  .status-pill.offline { background: rgba(254, 235, 232, .8); border: 1px solid #f8c9c1; color: #a63a2a; }
  .status-pill.offline .status-dot { background: #e04f38; }

  .status-pill.checking { background: rgba(240, 242, 245, .8); border: 1px solid #dcdfe4; color: #616b77; }
  .status-pill.checking .status-dot { background: #9aa5b1; }

  @media (max-width: 600px) { .site-header { padding: 20px; } nav { margin-left: 0; } .status-pill { display: none; } }
</style>
