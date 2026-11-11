<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import PostCard from '#lib/components/PostCard.svelte'
  import { createPost } from '#lib/api/posts'
  import { getApiErrorMessage } from '#lib/api/client'
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

<section class="page-heading">
  <div><div class="eyebrow">COLLECTION</div><h1>Posts</h1><p>Catatan dan ide yang tersimpan di myapp.</p></div>
  <span class="count">{data.posts.length} post</span>
</section>

<div class="content-grid">
  <section class="posts-list" aria-label="Daftar posts">
    {#if data.posts.length === 0}
      <div class="empty"><strong>Belum ada post.</strong><span>Buat catatan pertamamu di form sebelah.</span></div>
    {:else}
      {#each data.posts as post (post.id)}<PostCard {post} />{/each}
    {/if}
  </section>

  <aside class="composer">
    <div class="eyebrow">NEW ENTRY</div><h2>Tulis sesuatu</h2><p>Bagikan ide singkat atau cerita yang ingin kamu simpan.</p>
    <form onsubmit={(event) => { event.preventDefault(); submit() }}>
      <label>Judul <input bind:value={title} placeholder="Judul post" maxlength="200" required /></label>
      <label>Isi <textarea bind:value={body} placeholder="Mulai menulis..." maxlength="20000" rows="5"></textarea></label>
      {#if error}<div class="error" role="alert">{error}</div>{/if}
      <button disabled={submitting || !title.trim()}>{submitting ? 'Menyimpan…' : 'Simpan post'} <span>↗</span></button>
    </form>
  </aside>
</div>

<style>
  .page-heading { align-items: end; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; padding: 28px 0 30px; }
  .eyebrow { color: var(--accent); font-size: .67rem; font-weight: 800; letter-spacing: .15em; }
  h1 { font-family: Georgia, serif; font-size: 3.5rem; font-weight: 400; letter-spacing: -.06em; margin: 12px 0 5px; }
  .page-heading p, .composer p { color: var(--muted); margin: 0; }
  .count { color: var(--muted); font-size: .8rem; }
  .content-grid { align-items: start; display: grid; gap: 60px; grid-template-columns: minmax(0, 1fr) 320px; padding-top: 34px; }
  .posts-list { display: grid; gap: 14px; }
  .empty { border: 1px dashed #d8d0c8; border-radius: 16px; color: var(--muted); display: flex; flex-direction: column; gap: 8px; padding: 44px; text-align: center; }
  .empty strong { color: var(--ink); }
  .composer { background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 24px; position: sticky; top: 20px; }
  .composer h2 { font-family: Georgia, serif; font-size: 1.65rem; font-weight: 400; letter-spacing: -.04em; margin: 12px 0 7px; }
  form { display: grid; gap: 15px; margin-top: 25px; }
  label { color: var(--ink); display: grid; font-size: .76rem; font-weight: 800; gap: 7px; }
  input, textarea { background: #fbfaf8; border: 1px solid var(--line); border-radius: 7px; color: var(--ink); outline: none; padding: 11px 12px; resize: vertical; }
  input:focus, textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 3px #fce8e3; }
  button { background: var(--ink); border: 0; border-radius: 7px; color: white; font-size: .8rem; font-weight: 800; padding: 13px; }
  button:disabled { cursor: not-allowed; opacity: .45; }
  button span { color: #f8b09d; margin-left: 8px; }
  .error { background: #fff0ed; border-radius: 7px; color: #aa3c2c; font-size: .76rem; padding: 10px; }
  @media (max-width: 760px) { .content-grid { grid-template-columns: 1fr; gap: 36px; } .composer { position: static; } }
</style>
