export async function api<T>(url: string): Promise<T> {
  const res = await fetch(`http://localhost:3000${url}`)

  if (!res.ok) {
    throw new Error('API error')
  }

  return res.json()
}