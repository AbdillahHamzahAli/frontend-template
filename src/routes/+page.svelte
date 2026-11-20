<script lang="ts">
  import { Button } from '#lib/components/ui/button'
  import ArrowRight from '@lucide/svelte/icons/arrow-right'
</script>

<svelte:head><title>myapp — welcome</title></svelte:head>

<main class="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-canvas px-4 py-24 sm:px-6">
  <!-- Mesh gradient: the only decorative element in the system (DESIGN.md → hero-band). -->
  <div aria-hidden="true" class="mesh pointer-events-none absolute inset-0 -z-10"></div>

  <section class="mx-auto flex max-w-2xl flex-col items-center text-center">
    <h1 class="mt-4 text-[32px] leading-10 font-semibold tracking-[-1.28px] text-ink sm:text-display-xl">
      Welcome to myapp
    </h1>
    <p class="mt-6 max-w-lg text-base leading-6 text-body">
      A lightweight SvelteKit frontend for browsing posts and uploading files to the myapp API.
    </p>

    <div class="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
      <Button href="/posts" class="h-11 rounded-full px-3.5 text-base">
        View posts
        <ArrowRight data-icon="inline-end" />
      </Button>
      <Button href="/upload" variant="outline" class="h-11 rounded-full bg-canvas-elevated px-3.5 text-base">
        Upload file
      </Button>
    </div>
  </section>
</main>

<style>
  .mesh {
    background:
      radial-gradient(40% 45% at 22% 30%, rgb(80 227 194 / 0.35), transparent 70%),
      radial-gradient(38% 42% at 40% 18%, rgb(0 112 243 / 0.3), transparent 70%),
      radial-gradient(40% 45% at 62% 26%, rgb(121 40 202 / 0.28), transparent 70%),
      radial-gradient(36% 40% at 78% 40%, rgb(235 54 127 / 0.26), transparent 70%),
      radial-gradient(40% 40% at 60% 62%, rgb(249 203 40 / 0.24), transparent 70%);
    filter: blur(40px);
    mask-image: radial-gradient(70% 60% at 50% 40%, #000 40%, transparent 100%);
  }
</style>
