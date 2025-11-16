import { useLoaderData, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Swal from 'sweetalert2'

const ServiceDetails = () => {
  const svc = useLoaderData()
  const { isAuthed, selectService } = useAuth()
  const navigate = useNavigate()

  const handleBook = () => {
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
    selectService(svc)
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
            <button className="cosmic-btn w-full mt-4" onClick={handleBook}>
              Book Now
            </button>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default ServiceDetails
