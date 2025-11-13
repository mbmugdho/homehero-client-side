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
  const [authLoading, setAuthLoading] = useState(true)
  const [ready, setReady] = useState(false)
  const [userServices, setUserServices] = useState([])
  const [userBookings, setUserBookings] = useState([])
  const [selectedServices, setSelectedServices] = useState([])

  // Fetch bookings & services whenever user logs in
  useEffect(() => {
    if (!user?.uid) {
      setUserBookings([])
      setUserServices([])
      return
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/bookings?uid=${user.uid}`)
        if (!res.ok) throw new Error('Failed to fetch bookings')
        const data = await res.json()
        setUserBookings(data)
      } catch (err) {
        console.error(err)
      }
    }

    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/my-services?uid=${user.uid}`)
        if (!res.ok) throw new Error('Failed to fetch services')
        const data = await res.json()
        setUserServices(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchBookings()
    fetchServices()
  }, [user])

  const selectService = (service) => {
    setSelectedServices((prev) =>
      prev.find((s) => s.id === service.id) ? prev : [...prev, service]
    )
  }

  const bookSelected = async (serviceId) => {
    const service = selectedServices.find(
      (s) => s.id === serviceId || s._id === serviceId
    )
    if (!service || !user) return null

    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          serviceId: service._id || service.id,
          ...service,
        }),
      })
      const data = await res.json()

      setUserBookings((prev) => [
        ...prev,
        { ...service, status: 'ongoing', _id: data.insertedId },
      ])

      if (!userServices.find((s) => s.id === service.id))
        setUserServices((prev) => [...prev, { ...service, status: 'ongoing' }])

      setSelectedServices((prev) =>
        prev.filter((s) => s.id !== serviceId && s._id !== serviceId)
      )

      return data
    } catch (err) {
      console.error('Booking failed', err)
      return null
    }
  }

  const finishService = async (serviceId) => {
    const booking = userBookings.find(
      (b) => b.id === serviceId || b._id === serviceId
    )
    if (!booking) return

    try {
      await fetch(`${API_BASE_URL}/bookings/${booking._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'finished' }),
      })

      setUserBookings((prev) =>
        prev.map((b) =>
          b.id === serviceId || b._id === serviceId
            ? { ...b, status: 'finished' }
            : b
        )
      )
      setUserServices((prev) =>
        prev.map((s) => (s.id === serviceId ? { ...s, status: 'finished' } : s))
      )
    } catch (err) {
      console.error(err)
    }
  }

  const ongoingCount = userServices.filter((s) => s.status === 'ongoing').length
  const finishedCount = userServices.filter(
    (s) => s.status === 'finished'
  ).length

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
    setUserServices([])
    setUserBookings([])
    setSelectedServices([])
  }

  return (
    <AuthContext.Provider
      value={{
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
        selectService,
        bookSelected,
        finishService,
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
