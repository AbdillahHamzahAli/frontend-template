<script lang="ts">
  import { getApiErrorMessage } from '#lib/api/client'
  import { uploadFile } from '#lib/api/files'
  import * as Alert from '#lib/components/ui/alert'
  import { Button } from '#lib/components/ui/button'
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

<div class="mx-auto grid min-h-[calc(100svh-4rem)] max-w-xl content-center gap-4">
  <label
    class="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-hairline bg-canvas-elevated p-8 text-center transition-colors hover:border-faint has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
  >
    <CloudUpload class="size-8 text-mute" />
    <input class="sr-only" type="file" accept="image/png,image/jpeg,image/webp,application/pdf" onchange={choose} />
    <strong class="max-w-full truncate text-sm leading-5 font-medium tracking-[-0.28px] text-ink">{selected ? selected.name : 'Click to choose a file'}</strong>
    <span class="text-xs leading-4 text-mute">
      {selected ? `${formatSize(selected.size)} · ${selected.type}` : 'PNG, JPEG, WebP, or PDF · up to 10 MB'}
    </span>
  </label>

  {#if error}
    <Alert.Root variant="destructive">
      <Alert.Description>{error}</Alert.Description>
    </Alert.Root>
  {/if}

  {#if uploaded}
    <Alert.Root role="status">
      <CircleCheck class="text-link" />
      <Alert.Title>Upload complete.</Alert.Title>
      <Alert.Description class="truncate font-mono text-xs text-body">{uploaded.key}</Alert.Description>
    </Alert.Root>
  {/if}

  <Button onclick={submit} disabled={!selected || uploading} class="w-full">
    {uploading ? 'Uploading…' : 'Start upload'}
  </Button>
</div>
