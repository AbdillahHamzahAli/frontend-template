<script lang="ts">
  import { getApiErrorMessage } from '#lib/api/client'
  import { uploadFile } from '#lib/api/files'
  import * as Alert from '#lib/components/ui/alert'
  import { Button } from '#lib/components/ui/button'
  import * as Card from '#lib/components/ui/card'
  import type { StoredFile } from '#lib/types/file'
  import CircleCheck from '@lucide/svelte/icons/circle-check'
  import CloudUpload from '@lucide/svelte/icons/cloud-upload'

  let selected = $state<File | null>(null)
  let uploading = $state(false)
  let error = $state('')
  let uploaded = $state<StoredFile | null>(null)

  function choose(event: Event) {
    const input = event.currentTarget as HTMLInputElement
    selected = input.files?.[0] ?? null
    uploaded = null
    error = ''
  }

  async function submit() {
    if (!selected) return
    uploading = true
    error = ''
    try {
      uploaded = await uploadFile(selected)
    } catch (caught) {
      error = getApiErrorMessage(caught)
    } finally {
      uploading = false
    }
  }

  const formatSize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(2)} MB`
</script>

<svelte:head><title>Upload — myapp</title></svelte:head>

<section class="border-b pb-6">
  <h1 class="text-3xl font-semibold tracking-tight">Upload file</h1>
  <p class="text-muted-foreground">Upload langsung ke storage melalui presigned URL.</p>
</section>

<Card.Root class="mx-auto mt-8 max-w-xl">
  <Card.Header class="text-center">
    <Card.Title>Pilih file untuk diunggah</Card.Title>
    <Card.Description>PNG, JPEG, WebP, atau PDF · maksimal 10 MB</Card.Description>
  </Card.Header>
  <Card.Content class="grid gap-4">
    <label
      class="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center transition-colors hover:border-ring hover:bg-muted/50 has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
    >
      <CloudUpload class="size-8 text-muted-foreground" />
      <input class="sr-only" type="file" accept="image/png,image/jpeg,image/webp,application/pdf" onchange={choose} />
      <strong class="max-w-full truncate text-sm font-medium">{selected ? selected.name : 'Klik untuk memilih file'}</strong>
      <span class="text-xs text-muted-foreground">
        {selected ? `${formatSize(selected.size)} · ${selected.type}` : 'atau tarik file ke area ini'}
      </span>
    </label>

    {#if error}
      <Alert.Root variant="destructive">
        <Alert.Description>{error}</Alert.Description>
      </Alert.Root>
    {/if}

    {#if uploaded}
      <Alert.Root role="status">
        <CircleCheck class="text-emerald-600" />
        <Alert.Title>Upload berhasil.</Alert.Title>
        <Alert.Description class="truncate font-mono text-xs">{uploaded.key}</Alert.Description>
      </Alert.Root>
    {/if}

    <Button onclick={submit} disabled={!selected || uploading} class="w-full">
      {uploading ? 'Mengunggah…' : 'Mulai upload'}
    </Button>
  </Card.Content>
</Card.Root>
