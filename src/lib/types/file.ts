export type PresignResponse = {
  key: string
  uploadUrl: string
}

export type StoredFile = {
  id: string
  key: string
  contentType: string
  size: number
  createdAt: string
  url: string
}
