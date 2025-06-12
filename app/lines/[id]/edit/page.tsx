import LineForm from '@/app/components/LineForm'
import { getLine } from '@/lib/dal'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const EditLinePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  const line = await getLine(parseInt(id))

  if (!line) {
    notFound()
  }
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <Link
        href={`/lines/${id}`}
        className="inline-flex items-center text-sm text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Line Details {line.title}
      </Link>

      <h1 className="text-2xl font-bold mb-6">Edit Line</h1>

      <div className="bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6">
        <LineForm userId={line.userId} line={line} isEditing />
      </div>
    </div>
  )
}

export default EditLinePage
