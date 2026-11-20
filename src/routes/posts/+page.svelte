<script lang="ts">
  import PostCard from '#lib/components/PostCard.svelte'
  import * as Card from '#lib/components/ui/card'
  import type { Post } from '#lib/types/post'

  let { data }: { data: { posts: Post[] } } = $props()
</script>

<svelte:head><title>Posts — myapp</title></svelte:head>

<section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label="Posts">
  {#if data.posts.length === 0}
    <Card.Root class="text-center md:col-span-2 lg:col-span-3">
      <Card.Header>
        <Card.Title>No posts yet.</Card.Title>
      </Card.Header>
    </Card.Root>
  {:else}
    {#each data.posts as post (post.id)}<PostCard {post} />{/each}
  {/if}
</section>
