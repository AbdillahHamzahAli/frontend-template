import { apiFetch } from './client'
import type { CreatePostInput, Post } from '#lib/types/post'

export function getPosts(page = 1) {
  return apiFetch<Post[]>(`/api/v1/posts?page=${page}`)
}

export function createPost(input: CreatePostInput) {
  return apiFetch<Post>('/api/v1/posts', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}
