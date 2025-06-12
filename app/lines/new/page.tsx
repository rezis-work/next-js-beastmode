import NewLine from '@/app/components/NewLine'
import NewLineSkeleton from '@/app/components/NewLineSkeleton'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

const NewLinePage = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <Link
        href={'/dashboard'}
        className="inline-flex items-center text-sm text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-100"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold mb-6">Create New Line</h1>

      <div className="bg-white dark:bg-dark-elevated border dark:border-dark-border rounded-lg p-6">
        <Suspense fallback={<NewLineSkeleton />}>
          <NewLine />
        </Suspense>
      </div>
    </div>
  )
}

export default NewLinePage
