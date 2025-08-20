// lib/supabaseClient.ts
import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies as nextCookies } from 'next/headers'

export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export function createSupabaseServer() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // Handle Next versions where cookies() is (wrongly) typed as Promise
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const store: any = (nextCookies as any)()
          return store?.get?.(name)?.value
        },
        set() {
          // handled via Next response headers in App Router; no-op here
        },
        remove() {}
      }
    }
  )
}
