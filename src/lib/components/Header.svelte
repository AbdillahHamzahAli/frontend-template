<script lang="ts">
  import { onMount } from 'svelte'
  import { page } from '$app/state'
  import { checkApiHealth, getApiUrl } from '#lib/api/client'
  import { Badge } from '#lib/components/ui/badge'
  import { Button } from '#lib/components/ui/button'
  import { cn } from '#lib/utils'

  let status = $state<'checking' | 'online' | 'offline'>('checking')
  const apiUrl = getApiUrl()

  const links = [
    { href: '/posts', label: 'Posts' },
    { href: '/upload', label: 'Upload' },
  ]

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

<header class="border-b">
  <div class="mx-auto flex h-14 w-full max-w-5xl items-center gap-4 px-4 sm:px-8">
    <a class="flex items-center gap-2 font-semibold tracking-tight" href="/" aria-label="Myapp home">
      <span class="flex size-7 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground">m</span>
      myapp
    </a>

    <nav class="flex gap-1" aria-label="Navigasi utama">
      {#each links as link (link.href)}
        {@const active = page.url.pathname.startsWith(link.href)}
        <Button
          href={link.href}
          variant="ghost"
          size="sm"
          aria-current={active ? 'page' : undefined}
          class={cn(active ? 'bg-muted text-foreground' : 'text-muted-foreground')}
        >
          {link.label}
        </Button>
      {/each}
    </nav>

    <Badge variant="outline" class="ml-auto hidden gap-1.5 sm:inline-flex" title={`Target API: ${apiUrl}`}>
      <span
        class={cn(
          'size-1.5 rounded-full',
          status === 'online' && 'bg-emerald-500',
          status === 'offline' && 'bg-destructive',
          status === 'checking' && 'bg-muted-foreground',
        )}
      ></span>
      {#if status === 'online'}
        API online
      {:else if status === 'offline'}
        API offline
      {:else}
        Memeriksa API…
      {/if}
    </Badge>
  </div>
</header>
