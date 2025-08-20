// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies as nextCookies } from 'next/headers'


export function createSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        // Next typings differ across versions; cast to a callable
    
        const store = (nextCookies as unknown as () => any)()
        return store?.get?.(name)?.value
      },
      set(name: string, value: string, options?: any) {
        // In App Router, cookie writes are handled via response headers.
        // If you need writes in server actions/route handlers, you can implement them.
      },
      remove(name: string, options?: any) {
        // No-op here as well; implement in server actions if needed.
      },
    },
  })
}
