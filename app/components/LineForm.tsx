'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { LINE_STATUS, LINE_PRIORITY, Line } from '@/db/schema'
import Button from '@/app/components/ui/Button'
import {
  Form,
  FormGroup,
  FormLabel,
  FormTextarea,
  FormSelect,
  FormError,
  FormInput,
} from '@/app/components/ui/Form'
import { createLines, updateLines, ActionResponse } from '../actions/lines'

interface LineFormProps {
  line?: Line
  userId: string
  isEditing?: boolean
}

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

export default function LineForm({
  line,
  userId,
  isEditing = false,
}: LineFormProps) {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as
        | 'backlog'
        | 'todo'
        | 'in_progress'
        | 'done',
      priority: formData.get('priority') as 'low' | 'medium' | 'high',
      userId,
    }

    try {
      const result = isEditing
        ? await updateLines(Number(line!.id), data)
        : await createLines(data)

      if (!result) {
        return {
          success: false,
          message: 'Unexpected error: no result returned',
          errors: undefined,
        }
      }

      if (result.success) {
        router.refresh()
        if (!isEditing) {
          router.push('/dashboard')
        }
      }

      return result
    } catch (error) {
      console.error('Error in form action:', error)
      return {
        success: false,
        message: 'Unexpected error',
        error: 'Failed to save line',
      }
    }
  }, initialState)

  const statusOptions = Object.values(LINE_STATUS).map(({ label, value }) => ({
    label,
    value,
  }))

  const priorityOptions = Object.values(LINE_PRIORITY).map(
    ({ label, value }) => ({
      label,
      value,
    })
  )

  return (
    <Form action={formAction}>
      {state?.message && (
        <FormError
          className={`mb-4 ${
            state.success ? 'bg-green-100 text-green-800 border-green-300' : ''
          }`}
        >
          {state.message}
        </FormError>
      )}

      <FormGroup>
        <FormLabel htmlFor="title">Title</FormLabel>
        <FormInput
          id="title"
          name="title"
          placeholder="Line title"
          defaultValue={line?.title || ''}
          required
          minLength={3}
          maxLength={100}
          disabled={isPending}
          aria-describedby="title-error"
          className={state?.errors?.title ? 'border-red-500' : ''}
        />
        {state?.errors?.title && (
          <p id="title-error" className="text-sm text-red-500">
            {state.errors.title[0]}
          </p>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="description">Description</FormLabel>
        <FormTextarea
          id="description"
          name="description"
          placeholder="Line description"
          defaultValue={line?.description || ''}
          required
          minLength={3}
          maxLength={100}
          disabled={isPending}
          aria-describedby="title-error"
          className={state?.errors?.title ? 'border-red-500' : ''}
        />
        {state?.errors?.title && (
          <p id="title-error" className="text-sm text-red-500">
            {state.errors.title[0]}
          </p>
        )}
      </FormGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormGroup>
          <FormLabel htmlFor="status">Status</FormLabel>
          <FormSelect
            id="status"
            name="status"
            defaultValue={line?.status || 'backlog'}
            options={statusOptions}
            disabled={isPending}
            required
            aria-describedby="status-error"
            className={state?.errors?.status ? 'border-red-500' : ''}
          />
          {state?.errors?.status && (
            <p id="status-error" className="text-sm text-red-500">
              {state.errors.status[0]}
            </p>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="priority">Priority</FormLabel>
          <FormSelect
            id="priority"
            name="priority"
            defaultValue={line?.priority || 'medium'}
            options={priorityOptions}
            disabled={isPending}
            required
            aria-describedby="priority-error"
            className={state?.errors?.priority ? 'border-red-500' : ''}
          />
          {state?.errors?.priority && (
            <p id="priority-error" className="text-sm text-red-500">
              {state.errors.priority[0]}
            </p>
          )}
        </FormGroup>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending}>
          {isEditing ? 'Update Line' : 'Create Line'}
        </Button>
      </div>
    </Form>
  )
}
