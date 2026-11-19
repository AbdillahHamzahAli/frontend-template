<script lang="ts">
  import * as Card from '#lib/components/ui/card'
  import type { Post } from '#lib/types/post'

  let { post }: { post: Post } = $props()

  const formatDate = (value: string) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(value))
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>{post.title}</Card.Title>
    <Card.Description>
      <time datetime={post.createdAt}>{formatDate(post.createdAt)}</time>
    </Card.Description>
  </Card.Header>
  <Card.Content>
    {#if post.body}
      <p class="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{post.body}</p>
    {:else}
      <p class="text-sm italic text-muted-foreground">Tidak ada isi untuk post ini.</p>
    {/if}
  </Card.Content>
</Card.Root>
