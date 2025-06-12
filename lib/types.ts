import { Line } from '@/db/schema'

export type Status = 'backlog' | 'todo' | 'in_progress' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export type LineWithUser = Line & {
  user: {
    id: string
    email: string
  }
}
