import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { getProfile } from '../services/profileServices'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null) // <-- NEW
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)

      if (session?.user?.id) {
        setUser(session.user) // <-- set user directly from session
        const userProfile = await getProfile(session.user.id)
        setProfile(userProfile)
      }
      setLoading(false)
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)

      if (session?.user?.id) {
        setUser(session.user) // <-- set user on auth state change
        getProfile(session.user.id).then(setProfile)
      } else {
        setUser(null)
        setProfile(null)
      }
    })

    init()
    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ session, user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
