import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'
import { API_BASE_URL } from '../../config'

const ProviderAddService = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    category: 'Cleaning',
    hourly_rate: '',
    description: '',
    image: '',
    duration: '',
    location: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user?.uid || !user?.email) {
      Swal.fire({ icon: 'info', title: 'Please log in', confirmButtonColor: '#8C2FA3', background: '#1b0b28', color: '#fff' })
      return
    }
    if (!form.title || !form.category || form.hourly_rate === '') {
      Swal.fire({ icon: 'warning', title: 'Title, Category and Price are required', confirmButtonColor: '#8C2FA3', background: '#1b0b28', color: '#fff' })
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          hourly_rate: Number(form.hourly_rate),
          description: form.description,
          image: form.image,
          duration: form.duration,
          location: form.location,
          uid: user.uid,
          providerEmail: user.email,
          providerName: user.displayName || 'Provider',
        }),
      })
      if (!res.ok) throw new Error('Failed to add service')
      await res.json()
      Swal.fire({ icon: 'success', title: 'Service added', confirmButtonColor: '#8C2FA3', background: '#1b0b28', color: '#fff' })
      navigate('/my-services')
    } catch {
      Swal.fire({ icon: 'error', title: 'Failed to add service', confirmButtonColor: '#8C2FA3', background: '#1b0b28', color: '#fff' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container-x py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-cosmic mb-6">Add a new service</h1>
      <form onSubmit={handleSubmit} className="card bg-white/10 border border-white/15 text-white shadow-xl p-6 grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block mb-1">Service Name</span>
            <input
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              placeholder="Deep Cleaning"
              className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
            />
          </label>
          <label className="block">
            <span className="block mb-1">Category</span>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="select select-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
            >
              <option>Cleaning</option>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Carpentry</option>
              <option>Painting</option>
              <option>Appliance</option>
              <option>Outdoor</option>
              <option>Security</option>
              <option>Tech Support</option>
              <option>Moving</option>
              <option>Design</option>
              <option>Construction</option>
              <option>Lifestyle</option>
              <option>Education</option>
            </select>
          </label>
          <label className="block">
            <span className="block mb-1">Price (hourly)</span>
            <input
              name="hourly_rate"
              type="number"
              min="0"
              step="1"
              required
              value={form.hourly_rate}
              onChange={handleChange}
              placeholder="80"
              className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
            />
          </label>
          <label className="block">
            <span className="block mb-1">Image URL</span>
            <input
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
            />
          </label>
        </div>

        <label className="block">
          <span className="block mb-1">Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe what’s included"
            className="textarea textarea-bordered w-full min-h-[120px] bg-white/90 text-[hsl(var(--bc))]"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <span className="block mb-1">Duration (optional)</span>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="2–4 hours"
              className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
            />
          </label>
          <label className="block">
            <span className="block mb-1">Location (optional)</span>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Dhaka, Bangladesh"
              className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
            />
          </label>
        </div>

        <div className="mt-2 flex gap-3">
          <button type="submit" disabled={loading} className="cosmic-btn">
            {loading ? <span className="loading loading-spinner loading-sm" /> : 'Add Service'}
          </button>
          <button type="button" onClick={() => setForm({ title: '', category: '', hourly_rate: '', description: '', image: '', duration: '', location: '' })} className="cosmic-btn-outline">
            Reset
          </button>
        </div>
      </form>
    </section>
  )
}

export default ProviderAddService