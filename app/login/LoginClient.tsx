'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createSupabaseBrowser } from '@/lib/supabase/browser'

export default function LoginClient() {
  const supabase = createSupabaseBrowser()
  return (
    <main style={{ padding: 24, maxWidth: 480, margin: '0 auto' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
        Nomadic Performance — Login
      </h1>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    </main>
  )
}
