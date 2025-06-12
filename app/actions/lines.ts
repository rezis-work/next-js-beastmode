'use server'

import { db } from '@/db'
import { lines } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getCurrentUser } from '@/lib/dal'
import { z } from 'zod'

// Define Zod schema for issue validation
const LineSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),

  description: z.string().optional().nullable(),

  status: z.enum(['backlog', 'todo', 'in_progress', 'done'], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),

  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Please select a valid priority' }),
  }),
  userId: z.string().min(1, 'User ID is required'),
})

const UpdateLineSchema = LineSchema.partial()

export type LineData = z.infer<typeof LineSchema>

export type ActionResponse = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  error?: string
}

export const createLines = async (data: LineData) => {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return {
        success: false,
        message: 'User not found',
        error: 'arxar registrirebuli lol',
      }
    }

    const validationResult = LineSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Invalid data',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    const validatedData = validationResult.data

    const existingLine = await db
      .select()
      .from(lines)
      .where(eq(lines.title, validatedData.title))
      .limit(1)

    if (existingLine.length > 0) {
      return {
        success: false,
        message: 'Line already exists',
        error: 'Line with this title already exists',
      }
    }

    await db.insert(lines).values({
      title: validatedData.title,
      description: validatedData.description,
      status: validatedData.status,
      priority: validatedData.priority,
      userId: user.id,
    })

    return {
      success: true,
      message: 'Line created successfully',
    }
  } catch (error) {
    console.error('Error creating line:', error)
    return {
      success: false,
      message: 'Failed to create line',
      error: 'Failed to create line',
    }
  }
}

export const updateLines = async (id: number, data: Partial<LineData>) => {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return {
        success: false,
        message: 'User not found',
        error: 'arxar registrirebuli lol',
      }
    }

    const validationResult = UpdateLineSchema.safeParse(data)
    if (!validationResult.success) {
      return {
        success: false,
        message: 'Invalid data',
      }
    }

    const validatedData = validationResult.data
    const updateData: Record<string, unknown> = {}

    if (validatedData.title !== undefined) {
      updateData.title = validatedData.title
    }

    if (validatedData.description !== undefined) {
      updateData.description = validatedData.description
    }

    if (validatedData.status !== undefined) {
      updateData.status = validatedData.status
    }

    if (validatedData.priority !== undefined) {
      updateData.priority = validatedData.priority
    }

    await db.update(lines).set(updateData).where(eq(lines.id, id))

    return {
      success: true,
      message: 'Line updated successfully',
    }
  } catch (error) {
    console.error('Error updating line:', error)
    return {
      success: false,
      message: 'Failed to update line',
      error: 'Failed to update line',
    }
  }
}

export const deleteLine = async (id: number) => {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return {
        success: false,
        message: 'User not found',
        error: 'arxar registrirebuli lol',
      }
    }

    const line = await db.select().from(lines).where(eq(lines.id, id))
    if (line.length === 0) {
      return {
        success: false,
        message: 'Line not found',
      }
    }

    await db.delete(lines).where(eq(lines.id, id))

    return {
      success: true,
      message: 'Line deleted successfully',
    }
  } catch (error) {
    console.error('Error deleting line:', error)
    return {
      success: false,
      message: 'Failed to delete line',
      error: 'Failed to delete line',
    }
  }
}
