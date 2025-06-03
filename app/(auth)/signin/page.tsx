import Link from 'next/link'

const SignInPage = () => {
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#1A1A1A] py-8 px-4 shadow sm:rounded-lg sm:px-10 border-gray-100 dark:border-dark-border-subtle">
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignInPage
