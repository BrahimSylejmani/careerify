import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import AuthForm from '../components/AuthForm'

const Auth = () => {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) navigate('/')
    })
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <AuthForm onAuthSuccess={() => navigate('/')} />
    </div>
  )
}

export default Auth
