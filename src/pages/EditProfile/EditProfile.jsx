import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'

const EditProfile = () => {
  const { user, appUser, updateProfileInfo, authLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setName(user?.displayName || appUser?.name || '')
    setEmail(user?.email || appUser?.email || '')
    setPhone(appUser?.phone || '')
    setPhotoURL(user?.photoURL || appUser?.photoURL || '')
  }, [user, appUser])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await updateProfileInfo({ name, email, phone, photoURL })
    if (res?.code === 'reauth-required') {
      Swal.fire({
        icon: 'info',
        title: 'Please re-login to change email',
        text: 'For security, Firebase needs a recent login to update email.',
        confirmButtonColor: '#8C2FA3',
        background: '#1b0b28',
        color: '#fff',
      })
      return
    }
    if (res?.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Profile updated',
        confirmButtonColor: '#8C2FA3',
        background: '#1b0b28',
        color: '#fff',
      })
      navigate('/profile', { replace: true })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Update failed',
        confirmButtonColor: '#8C2FA3',
        background: '#1b0b28',
        color: '#fff',
      })
    }
  }

  return (
    <section className="container-x py-12 min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cosmic mb-6 text-center">
          Update Profile
        </h1>
        <form
          onSubmit={handleSubmit}
          className="card bg-white/10 border border-white/15 text-white shadow-xl p-6 grid gap-4"
        >
          <label className="block">
            <span className="block mb-1">Full Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              placeholder="Your name"
              required
            />
          </label>

          <label className="block">
            <span className="block mb-1">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block">
            <span className="block mb-1">Mobile Number</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              placeholder="+8801XXXXXXXXX"
            />
          </label>

          <label className="block">
            <span className="block mb-1">Photo URL</span>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              placeholder="https://..."
            />
          </label>

          <div className="flex gap-3">
            <button type="submit" disabled={authLoading} className="cosmic-btn">
              {authLoading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                'Save Changes'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="cosmic-btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default EditProfile
