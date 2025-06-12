export default function LinePageLoading() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="animate-pulse">
          <div className="h-6 w-24 bg-gray-200 dark:bg-dark-border-default rounded"></div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4">
        <div className="animate-pulse">
          <div className="h-10 w-64 bg-gray-200 dark:bg-dark-border-default rounded"></div>
        </div>
      </div>
      <div className="bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6 my-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="animate-pulse">
            <div className="h-6 w-24 bg-gray-200 dark:bg-dark-border-default rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
