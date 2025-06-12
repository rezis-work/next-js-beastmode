import DeleteLineButton from '@/app/components/DeleteLineButton'
import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'
import { getLine } from '@/lib/dal'
import { Priority, Status } from '@/lib/types'
import { formatRelativeTime } from '@/lib/utils'
import { ArrowLeftIcon, Edit2Icon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const LinePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  const line = await getLine(Number(id))

  if (!line) {
    notFound()
  }
  const { title, description, status, priority, createdAt, updatedAt, user } =
    line

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'backlog':
        return 'Backlog'
      case 'todo':
        return 'ToDo'
      case 'in_progress':
        return 'In Progress'
      case 'done':
        return 'Done'
      default:
        return status
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'Low'
      case 'medium':
        return 'Medium'
      case 'high':
        return 'High'
      default:
        return priority
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Link
        href={'/dashboard'}
        className="inline-flex items-center text-sm text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Dashboard
      </Link>
      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex items-center space-x-2">
          <Link href={`/lines/${id}/edit`}>
            <Button variant="outline" size="sm">
              <span className="flex items-center">
                <Edit2Icon size={16} className="mr-1" />
                Edit
              </span>
            </Button>
          </Link>
          <DeleteLineButton id={parseInt(id)} />
        </div>
      </div>

      <div className="bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6 my-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge status={status as Status}>{getStatusLabel(status)}</Badge>
          <Badge priority={priority as Priority}>
            {getPriorityLabel(priority)}
          </Badge>
          <div className="text-sm text-gray-500">
            Created {formatRelativeTime(new Date(createdAt))}
          </div>
          {updatedAt !== createdAt && (
            <div className="text-sm text-gray-500">
              Updated {formatRelativeTime(new Date(updatedAt))}
            </div>
          )}
        </div>

        {description ? (
          <div className="prose dark:prose-invent max-w-none">
            <p className="whitespace-pre-line">{description}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No description provided</p>
        )}
      </div>

      <div className="bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-2">Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Assigned to:</span>
            <span className="text-gray-500">{user.email}</span>
          </div>
          <div>
            <p className="font-medium text-sm text-gray-500 mb-1">Status</p>
            <Badge status={status as Status}>{getStatusLabel(status)}</Badge>
          </div>
          <div>
            <p className="font-medium text-sm text-gray-500 mb-1">Priority</p>
            <Badge priority={priority as Priority}>
              {getPriorityLabel(priority)}
            </Badge>
          </div>
          <div>
            <p className="font-medium text-sm text-gray-500 mb-1">Created</p>
            <div className="text-sm text-gray-500">
              {formatRelativeTime(new Date(createdAt))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinePage
