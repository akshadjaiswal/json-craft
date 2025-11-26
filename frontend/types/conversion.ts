export interface Conversion {
  id: string
  slug: string
  json_input: string
  ts_output: string
  zod_output: string
  prisma_output: string
  created_at: string
}

export interface CreateConversionRequest {
  json_input: string
  ts_output: string
  zod_output: string
  prisma_output: string
}

export interface CreateConversionResponse {
  slug: string
  url: string
}
