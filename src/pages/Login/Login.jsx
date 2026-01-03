import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'
import { FaGoogle } from 'react-icons/fa'
import { PageTitle } from '../../usePageTitle'

const Login = () => {
  const { login, loginWithGoogle, authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login({ email: form.email, password: form.password })

      Swal.fire({
        icon: 'success',
        title: 'Welcome back',
        confirmButtonColor: '#8C2FA3',
        background: '#1b0b28',
        color: '#fff',
      })
      navigate(from, { replace: true })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: err?.message || 'Invalid credentials',
        confirmButtonColor: '#8C2FA3',
        background: '#1b0b28',
        color: '#fff',
      })
    }
  }

  const handleGoogle = async () => {
    try {
      await loginWithGoogle()
      Swal.fire({
        icon: 'success',
        title: 'Signed in with Google',
        confirmButtonColor: '#8C2FA3',
        background: '#1b0b28',
        color: '#fff',
      })
      navigate(from, { replace: true })
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Google sign-in failed',
        confirmButtonColor: '#8C2FA3',
        background: '#1b0b28',
        color: '#fff',
      })
    }
  }

  return (
    <>
      <PageTitle
        title="Login"
        description="Login to your HomeHero account to manage services and bookings"
      />
      <section className="container-x py-16 grid place-items-center min-h-[70vh]">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl p-6">
          <h1 className="text-cosmic text-3xl font-extrabold text-center">
            Welcome back
          </h1>
          <p className="text-white/80 text-center mt-1">
            Log in to manage bookings and services
          </p>

          <div className="flex gap-2 mt-5">
            <button
              onClick={handleGoogle}
              disabled={authLoading}
              className="cosmic-btn-outline w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <FaGoogle />
              Continue with Google
            </button>
          </div>

          <div className="flex items-center gap-2 my-5">
            <div className="h-px bg-white/15 flex-1" />
            <span className="text-white/70 text-xs">or</span>
            <div className="h-px bg-white/15 flex-1" />
          </div>

          <form onSubmit={handleSubmit}>
            <label className="block text-white/80 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="your email address"
              value={form.email}
              onChange={handleChange}
              className="input input-bordered rounded-full w-full bg-white/90 text-[hsl(var(--bc))]"
            />
            <label className="block text-white/80 mt-4 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="input input-bordered rounded-full w-full bg-white/90 text-[hsl(var(--bc))]"
            />
            <button
              type="submit"
              disabled={authLoading}
              className="cosmic-btn w-full mt-5 disabled:opacity-60"
            >
              {authLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <p className="text-white/80 text-center mt-4">
            New here?{' '}
            <Link to="/register" className="text-[hsl(var(--a))] font-semibold">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}

export default Login
