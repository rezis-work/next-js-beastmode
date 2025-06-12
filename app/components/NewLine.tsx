import { getCurrentUser } from '@/lib/dal'
import { redirect } from 'next/navigation'
import LineForm from './LineForm'

const NewLine = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/signin')
  }
  return <LineForm userId={user.id} />
}

export default NewLine
