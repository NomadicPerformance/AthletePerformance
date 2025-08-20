// lib/auth.ts
import { createSupabaseServer } from '@/lib/supabase/server'

export type ProfileRole = 'athlete' | 'coach' | 'admin'
export type ProfileRow = {
  id: string
  role: ProfileRole
  display_name: string | null
}

export async function getUserAndProfile(): Promise<{
  user: import('@supabase/supabase-js').User | null
  profile: ProfileRow | null
}> {
  const supabase = createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { user: null, profile: null }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, role, display_name')
    .eq('id', user.id)
    .maybeSingle()

  return { user, profile: (profile as ProfileRow | null) ?? null }
}
