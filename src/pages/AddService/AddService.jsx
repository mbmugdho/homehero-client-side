import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { PageTitle } from '../../usePageTitle'

const AddService = () => {
  const { isAuthed, selectedServices, bookSelected } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({})

  if (!isAuthed) {
    navigate('/login', { replace: true, state: { from: '/add-service' } })
    return null
  }

  if (!selectedServices.length) {
    return (
      <section className="container-x py-16 text-white">
        <h1 className="text-3xl font-bold">No services selected</h1>
        <p className="mt-2">Browse services and choose one to continue.</p>
        <Link to="/services" className="cosmic-btn mt-4 inline-flex">
          Browse Services
        </Link>
      </section>
    )
  }

  const keyOf = (s) => (s?._id || s?.id || '').toString()

  const handleChange = (sid, field, value) => {
    setForm((prev) => ({
      ...prev,
      [sid]: { ...(prev[sid] || {}), [field]: value },
    }))
  }

  const handleBookNow = async (svc) => {
    const sid = keyOf(svc)
    const bookingDate = form[sid]?.bookingDate
      ? new Date(form[sid].bookingDate).toISOString()
      : new Date().toISOString()
    const price =
      form[sid]?.price !== undefined ? Number(form[sid].price) : svc.hourly_rate
    const item = await bookSelected(svc, { bookingDate, price })
    if (item) {
      Swal.fire({
        icon: 'success',
        title: 'Booked',
        text: `Your booking for ${item.title} is ongoing`,
        confirmButtonColor: '#8C2FA3',
        background: '#1b0b28',
        color: '#fff',
      })
      navigate('/my-bookings')
    }
  }

  return (
    <>
      <PageTitle
        title="Add Service"
        description="Add a new service to offer on HomeHero"
      />
      <section className="container-x py-12 grid gap-6">
        {selectedServices.map((s) => {
          const sid = keyOf(s)
          return (
            <div
              key={sid}
              className="card bg-white/10 border border-white/15 text-white shadow-xl overflow-hidden"
            >
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5 grid gap-4 md:grid-cols-[1.5fr_.9fr]">
                <div>
                  <h1 className="text-cosmic text-2xl sm:text-3xl font-extrabold">
                    {s.title}
                  </h1>
                  <p className="text-white/85 mt-2">{s.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-white/80 text-sm">
                    <span className="badge cosmic-badge text-white">
                      {s.category}
                    </span>
                    <span>${s.hourly_rate}/hr</span>
                    <span>{s.duration}</span>
                    <span>{s.location}</span>
                  </div>
                </div>
                <aside className="card bg-white/5 border border-white/10 p-4">
                  <div className="text-sm text-white/85 space-y-3">
                    <label className="block">
                      <span className="block mb-1">Booking Date & Time</span>
                      <input
                        type="datetime-local"
                        className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
                        value={form[sid]?.bookingDate || ''}
                        onChange={(e) =>
                          handleChange(sid, 'bookingDate', e.target.value)
                        }
                      />
                    </label>
                    <label className="block">
                      <span className="block mb-1">Price</span>
                      <input
                        type="number"
                        className="input input-bordered w-full bg-white/90 text-[hsl(var(--bc))]"
                        value={form[sid]?.price ?? s.hourly_rate ?? 0}
                        onChange={(e) =>
                          handleChange(sid, 'price', e.target.value)
                        }
                      />
                    </label>
                  </div>
                  <button
                    className="cosmic-btn w-full mt-4"
                    onClick={() => handleBookNow(s)}
                  >
                    Book Now
                  </button>
                  <Link
                    to="/services"
                    className="cosmic-btn-outline w-full text-center mt-2"
                  >
                    Back to Services
                  </Link>
                </aside>
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}

export default AddService
