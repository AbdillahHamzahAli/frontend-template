import { apiFetch } from './client'
import type { PresignResponse, StoredFile } from '#lib/types/file'

export async function uploadFile(file: File): Promise<StoredFile> {
  const presign = await apiFetch<PresignResponse>('/api/v1/files/presign', {
    method: 'POST',
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      size: file.size,
    }),
  })

  const upload = await fetch(presign.uploadUrl, {
    method: 'PUT',
    body: file,
    headers: { 'content-type': file.type },
  })

  if (!upload.ok) {
    throw new Error(`Upload storage gagal (${upload.status})`)
  }

  return apiFetch<StoredFile>('/api/v1/files/confirm', {
    method: 'POST',
    body: JSON.stringify({ key: presign.key }),
  })
}
