import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

/**
 * Returns the current Supabase session (or null) and a loading flag.
 * Subscribes to onAuthStateChange so the UI stays in sync automatically.
 *
 * Usage:
 *   const { session, user, loading } = useSession()
 */
export function useSession() {
  const [session, setSession] = useState(undefined) // undefined = still loading
  const [loading, setLoading]  = useState(true)

  useEffect(() => {
    // Get the current session on first mount
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null)
      setLoading(false)
    })

    // Subscribe to sign-in / sign-out / token refresh events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return {
    session,
    user: session?.user ?? null,
    loading,
  }
}
