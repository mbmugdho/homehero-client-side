import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'

const Register = () => {
  const { register, loginWithGoogle, authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    terms: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.terms) {
      Swal.fire({
        icon: 'info',
        title: 'Please accept the terms',
        confirmButtonColor: '#8C2FA3',
        background: '#1b0b28',
        color: '#fff',
      })
      return
    }
    if (form.password !== form.confirm) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        confirmButtonColor: '#8C2FA3',
        background: '#1b0b28',
        color: '#fff',
      })
      return
    }
    try {
      // Call register instead of login
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      })

      Swal.fire({
        icon: 'success',
        title: 'Account created',
        confirmButtonColor: '#8C2FA3',
        background: '#1b0b28',
        color: '#fff',
      })
      navigate(from, { replace: true })
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Registration failed',
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
        title: 'Signed up with Google',
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
    <section className="container-x py-16 grid place-items-center min-h-[70vh]">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-xl p-6">
        <h1 className="text-cosmic text-3xl font-extrabold text-center">
          Create your account
        </h1>
        <p className="text-white/80 text-center mt-1">
          Join HomeHero to book and manage services
        </p>

        <div className="flex gap-2 mt-5">
          <button
            onClick={handleGoogle}
            disabled={authLoading}
            className="cosmic-btn-outline w-full flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.35 11.1H12v2.9h5.3c-.2 1.3-1.6 3.8-5.3 3.8A6 6 0 1 1 12 6.1c1.7 0 3 .7 3.7 1.3l2.5-2.5A9.5 9.5 0 0 0 12 3a9 9 0 1 0 0 18c5.2 0 8.7-3.6 8.7-8.6 0-.6-.1-1.2-.35-1.3z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="flex items-center gap-2 my-5">
          <div className="h-px bg-white/15 flex-1" />
          <span className="text-white/70 text-xs">or</span>
          <div className="h-px bg-white/15 flex-1" />
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-white/80 mb-2">Full name</label>
          <input
            name="name"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
          />
          <label className="block text-white/80 mt-4 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="your email address"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
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
            className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
          />
          <label className="block text-white/80 mt-4 mb-2">
            Confirm password <span className="text-red-500">*</span>
          </label>
          <input
            name="confirm"
            type="password"
            required
            placeholder="********"
            value={form.confirm}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
          />

          <label className="label cursor-pointer justify-start gap-2 mt-4">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              className="checkbox checkbox-sm border-white/40"
            />
            <span className="label-text text-white/80">
              I agree to the{' '}
              <a className="underline underline-offset-4 decoration-[hsl(var(--a))]">
                Terms & Privacy
              </a>
            </span>
          </label>

          <button
            type="submit"
            disabled={authLoading}
            className="cosmic-btn w-full mt-5 disabled:opacity-60"
          >
            {authLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-white/80 text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[hsl(var(--a))] font-semibold">
            Log in
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register
