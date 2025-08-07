import { supabase } from '../lib/supabaseClient'

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error.message)
    return null
  }

  return data
}
