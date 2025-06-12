export default function NewLineSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Title input skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded" />
      </div>

      {/* Description input skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-32 w-full bg-gray-300 dark:bg-gray-600 rounded" />
      </div>

      {/* Status and priority select skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
      </div>

      {/* Button skeletons */}
      <div className="flex justify-end gap-2 mt-6">
        <div className="h-10 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
    </div>
  )
}
