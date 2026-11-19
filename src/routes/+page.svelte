<script lang="ts">
  import { Button } from '#lib/components/ui/button'
  import * as Card from '#lib/components/ui/card'
  import ArrowRight from '@lucide/svelte/icons/arrow-right'
  import Newspaper from '@lucide/svelte/icons/newspaper'
  import Upload from '@lucide/svelte/icons/upload'
</script>

<svelte:head><title>myapp — selamat datang</title></svelte:head>

<main class="flex min-h-svh items-center justify-center bg-muted/40 px-4">
  <Card.Root class="w-full max-w-md">
    <Card.Header class="text-center">
      <div class="mx-auto mb-2 flex size-10 items-center justify-center rounded-lg bg-primary text-lg font-semibold text-primary-foreground">
        m
      </div>
      <Card.Title class="text-2xl">Selamat datang di myapp</Card.Title>
      <Card.Description>
        Frontend SvelteKit yang ringan untuk menjelajah posts dan mengunggah file ke myapp API.
      </Card.Description>
    </Card.Header>
    <Card.Content class="grid gap-2 sm:grid-cols-2">
      <Button href="/posts" size="lg" class="w-full">
        <Newspaper data-icon="inline-start" />
        Lihat posts
        <ArrowRight data-icon="inline-end" />
      </Button>
      <Button href="/upload" size="lg" variant="outline" class="w-full">
        <Upload data-icon="inline-start" />
        Upload file
      </Button>
    </Card.Content>
  </Card.Root>
</main>
