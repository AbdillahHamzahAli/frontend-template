<script lang="ts">
  import Header from '#lib/components/Header.svelte'
</script>

<svelte:head>
  <title>myapp — API companion</title>
  <meta name="description" content="Frontend standalone untuk myapp API." />
</svelte:head>

<Header />
<main><slot /></main>

<style>
  :global(*) { box-sizing: border-box; }
  :global(:root) { --accent: #e85f43; --ink: #253038; --line: #e9e2db; --muted: #7d827f; --paper: #f7f4ef; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: var(--ink); }
  :global(body) { background: var(--paper); margin: 0; min-width: 320px; }
  :global(button), :global(input), :global(textarea) { font: inherit; }
  :global(button) { cursor: pointer; }
  main { margin: 0 auto; max-width: 1180px; padding: 34px 32px 80px; }
  @media (max-width: 600px) { main { padding: 24px 20px 56px; } }
</style>
