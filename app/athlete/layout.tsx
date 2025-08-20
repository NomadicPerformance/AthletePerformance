import { redirect } from 'next/navigation'
import { getUserAndProfile } from '@/lib/auth'
import { createSupabaseServer } from '@/lib/supabase/server'

export default async function AthleteLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getUserAndProfile()
  if (!user) redirect('/login')
  const role = (profile?.role as 'athlete' | 'coach' | 'admin' | undefined) ?? 'athlete'
  if (role !== 'athlete') redirect('/coach') // send coaches/admins away
  return <>{children}</>
}
