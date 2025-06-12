'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/ui/Button'
import { Trash2Icon } from 'lucide-react'
import toast from 'react-hot-toast'
import { deleteLine } from '@/app/actions/lines'

interface DeleteLineButtonProps {
  id: number
}

export default function DeleteLineButton({ id }: DeleteLineButtonProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const result = await deleteLine(id)

        if (!result.success) {
          throw new Error(result.error || 'Failed to delete line')
        }

        toast.success('Line deleted successfully')
        router.push('/dashboard')
        router.refresh()
      } catch (error) {
        toast.error('Failed to delete line')
        console.error('Error deleting line:', error)
      }
    })
  }

  if (showConfirmation) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfirmation(false)}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setShowConfirmation(true)}
    >
      <span className="flex items-center">
        <Trash2Icon size={16} className="mr-1" />
        Delete
      </span>
    </Button>
  )
}
