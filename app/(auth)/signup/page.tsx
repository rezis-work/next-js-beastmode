'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/ui/Button'
import Link from 'next/link'
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormError,
} from '@/app/components/ui/Form'
import toast from 'react-hot-toast'
import { signUp, type ActionResponse } from '@/app/actions/auth'

const initialState: ActionResponse = {
  success: false,
  message: '',
  error: undefined,
}

const SignUpPage = () => {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signUp(formData)
      if (result.success) {
        toast.success('Account created succesfully')
        router.push('/dashboard')
      }
      return result
    } catch (error) {
      console.error('Error while signing up: ', error)
      return {
        success: false,
        message: 'An error occurred while signing up',
        error: 'An error occurred while signing up',
      }
    }
  }, initialState)

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Sign up to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Form action={formAction} className="space-y-6">
          {state?.message && !state.success && (
            <FormError>{state.message}</FormError>
          )}

          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isPending}
              aria-describedby="email-error"
              className={state?.errors?.email ? 'border-red-500' : ''}
            />
            {state?.errors?.email && (
              <p id="email-error" className="text-sm text-red-500">
                {state.errors.email[0]}
              </p>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              disabled={isPending}
              aria-describedby="password-error"
              className={state?.errors?.password ? 'border-red-500' : ''}
            />
            {state?.errors?.password && (
              <p id="password-error" className="text-sm text-red-500">
                {state.errors.password[0]}
              </p>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              disabled={isPending}
              aria-describedby="confirmPassword-error"
              className={state?.errors?.confirmPassword ? 'border-red-500' : ''}
            />
            {state?.errors?.confirmPassword && (
              <p id="confirmPassword-error" className="text-sm text-red-500">
                {state.errors.confirmPassword[0]}
              </p>
            )}
          </FormGroup>

          <div>
            <Button type="submit" className="w-full" isLoading={isPending}>
              Sign up
            </Button>
          </div>
        </Form>

        <div className="bg-white dark:bg-[#1A1A1A] py-8 px-4 shadow sm:rounded-lg sm:px-10 border-gray-100 dark:border-dark-border-subtle">
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
