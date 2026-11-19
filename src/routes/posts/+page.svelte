<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import PostCard from '#lib/components/PostCard.svelte'
  import { createPost } from '#lib/api/posts'
  import { getApiErrorMessage } from '#lib/api/client'
  import * as Alert from '#lib/components/ui/alert'
  import { Badge } from '#lib/components/ui/badge'
  import { Button } from '#lib/components/ui/button'
  import * as Card from '#lib/components/ui/card'
  import { Input } from '#lib/components/ui/input'
  import { Label } from '#lib/components/ui/label'
  import { Textarea } from '#lib/components/ui/textarea'
  import type { Post } from '#lib/types/post'

  let { data }: { data: { posts: Post[] } } = $props()
  let title = $state('')
  let body = $state('')
  let submitting = $state(false)
  let error = $state('')

  async function submit() {
    if (!title.trim()) return
    submitting = true
    error = ''
    try {
      await createPost({ title: title.trim(), body: body.trim() || undefined })
      title = ''
      body = ''
      await invalidateAll()
    } catch (caught) {
      error = getApiErrorMessage(caught)
    } finally {
      submitting = false
    }
  }
</script>

<svelte:head><title>Posts — myapp</title></svelte:head>

<section class="flex items-end justify-between gap-4 border-b pb-6">
  <div>
    <h1 class="text-3xl font-semibold tracking-tight">Posts</h1>
    <p class="text-muted-foreground">Catatan dan ide yang tersimpan di myapp.</p>
  </div>
  <Badge variant="secondary">{data.posts.length} post</Badge>
</section>

<div class="grid items-start gap-8 pt-6 md:grid-cols-[minmax(0,1fr)_320px]">
  <section class="grid gap-3" aria-label="Daftar posts">
    {#if data.posts.length === 0}
      <Card.Root class="border-dashed text-center">
        <Card.Header>
          <Card.Title>Belum ada post.</Card.Title>
          <Card.Description>Buat catatan pertamamu lewat form di samping.</Card.Description>
        </Card.Header>
      </Card.Root>
    {:else}
      {#each data.posts as post (post.id)}<PostCard {post} />{/each}
    {/if}
  </section>

  <Card.Root class="md:sticky md:top-6">
    <Card.Header>
      <Card.Title>Tulis sesuatu</Card.Title>
      <Card.Description>Bagikan ide singkat atau cerita yang ingin kamu simpan.</Card.Description>
    </Card.Header>
    <Card.Content>
      <form class="grid gap-4" onsubmit={(event) => { event.preventDefault(); submit() }}>
        <div class="grid gap-2">
          <Label for="post-title">Judul</Label>
          <Input id="post-title" bind:value={title} placeholder="Judul post" maxlength={200} required />
        </div>
        <div class="grid gap-2">
          <Label for="post-body">Isi</Label>
          <Textarea id="post-body" bind:value={body} placeholder="Mulai menulis..." maxlength={20000} rows={5} />
        </div>
        {#if error}
          <Alert.Root variant="destructive">
            <Alert.Description>{error}</Alert.Description>
          </Alert.Root>
        {/if}
        <Button type="submit" disabled={submitting || !title.trim()}>
          {submitting ? 'Menyimpan…' : 'Simpan post'}
        </Button>
      </form>
    </Card.Content>
  </Card.Root>
</div>
