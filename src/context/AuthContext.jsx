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
import { API_BASE_URL } from '../config'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [appUser, setAppUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [ready, setReady] = useState(false)
  const [userServices, setUserServices] = useState([])
  const [userBookings, setUserBookings] = useState([])
  const [selectedServices, setSelectedServices] = useState([])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      setAuthLoading(false)
      setReady(true)
      if (u?.uid) {
        try {
          const syncRes = await fetch(`${API_BASE_URL}/users/sync`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uid: u.uid,
              email: u.email,
              name: u.displayName,
              photoURL: u.photoURL,
              providerIds: (u.providerData || []).map((p) => p.providerId),
              lastLoginAt: u.metadata?.lastLoginAt || Date.now(),
            }),
          })
          const synced = syncRes.ok ? await syncRes.json() : null
          setAppUser(synced)

          const r1 = await fetch(`${API_BASE_URL}/bookings?uid=${u.uid}`)
          const b = r1.ok ? await r1.json() : []
          setUserBookings(b)
          setUserServices(b)
        } catch {}
      } else {
        setAppUser(null)
        setUserBookings([])
        setUserServices([])
        setSelectedServices([])
      }
    })
    return () => unsub()
  }, [])

  const keyOf = (s) => (s?._id || s?.id || '').toString()

  const selectService = (service) => {
    setSelectedServices((prev) =>
      prev.some((x) => keyOf(x) === keyOf(service)) ? prev : [service, ...prev]
    )
  }

  const bookSelected = async (service, options = {}) => {
    if (!service || !user) return null
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          userEmail: user.email,
          serviceId: service._id || service.id,
          title: service.title,
          category: service.category,
          hourly_rate: service.hourly_rate,
          duration: service.duration,
          location: service.location,
          image: service.image,
          bookingDate: options.bookingDate || new Date().toISOString(),
          price:
            typeof options.price === 'number'
              ? options.price
              : service.hourly_rate,
        }),
      })
      if (!res.ok) return null
      const data = await res.json()
      setUserBookings((prev) => [data, ...prev])
      setUserServices((prev) => {
        const exists = prev.some((x) => keyOf(x) === keyOf(data))
        return exists
          ? prev.map((x) => (keyOf(x) === keyOf(data) ? data : x))
          : [data, ...prev]
      })
      setSelectedServices((prev) =>
        prev.filter((x) => keyOf(x) !== keyOf(service))
      )
      return data
    } catch {
      return null
    }
  }

  const finishService = async (bookingId) => {
    try {
      await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'finished' }),
      })
      setUserBookings((prev) =>
        prev.map((b) =>
          keyOf(b) === bookingId ? { ...b, status: 'finished' } : b
        )
      )
      setUserServices((prev) =>
        prev.map((s) =>
          keyOf(s) === bookingId ? { ...s, status: 'finished' } : s
        )
      )
    } catch {}
  }

  const cancelBooking = async (bookingId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
      })
      if (!res.ok) return false
      setUserBookings((prev) => prev.filter((b) => keyOf(b) !== bookingId))
      setUserServices((prev) => prev.filter((s) => keyOf(s) !== bookingId))
      return true
    } catch {
      return false
    }
  }

  const ongoingCount = userServices.filter((s) => s.status === 'ongoing').length
  const finishedCount = userServices.filter(
    (s) => s.status === 'finished'
  ).length

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
    const userCred = await signInWithEmailAndPassword(auth, email, password)
    setAuthLoading(false)
    return userCred.user
  }

  const loginWithGoogle = async () => {
    setAuthLoading(true)
    const userCred = await signInWithPopup(auth, googleProvider)
    setAuthLoading(false)
    return userCred.user
  }

  const logout = async () => {
    setAuthLoading(true)
    await signOut(auth)
    setAuthLoading(false)
    setAppUser(null)
    setUserServices([])
    setUserBookings([])
    setSelectedServices([])
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        appUser,
        isAuthed: !!user,
        ready,
        authLoading,
        register,
        login,
        loginWithGoogle,
        logout,
        userServices,
        userBookings,
        setUserBookings,
        selectedServices,
        selectService,
        bookSelected,
        finishService,
        cancelBooking,
        ongoingCount,
        finishedCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
