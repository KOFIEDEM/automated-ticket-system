'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

import { supabase } from '@/lib/supabaseClient'

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  location: string
  avatar: string | null
}

interface UserContextType {
  user: UserProfile | null
  loading: boolean
  updateUser: (updates: Partial<UserProfile>) => Promise<boolean>
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(
  undefined
)

export function UserProvider({
  children,
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUser = async () => {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setUser(null)
      setLoading(false)
      return
    }

    const metadata = user.user_metadata || {}

    setUser({
      id: user.id,
      name:
        metadata.full_name ||
        metadata.name ||
        'RailPass User',
      email: user.email || '',
      phone: metadata.phone || '',
      location: metadata.location || 'Accra, Ghana',
      avatar: metadata.avatar || null,
    })

    setLoading(false)
  }

  useEffect(() => {
    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const updateUser = async (
    updates: Partial<UserProfile>
  ) => {
    if (!user) return false

    const metadataUpdates = {
      full_name: updates.name ?? user.name,
      phone: updates.phone ?? user.phone,
      location: updates.location ?? user.location,
      avatar: updates.avatar ?? user.avatar,
    }

    const { data, error } =
      await supabase.auth.updateUser({
        data: metadataUpdates,
      })

    if (error) {
      console.error('Unable to update profile:', error)
      return false
    }

    const metadata = data.user?.user_metadata || {}

    setUser({
      id: data.user?.id || user.id,
      name:
        metadata.full_name ||
        user.name,
      email:
        data.user?.email ||
        user.email,
      phone:
        metadata.phone ||
        '',
      location:
        metadata.location ||
        'Accra, Ghana',
      avatar:
        metadata.avatar ||
        null,
    })

    return true
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateUser,
        refreshUser: loadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error(
      'useUser must be used inside UserProvider'
    )
  }

  return context
}