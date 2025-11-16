import { useLoaderData, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Swal from 'sweetalert2'
import { useMemo, useState } from 'react'

const ServiceDetails = () => {
  const svc = useLoaderData()
  const { isAuthed, selectService, user } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const defaultDateTime = useMemo(() => {
    const d = new Date()
    const tz = d.getTimezoneOffset()
    const local = new Date(d.getTime() - tz * 60000)
    return local.toISOString().slice(0, 16)
  }, [])

  const handleOpen = () => {
    if (!isAuthed) {
      Swal.fire({
        icon: 'info',
        title: 'You need to log in first',
        confirmButtonColor: '#8C2FA3',
        background: '#1b0b28',
        color: '#fff',
      })
      return
    }
    setOpen(true)
  }

  const handleProceed = () => {
    selectService(svc)
    setOpen(false)
    navigate('/add-service')
  }

  return (
    <section className="container-x py-12">
      <div className="card bg-white/10 border border-white/15 text-white shadow-xl overflow-hidden">
        <img
          src={svc.image}
          alt={svc.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-5 grid gap-6 md:grid-cols-[1.5fr_.9fr]">
          <div>
            <h1 className="text-cosmic text-2xl sm:text-3xl font-extrabold">
              {svc.title}
            </h1>
            <p className="text-white/85 mt-2">{svc.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-white/80 text-sm">
              <span className="badge cosmic-badge text-white">
                {svc.category}
              </span>
              <span>${svc.hourly_rate}/hr</span>
              <span>{svc.duration}</span>
              <span>{svc.location}</span>
            </div>
          </div>
          <aside className="card bg-white/5 border border-white/10 p-4">
            <div className="text-sm text-white/85 space-y-2">
              <div className="flex justify-between">
                <span>Rate</span>
                <span className="font-semibold">${svc.hourly_rate}/hr</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>{svc.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Location</span>
                <span className="text-right">{svc.location}</span>
              </div>
            </div>
            <button className="cosmic-btn w-full mt-4" onClick={handleOpen}>
              Book Now
            </button>
          </aside>
        </div>
      </div>

      <dialog className={`modal ${open ? 'modal-open' : ''}`}>
        <div className="modal-box bg-[hsl(var(--n))] text-white border border-white/10">
          <h3 className="text-xl font-bold">Confirm Booking</h3>
          <p className="text-white/70 mt-1">{svc.title}</p>
          <div className="mt-4 grid gap-3">
            <label className="block">
              <span className="block mb-1">Your Email</span>
              <input
                type="email"
                readOnly
                value={user?.email || ''}
                className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              />
            </label>
            <label className="block">
              <span className="block mb-1">Date & Time (preview)</span>
              <input
                type="datetime-local"
                readOnly
                value={defaultDateTime}
                className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              />
            </label>
            <label className="block">
              <span className="block mb-1">Price (preview)</span>
              <input
                type="number"
                readOnly
                value={svc.hourly_rate ?? 0}
                className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
              />
            </label>
          </div>
          <div className="mt-5 grid gap-2">
            <button className="cosmic-btn w-full" onClick={handleProceed}>
              Continue to Add Service
            </button>
            <button
              className="cosmic-btn-outline w-full"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setOpen(false)}>close</button>
        </form>
      </dialog>
    </section>
  )
}

export default ServiceDetails
