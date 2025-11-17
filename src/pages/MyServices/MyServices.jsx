import { useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const MyServices = () => {
  const {
    user,
    providerServices = [],
    refreshProviderServices,
    updateService,
    deleteService,
  } = useAuth()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})

  useEffect(() => {
    refreshProviderServices()
  }, [])

  const rows = useMemo(() => providerServices, [providerServices])

  const openEdit = (svc) => {
    setEditing(svc)
    setForm({
      title: svc.title || '',
      category: svc.category || 'Cleaning',
      hourly_rate: svc.hourly_rate ?? 0,
      description: svc.description || '',
      image: svc.image || '',
      duration: svc.duration || '',
      location: svc.location || '',
      featured: !!svc.featured,
    })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSave = async () => {
    if (!editing) return
    const body = {
      title: form.title,
      category: form.category,
      hourly_rate: Number(form.hourly_rate),
      description: form.description,
      image: form.image,
      duration: form.duration,
      location: form.location,
      featured: !!form.featured,
    }
    const updated = await updateService(editing._id || editing.id, body)
    if (updated) {
      Swal.fire({
        icon: 'success',
        title: 'Updated',
        timer: 1200,
        showConfirmButton: false,
        background: '#1b0b28',
        color: '#fff',
      })
      setEditing(null)
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed to update',
        background: '#1b0b28',
        color: '#fff',
      })
    }
  }

  const handleDelete = async (svc) => {
    const res = await Swal.fire({
      icon: 'warning',
      title: 'Delete this service?',
      text: 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      background: '#1b0b28',
      color: '#fff',
    })
    if (!res.isConfirmed) return
    const ok = await deleteService((svc._id || svc.id).toString())
    if (ok) {
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        timer: 1200,
        showConfirmButton: false,
        background: '#1b0b28',
        color: '#fff',
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed to delete',
        background: '#1b0b28',
        color: '#fff',
      })
    }
  }

  return (
    <section className="container-x py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-cosmic">My Services</h1>
        <Link to="/provider/add-service" className="cosmic-btn">
          Add Service
        </Link>
      </div>

      {rows.length === 0 ? (
        <p className="text-white text-center mt-6">
          You haven’t added any services yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="table text-white">
            <thead>
              <tr>
                <th className='text-white'>Title</th>
                <th className='text-white'>Category</th>
                <th className='text-white'>Price</th>
                <th className='text-white'>Created</th>
                <th className="text-right text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((svc) => (
                <tr key={svc._id || svc.id} className="hover">
                  <td className="max-w-[240px] truncate">{svc.title}</td>
                  <td>{svc.category}</td>
                  <td>${svc.hourly_rate}</td>
                  <td>
                    {svc.createdAt
                      ? new Date(svc.createdAt).toLocaleDateString()
                      : '—'}
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="cosmic-btn-outline"
                        onClick={() => openEdit(svc)}
                      >
                        Edit
                      </button>
                      <button
                        className="cosmic-btn"
                        onClick={() => handleDelete(svc)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog className={`modal ${editing ? 'modal-open' : ''}`}>
        <div className="modal-box bg-[hsl(var(--n))] text-white border border-white/10">
          <h3 className="text-xl font-bold mb-3">Edit Service</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="block">
              <span className="block mb-1">Title</span>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
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
              <span className="block mb-1">Price</span>
              <input
                name="hourly_rate"
                type="number"
                min="0"
                step="1"
                value={form.hourly_rate}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              />
            </label>
            <label className="block">
              <span className="block mb-1">Image URL</span>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              />
            </label>
            <label className="md:col-span-2 block">
              <span className="block mb-1">Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full min-h-[100px] bg-white/90 text-[hsl(var(--bc))]"
              />
            </label>
            <label className="block">
              <span className="block mb-1">Duration</span>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              />
            </label>
            <label className="block">
              <span className="block mb-1">Location</span>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              />
            </label>
            <label className="flex items-center gap-2">
              <input
                name="featured"
                type="checkbox"
                checked={!!form.featured}
                onChange={handleChange}
                className="checkbox checkbox-sm border-white/40"
              />
              <span>Featured</span>
            </label>
          </div>
          <div className="mt-5 grid gap-2">
            <button className="cosmic-btn w-full" onClick={handleSave}>
              Save
            </button>
            <button
              className="cosmic-btn-outline w-full"
              onClick={() => setEditing(null)}
            >
              Close
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setEditing(null)}>close</button>
        </form>
      </dialog>
    </section>
  )
}

export default MyServices
