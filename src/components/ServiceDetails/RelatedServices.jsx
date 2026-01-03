import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { API_BASE_URL } from '../../config'

const RelatedServiceCard = ({ service, index }) => {
  const { _id, id, title, category, rating, reviews, hourly_rate, image } =
    service
  const serviceId = _id || id

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      className="flex-shrink-0 w-72 bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all group"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute bottom-2 left-2 px-2 py-1 rounded-lg bg-white/20 backdrop-blur text-white text-xs font-medium">
          {category}
        </span>
      </div>

      <div className="p-4">
        <h4 className="text-white font-semibold truncate">{title}</h4>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center gap-1 text-amber-400">
            <Star size={14} className="fill-amber-400" />
            <span className="text-sm">{rating?.toFixed(1)}</span>
          </div>
          <span className="text-white/50 text-sm">({reviews} reviews)</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-white font-bold">${hourly_rate}/hr</span>
          <Link
            to={`/service/${serviceId}`}
            className="flex items-center gap-1 text-[hsl(var(--a))] text-sm font-medium hover:gap-2 transition-all"
          >
            View
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

const RelatedServices = ({ currentServiceId, category }) => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelated = async () => {
      if (!category) {
        setLoading(false)
        return
      }

      try {
        const res = await fetch(
          `${API_BASE_URL}/services?category=${encodeURIComponent(category)}`
        )
        if (res.ok) {
          const data = await res.json()
          const filtered = data
            .filter((s) => {
              const sId = (s._id || s.id || '').toString()
              const currentId = (currentServiceId || '').toString()
              return sId !== currentId
            })
            .slice(0, 4)
          setServices(filtered)
        }
      } catch (err) {
        console.error('Failed to fetch related services:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRelated()
  }, [category, currentServiceId])

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
        <h3 className="text-white text-xl font-bold mb-5">Related Services</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-72 bg-white/5 rounded-xl p-4"
            >
              <div className="skeleton h-40 w-full bg-white/10 rounded-lg mb-3" />
              <div className="skeleton h-4 w-3/4 bg-white/10 rounded mb-2" />
              <div className="skeleton h-4 w-1/2 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (services.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white text-xl font-bold">Related Services</h3>
        <Link
          to={`/services?category=${encodeURIComponent(category)}`}
          className="flex items-center gap-1 text-[hsl(var(--a))] text-sm font-medium hover:gap-2 transition-all"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {services.map((service, idx) => (
          <RelatedServiceCard
            key={service._id || service.id}
            service={service}
            index={idx}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default RelatedServices
