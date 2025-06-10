import { getLines } from '@/lib/dal'
import Link from 'next/link'
import Button from '../components/ui/Button'
import { PlusIcon } from 'lucide-react'
import Badge from '../components/ui/Badge'
import { Priority, Status } from '@/lib/types'
import { LINE_PRIORITY, LINE_STATUS } from '@/db/schema'

const DashboardPage = async () => {
  const lines = await getLines()
  console.log(lines)
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Lines</h1>
        <Link href={'/lines/new'}>
          <Button>
            <span className="flex items-center">
              <PlusIcon size={18} className="mr-2" />
              New Line
            </span>
          </Button>
        </Link>
      </div>

      {lines.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-high shadow-md">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-dark-elevated border-b border-gray-200 dark:border-dark-border-default">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-3">Created</div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-dark-border-default">
            {lines.map((line) => (
              <Link
                key={line.id}
                href={`/lines/${line.id}`}
                className="block hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                  <div className="col-span-5 font-medium truncate">
                    {line.title}
                  </div>
                  <div className="col-span-2">
                    <Badge className="col-span-2">
                      {LINE_STATUS[line.status as Status].label}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <Badge priority={line.priority as Priority}>
                      {LINE_PRIORITY[line.priority as Priority].label}
                    </Badge>
                  </div>
                  <div className="col-span-3 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(line.createdAt).toLocaleString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center py-12 text-center border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-high p-8">
          <h3 className="text-lg font-medium mb-2">No Lines Found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Get started by creating your first line.
          </p>
          <Link href={'/lines/new'}>
            <Button>
              <span className="flex items-center">
                <PlusIcon size={18} className="mr-2" />
                Create Line
              </span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default DashboardPage
