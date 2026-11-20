<script lang="ts">
  import * as Card from '#lib/components/ui/card'
  import type { Post } from '#lib/types/post'

  let { post }: { post: Post } = $props()

  const formatDate = (value: string) => new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value))
</script>

<Card.Root>
  <Card.Header>
    <Card.Description class="text-eyebrow text-mute">
      <time datetime={post.createdAt}>{formatDate(post.createdAt)}</time>
    </Card.Description>
    <Card.Title>{post.title}</Card.Title>
  </Card.Header>
  <Card.Content>
    {#if post.body}
      <p class="text-sm leading-5 whitespace-pre-line text-body">{post.body}</p>
    {:else}
      <p class="text-sm leading-5 text-faint">This post has no content.</p>
    {/if}
  </Card.Content>
</Card.Root>
