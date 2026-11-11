import { PUBLIC_API_URL } from '$app/env/public'
import type { ApiErrorBody } from '#lib/types/api'

const API_URL = PUBLIC_API_URL.replace(/\/$/, '')

export class ApiRequestError extends Error {
  readonly status: number
  readonly requestId: string | null
  readonly details: ApiErrorBody['details']

  constructor(message: string, options: { status: number; requestId: string | null; details?: ApiErrorBody['details'] }) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = options.status
    this.requestId = options.requestId
    this.details = options.details
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      accept: 'application/json',
      ...(init.body ? { 'content-type': 'application/json' } : {}),
      ...init.headers,
    },
  })

  const requestId = response.headers.get('x-request-id')
  const body = await response.json().catch(() => null) as T | ApiErrorBody | null

  if (!response.ok) {
    const errorBody = body as ApiErrorBody | null
    throw new ApiRequestError(errorBody?.error ?? `Request gagal (${response.status})`, {
      status: response.status,
      requestId,
      details: errorBody?.details,
    })
  }

  return body as T
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof ApiRequestError) {
    const requestHint = error.requestId ? ` · ID: ${error.requestId}` : ''
    return `${formatErrorCode(error.message)}${requestHint}`
  }
  return 'Terjadi kesalahan. Coba lagi dalam beberapa saat.'
}

function formatErrorCode(code: string) {
  return code.replaceAll('_', ' ')
}
