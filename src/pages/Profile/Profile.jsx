import React from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Phone, Edit3 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Profile = () => {
  const { user, userBookings = [] } = useAuth()
  const totalBookings = userBookings.length
  const completedBookings = userBookings.filter(b => b.status === 'finished').length
  const pendingBookings = userBookings.filter(b => b.status !== 'finished').length

  return (
    <section className="container-x py-14 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cosmic">My Profile</h1>
        <Link to="/edit-profile" className="flex items-center gap-2 px-4 py-2 bg-cosmic/20 hover:bg-cosmic/30 rounded-xl border border-cosmic/30 transition">
          <Edit3 size={18} />
          Edit Profile
        </Link>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="w-28 h-28 rounded-full bg-cosmic/30 flex items-center justify-center overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={40} className="opacity-80" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.displayName || 'User'}</h2>
            <div className="mt-3 space-y-2 text-white/80">
              <p className="flex items-center gap-2">
                <Mail size={18} className="text-cosmic" /> {user?.email || 'N/A'}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={18} className="text-cosmic" /> N/A
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-4xl font-bold text-cosmic">{totalBookings}</p>
            <p className="text-sm text-white/70">Total Bookings</p>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-4xl font-bold text-green-400">{completedBookings}</p>
            <p className="text-sm text-white/70">Completed</p>
          </div>
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-4xl font-bold text-yellow-300">{pendingBookings}</p>
            <p className="text-sm text-white/70">Pending</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile