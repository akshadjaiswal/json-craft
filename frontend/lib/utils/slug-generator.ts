import { nanoid } from 'nanoid'

export function generateSlug(length: number = 8): string {
  return nanoid(length)
}

export function isValidSlug(slug: string): boolean {
  // nanoid generates URL-safe strings with characters: A-Za-z0-9_-
  return /^[A-Za-z0-9_-]+$/.test(slug)
}
