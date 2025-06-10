import { InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'

// Enums for issue status and priority
export const statusEnum = pgEnum('status', [
  'backlog',
  'todo',
  'in_progress',
  'done',
])
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high'])

// Issues table
export const lines = pgTable('lines', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: statusEnum('status').default('backlog').notNull(),
  priority: priorityEnum('priority').default('medium').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  userId: text('user_id').notNull(),
})

// Users table
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Relations between tables
export const linesRelations = relations(lines, ({ one }) => ({
  user: one(users, {
    fields: [lines.userId],
    references: [users.id],
  }),
}))

export const usersRelations = relations(users, ({ many }) => ({
  lines: many(lines),
}))

// Types
export type Line = InferSelectModel<typeof lines>
export type User = InferSelectModel<typeof users>

// Status and priority labels for display
export const LINE_STATUS = {
  backlog: { label: 'Backlog', value: 'backlog' },
  todo: { label: 'Todo', value: 'todo' },
  in_progress: { label: 'In Progress', value: 'in_progress' },
  done: { label: 'Done', value: 'done' },
}

export const LINE_PRIORITY = {
  low: { label: 'Low', value: 'low' },
  medium: { label: 'Medium', value: 'medium' },
  high: { label: 'High', value: 'high' },
}
