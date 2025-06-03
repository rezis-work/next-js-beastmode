import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#121212]">
      <h1 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        <Link href="/">Line</Link>
      </h1>
      {children}
    </div>
  )
}
