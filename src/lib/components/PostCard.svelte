<script lang="ts">
  import type { Post } from '#lib/types/post'

  let { post }: { post: Post } = $props()

  const formatDate = (value: string) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(value))
</script>

<article class="post-card">
  <div class="post-meta"><span class="post-number">POST</span><time datetime={post.createdAt}>{formatDate(post.createdAt)}</time></div>
  <h2>{post.title}</h2>
  {#if post.body}
    <p>{post.body}</p>
  {:else}
    <p class="empty-body">Tidak ada isi untuk post ini.</p>
  {/if}
</article>

<style>
  .post-card { background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 24px; transition: border-color .2s, transform .2s, box-shadow .2s; }
  .post-card:hover { border-color: #d8c8b7; box-shadow: 0 12px 32px rgba(71, 52, 35, .07); transform: translateY(-2px); }
  .post-meta { align-items: center; color: var(--muted); display: flex; font-size: .72rem; justify-content: space-between; letter-spacing: .08em; text-transform: uppercase; }
  .post-number { color: var(--accent); font-weight: 800; }
  h2 { font-family: Georgia, serif; font-size: 1.35rem; letter-spacing: -.03em; margin: 18px 0 10px; }
  p { color: var(--muted); line-height: 1.65; margin: 0; }
  .empty-body { font-style: italic; }
</style>
