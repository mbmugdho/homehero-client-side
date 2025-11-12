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
  const [userServices, setUserServices] = useState([])
  const [userBookings, setUserBookings] = useState([])
  const [selectedServices, setSelectedServices] = useState([]) 

  const addUserService = (service) => {
    setUserServices((prev) => [...prev, { ...service, status: 'pending' }])
  }

  const bookSelected = (serviceId) => {
    const service = selectedServices.find(s => s.id === serviceId)
    if (!service) return null

    const booking = { ...service, status: 'ongoing', bookedAt: new Date() }
    setUserBookings((prev) => [...prev, booking])

    if (!userServices.find(s => s.id === service.id)) {
      addUserService(service)
    }

    setSelectedServices(prev => prev.filter(s => s.id !== serviceId))
    return booking
  }

  const finishService = (serviceId) => {
    setUserBookings(prev =>
      prev.map(s => s.id === serviceId ? { ...s, status: 'finished' } : s)
    )
    setUserServices(prev =>
      prev.map(s => s.id === serviceId ? { ...s, status: 'finished' } : s)
    )
  }

  const selectService = (service) => {
    setSelectedServices((prev) => {
      if (!prev.find(s => s.id === service.id)) {
        return [...prev, service]
      }
      return prev
    })
  }

  const ongoingCount = userServices.filter(s => s.status === 'ongoing').length
  const finishedCount = userServices.filter(s => s.status === 'finished').length

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
    userServices,
    userBookings,
    selectedServices,
    addUserService,
    selectService,
    bookSelected,
    finishService,
    ongoingCount,
    finishedCount,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
