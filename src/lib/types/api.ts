export type ValidationDetail = {
  path: string
  message: string
}

export type ApiErrorBody = {
  error: string
  details?: ValidationDetail[]
}
