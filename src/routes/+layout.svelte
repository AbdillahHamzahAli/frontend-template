<script lang="ts">
  import '../app.css'
  import { page } from '$app/state'

  let { children } = $props()

  const isHome = $derived(page.url.pathname === '/')
</script>

<svelte:head>
  <title>myapp — API companion</title>
  <meta name="description" content="Standalone frontend for the myapp API." />
</svelte:head>

{#if isHome}
  {@render children()}
{:else}
  <main class="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6">
    {@render children()}
  </main>
{/if}
