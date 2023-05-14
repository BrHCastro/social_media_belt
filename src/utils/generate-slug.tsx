export function generateSlug(str: string): string {
  const slug = str
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/-{2,}/g, '-')
  return slug
}
