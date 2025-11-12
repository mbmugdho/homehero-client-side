import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'

const AddService = () => {
  const { isAuthed, selectedServices, bookSelected } = useAuth()
  const navigate = useNavigate()

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

  const handleBookNow = (serviceId) => {
    const item = bookSelected(serviceId)
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
    <section className="container-x py-12 grid gap-6">
      {selectedServices.map((s) => (
        <div
          key={s.id}
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
              <div className="text-sm text-white/85 space-y-2">
                <div className="flex justify-between">
                  <span>Rate</span>
                  <span className="font-semibold">৳{s.hourly_rate}/hr</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration</span>
                  <span>{s.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location</span>
                  <span className="text-right">{s.location}</span>
                </div>
              </div>
              <button
                className="cosmic-btn w-full mt-4"
                onClick={() => handleBookNow(s.id)}
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
      ))}
    </section>
  )
}

export default AddService
