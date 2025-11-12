import { createContext, useContext, useEffect, useState } from 'react'
import { auth, googleProvider } from '../firebase.config'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthLoading(false)
      setReady(true)
    })
    return () => unsub()
  }, [])

  const register = async ({ name, email, password, photoURL }) => {
    setAuthLoading(true)
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (name || photoURL)
      await updateProfile(cred.user, {
        displayName: name || undefined,
        photoURL: photoURL || undefined,
      })
    setAuthLoading(false)
    return cred.user
  }

  const login = async ({ email, password }) => {
    setAuthLoading(true)
    const cred = await signInWithEmailAndPassword(auth, email, password)
    setAuthLoading(false)
    return cred.user
  }

  const loginWithGoogle = async () => {
    setAuthLoading(true)
    const cred = await signInWithPopup(auth, googleProvider)
    setAuthLoading(false)
    return cred.user
  }

  const logout = async () => {
    setAuthLoading(true)
    await signOut(auth)
    setAuthLoading(false)
  }

  const value = {
    user,
    isAuthed: !!user,
    ready,
    authLoading,
    register,
    login,
    loginWithGoogle,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
