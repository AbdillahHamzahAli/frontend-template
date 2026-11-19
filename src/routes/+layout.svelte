<script lang="ts">
  import '../app.css'
  import { page } from '$app/state'
  import Header from '#lib/components/Header.svelte'

  let { children } = $props()

  const isHome = $derived(page.url.pathname === '/')
</script>

<svelte:head>
  <title>myapp — API companion</title>
  <meta name="description" content="Frontend standalone untuk myapp API." />
</svelte:head>

{#if isHome}
  {@render children()}
{:else}
  <Header />
  <main class="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-8">
    {@render children()}
  </main>
{/if}
