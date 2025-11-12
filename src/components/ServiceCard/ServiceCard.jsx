import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'

const ServiceCard = ({ service }) => {
  const {
    id,
    title,
    category,
    description,
    rating,
    reviews,
    hourly_rate,
    duration,
    location,
    image,
    featured,
  } = service
  const { isAuthed, selectService } = useAuth()
  const navigate = useNavigate()

  const price = typeof hourly_rate === 'number' ? `$${hourly_rate}/hr` : ''

  const handleAddService = () => {
    if (!isAuthed) {
      Swal.fire({
        icon: 'info',
        title: 'You need to log in first',
        confirmButtonColor: '#8C2FA3',
        background: '#1b0b28',
        color: '#fff',
      }).then(() => navigate('/login', { state: { from: `/service/${id}` } }))
      return
    }
    selectService(service)
    navigate('/add-service')
  }

  return (
    <motion.article
      className="card bg-white/10 border border-white/15 text-white shadow-xl"
      initial={{ opacity: 0, y: 40, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      whileHover={{
        scale: 1.03,
        rotateX: 2,
        rotateY: -2,
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <figure className="relative h-44 md:h-48 overflow-hidden rounded-xl">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/40" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="badge cosmic-badge text-white">{category}</span>
          {featured && (
            <span className="badge cosmic-badge text-white">Featured</span>
          )}
        </div>
      </figure>

      <div className="card-body p-4">
        <h3 className="font-semibold text-lg leading-snug">{title}</h3>
        {description && (
          <p className="text-white/80 text-sm mt-1">{description}</p>
        )}

        <div className="mt-2 flex items-center gap-2 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill={i < Math.round(rating) ? 'currentColor' : 'none'}
              stroke="currentColor"
              className={i < Math.round(rating) ? '' : 'text-amber-400/40'}
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91 6.06 6.09 10 0l3.94 6.09 5.572.82-4.756 4.635 1.122 6.545z" />
            </svg>
          ))}
          <span className="text-white/80 text-sm">
            {rating?.toFixed(1)} · {reviews} reviews
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/80">
          {price && <div className="font-semibold">{price}</div>}
          {duration && <div>{duration}</div>}
          {location && <div>{location}</div>}
        </div>

        <div className="card-actions mt-4 gap-2">
          <Link to={`/service/${id}`} className="cosmic-btn">
            View Details
          </Link>
          <button
            type="button"
            onClick={handleAddService}
            className="cosmic-btn-outline"
          >
            Add Service
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default ServiceCard
