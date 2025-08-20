'use client'

import { useEffect } from 'react'
import { createSupabaseBrowser } from '@/lib/supabase/browser'

export default function AfterLogin() {
  useEffect(() => {
    const run = async () => {
      const supabase = createSupabaseBrowser()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/login'
        return
      }

      // Ensure profile exists; default role = athlete
      await supabase.from('profiles').upsert({
        id: user.id,
        display_name: user.user_metadata?.full_name ?? user.email
      })

      // Read role and route
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      const role = (profile?.role as 'athlete' | 'coach' | 'admin' | undefined) ?? 'athlete'
      if (role === 'coach' || role === 'admin') {
        window.location.href = '/coach'
      } else {
        window.location.href = '/athlete'
      }
    }
    run()
  }, [])

  return <main style={{ padding: 24 }}>Finishing sign-in…</main>
}
