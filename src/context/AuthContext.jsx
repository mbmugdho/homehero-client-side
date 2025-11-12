import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)
  const ready = true

  const login = async ({ email, name, avatar } = {}) => {
    setAuthLoading(true)
    await new Promise((r) => setTimeout(r, 500))
    const u = {
      id: 'u_1',
      name: name || 'HomeHero User',
      email: email || 'user@homehero.app',
      avatar: avatar || 'https://i.pravatar.cc/96?img=18',
    }
    setUser(u)
    setAuthLoading(false)
    return u
  }

  const loginWithGoogle = async () =>
    login({ name: 'Google User', email: 'google@homehero.app' })

  const logout = async () => {
    setAuthLoading(true)
    await new Promise((r) => setTimeout(r, 200))
    setUser(null)
    setAuthLoading(false)
  }

  const value = useMemo(
    () => ({
      user,
      isAuthed: !!user,
      ready,
      authLoading,
      login,
      loginWithGoogle,
      logout,
    }),
    [user, authLoading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
