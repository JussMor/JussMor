import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { AuthSession } from '@supabase/supabase-js'
import Layout from '../components/Layout'

export default function Home() {
  const [session, setSession] = useState<AuthSession | null >(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div>
      <Layout>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? <Auth /> : <Account key={session.user!.id} session={session} />}
      </div>
      </Layout>
    </div>
  )
}