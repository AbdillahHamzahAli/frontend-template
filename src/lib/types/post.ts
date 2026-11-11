export type Post = {
  id: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
}

export type CreatePostInput = {
  title: string
  body?: string
}
