import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { lines, users } from '@/db/schema'
import { mockDelay } from './utils'

export const getCurrentUser = async () => {
  const session = await getSession()
  if (!session) {
    return null
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))

    return user[0] || null
  } catch (error) {
    console.error('Error while getting user with userid: ', error)
    return null
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (!user) {
      return null
    }

    return user
  } catch (error) {
    console.error('Error while getting user with email: ', error)
    return null
  }
}

export async function getLines() {
  try {
    const result = await db.query.lines.findMany({
      with: {
        user: true,
      },
      orderBy: (lines, { desc }) => [desc(lines.createdAt)],
    })

    return result
  } catch (error) {
    console.error('Error while getting lines: ', error)
    return []
  }
}

export const getLine = async (id: number) => {
  try {
    const result = await db.query.lines.findFirst({
      where: eq(lines.id, id),
      with: {
        user: true,
      },
    })

    if (!result) {
      return null
    }

    return result
  } catch (error) {
    console.error('Error while getting line with id: ', error)
    return null
  }
}
