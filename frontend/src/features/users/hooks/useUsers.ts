import { useQuery } from '@tanstack/react-query'
import { api } from '../../../api/client'

type User = {
  id: number
  name: string
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => api<User[]>('/users'),
  })
}