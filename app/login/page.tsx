
import { createSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getUserAndProfile } from '@/lib/auth'
import LoginClient from './LoginClient'

export const metadata = { title: 'Login — Nomadic Performance' }

export default async function LoginPage() {
  const { user, profile } = await getUserAndProfile()
  if (user) {
    const role = (profile?.role as 'athlete' | 'coach' | 'admin' | undefined) ?? 'athlete'
    if (role === 'coach' || role === 'admin') redirect('/coach')
    redirect('/athlete')
  }
  return <LoginClient />
}
