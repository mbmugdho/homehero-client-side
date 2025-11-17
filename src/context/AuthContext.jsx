import { createContext, useContext, useEffect, useState } from 'react'
import { auth, googleProvider } from '../firebase.config'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  updateEmail,
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

  const [providerServices, setProviderServices] = useState([])

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

          const r2 = await fetch(`${API_BASE_URL}/my-services?uid=${u.uid}`)
          const my = r2.ok ? await r2.json() : []
          setProviderServices(my)
        } catch {}
      } else {
        setAppUser(null)
        setUserBookings([])
        setUserServices([])
        setSelectedServices([])
        setProviderServices([])
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

  const refreshProviderServices = async () => {
    if (!user?.uid) return
    try {
      const r = await fetch(`${API_BASE_URL}/my-services?uid=${user.uid}`)
      const my = r.ok ? await r.json() : []
      setProviderServices(my)
    } catch {}
  }

  const updateService = async (serviceId, patch) => {
    if (!user) return null
    try {
      const res = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...patch,
          uid: user.uid,
          userEmail: user.email,
        }),
      })
      if (!res.ok) return null
      const updated = await res.json()
      setProviderServices((prev) =>
        prev.map((s) => (keyOf(s) === keyOf(updated) ? updated : s))
      )
      return updated
    } catch {
      return null
    }
  }

  const deleteService = async (serviceId) => {
    if (!user) return false
    try {
      const res = await fetch(
        `${API_BASE_URL}/services/${serviceId}?uid=${encodeURIComponent(
          user.uid
        )}`,
        { method: 'DELETE' }
      )
      if (!res.ok) return false
      setProviderServices((prev) => prev.filter((s) => keyOf(s) !== serviceId))
      return true
    } catch {
      return false
    }
  }

  const updateProfileInfo = async ({ name, photoURL, email, phone }) => {
    if (!user) return { ok: false }
    try {
      setAuthLoading(true)
      if (name || photoURL) {
        await updateProfile(auth.currentUser, {
          displayName: name || null,
          photoURL: photoURL || null,
        })
      }
      if (email && email !== auth.currentUser.email) {
        try {
          await updateEmail(auth.currentUser, email)
        } catch (err) {
          setAuthLoading(false)
          if (err?.code === 'auth/requires-recent-login')
            return { ok: false, code: 'reauth-required' }
          return { ok: false }
        }
      }
      await fetch(`${API_BASE_URL}/users/${auth.currentUser.uid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, photoURL, email, phone }),
      })
      setUser({ ...auth.currentUser })
      setAppUser((prev) =>
        prev
          ? { ...prev, name, photoURL, email: email || prev.email, phone }
          : prev
      )
      setAuthLoading(false)
      return { ok: true }
    } catch {
      setAuthLoading(false)
      return { ok: false }
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
    setProviderServices([])
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
        providerServices,
        refreshProviderServices,
        updateService,
        deleteService,
        updateProfileInfo,
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
