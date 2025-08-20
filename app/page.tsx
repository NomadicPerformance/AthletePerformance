// app/page.tsx
import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'

// ensure this runs at request time (not pre-rendered)
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  redirect('/login')
}
