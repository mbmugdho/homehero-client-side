import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, Edit3 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Profile = () => {
  const { user, appUser, userBookings = [] } = useAuth()

  const displayName = useMemo(() => {
    const n =
      user?.displayName ||
      appUser?.name ||
      user?.email?.split('@')?.[0] ||
      'User'
    return n
  }, [user, appUser])

  const avatarSrc = useMemo(() => {
    const p0 = user?.photoURL
    const p1 = user?.reloadUserInfo?.photoUrl
    const p2 =
      user?.providerData?.find((p) => p?.photoURL)?.photoURL ||
      user?.providerData?.[0]?.photoURL
    const p3 = appUser?.photoURL
    const src = p0 || p1 || p2 || p3 || ''
    return src ? src.replace(/=s\d+-c$/, '=s256-c') : ''
  }, [user, appUser])

  const initial = useMemo(() => {
    const c = (
      displayName.match(/[A-Za-z]/)?.[0] ||
      user?.email?.[0] ||
      'U'
    ).toUpperCase()
    return c
  }, [displayName, user])

  const totalBookings = userBookings.length
  const completedBookings = userBookings.filter(
    (b) => b.status === 'finished'
  ).length
  const pendingBookings = userBookings.filter(
    (b) => b.status !== 'finished'
  ).length

  return (
    <section className="container-x py-14 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cosmic">
          My Profile
        </h1>
        <Link
          to="/edit-profile"
          className="flex items-center gap-2 px-4 py-2 bg-cosmic/20 hover:bg-cosmic/30 rounded-xl border border-cosmic/30 transition"
        >
          <Edit3 size={18} />
          Edit Profile
        </Link>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start gap-8">
          <div className="w-28 h-28 rounded-full ring-2 ring-[hsl(var(--a))/0.7] overflow-hidden bg-gradient-to-br from-[hsl(var(--p))] to-[hsl(var(--s))] grid place-items-center text-white">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={displayName || 'avatar'}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-extrabold leading-none">
                {initial}
              </span>
            )}
          </div>

          <div className="w-full text-left">
            <h2 className="text-2xl font-bold leading-tight">{displayName}</h2>
            <div className="mt-4 space-y-3 text-white/80">
              <div className="flex items-center gap-3">
                <span className="flex-none w-5 h-5 grid place-items-center">
                  <Mail size={18} className="text-cosmic" />
                </span>
                <span className="leading-tight truncate">
                  {user?.email || 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex-none w-5 h-5 grid place-items-center">
                  <Phone size={18} className="text-cosmic" />
                </span>
                <span className="leading-tight">N/A</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-4xl font-bold text-cosmic leading-none">
              {totalBookings}
            </p>
            <p className="text-sm text-white/70 mt-1">Total Bookings</p>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-4xl font-bold text-green-400 leading-none">
              {completedBookings}
            </p>
            <p className="text-sm text-white/70 mt-1">Completed</p>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-4xl font-bold text-yellow-300 leading-none">
              {pendingBookings}
            </p>
            <p className="text-sm text-white/70 mt-1">Pending</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
