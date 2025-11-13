import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import ServiceCard from '../../components/ServiceCard/ServiceCard'
import { API_BASE_URL } from '../../config'

const AddService = () => {
  const { selectedServices, bookSelected } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleBookNow = async (serviceId) => {
    setLoading(true)
    await bookSelected(serviceId)
    setLoading(false)
  }

  if (!selectedServices.length)
    return (
      <section className="container-x py-16 text-white text-center">
        No services selected. Go pick some services first!
      </section>
    )

  return (
    <section className="container-x py-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {selectedServices.map((svc) => (
        <div
          key={svc._id || svc.id}
          className="card bg-white/10 border border-white/15 shadow-xl text-white"
        >
          <img
            src={svc.image}
            alt={svc.title}
            className="w-full h-44 object-cover rounded-t-xl"
          />
          <div className="p-4">
            <h2 className="font-semibold text-lg">{svc.title}</h2>
            <p className="text-white/80 mt-1">{svc.description}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="font-semibold">
                {svc.hourly_rate ? `$${svc.hourly_rate}/hr` : ''}
              </span>
              <button
                onClick={() => handleBookNow(svc._id || svc.id)}
                disabled={loading}
                className="cosmic-btn"
              >
                {loading ? 'Booking...' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default AddService
