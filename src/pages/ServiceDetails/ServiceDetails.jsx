import { useLoaderData, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Swal from 'sweetalert2'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Tag,
  Calendar,
  ArrowLeft
} from 'lucide-react'
import { PageTitle } from '../../usePageTitle'
import ProviderInfo from '../../components/ServiceDetails/ProviderInfo'
import ReviewsSection from '../../components/ServiceDetails/ReviewsSection'
import RelatedServices from '../../components/ServiceDetails/RelatedServices'

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

  const isOwner =
    (svc?.uid && user?.uid && String(svc.uid) === String(user.uid)) ||
    (svc?.providerEmail &&
      user?.email &&
      String(svc.providerEmail).toLowerCase() ===
        String(user.email).toLowerCase())

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
    if (isOwner) {
      Swal.fire({
        icon: 'info',
        title: 'You cannot book your own service',
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

  const serviceId = svc._id || svc.id

  return (
    <>
      <PageTitle
        title={svc.title || 'Service Details'}
        description={svc.description || 'View detailed information about the selected HomeHero service'}
      />

      <div className="container-x py-8 space-y-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Services
        </motion.button>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <img
                src={svc.image}
                alt={svc.title}
                className="w-full h-[300px] sm:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur text-white text-sm font-medium">
                  {svc.category}
                </span>
                {svc.featured && (
                  <span className="px-3 py-1.5 rounded-full bg-amber-500/80 backdrop-blur text-white text-sm font-medium">
                    ⭐ Featured
                  </span>
                )}
                {isOwner && (
                  <span className="px-3 py-1.5 rounded-full bg-green-500/80 backdrop-blur text-white text-sm font-medium">
                    Your Service
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-cosmic text-3xl sm:text-4xl font-extrabold">
                {svc.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={star <= Math.round(svc.rating || 0) 
                        ? 'text-amber-400 fill-amber-400' 
                        : 'text-white/20'
                      }
                    />
                  ))}
                  <span className="text-white ml-1">{svc.rating?.toFixed(1)}</span>
                  <span className="text-white/60">({svc.reviews} reviews)</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap gap-4"
            >
              {svc.hourly_rate && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <DollarSign size={18} className="text-[hsl(var(--a))]" />
                  <span className="text-white font-semibold">${svc.hourly_rate}/hr</span>
                </div>
              )}
              {svc.duration && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <Clock size={18} className="text-[hsl(var(--a))]" />
                  <span className="text-white/80">{svc.duration}</span>
                </div>
              )}
              {svc.location && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                  <MapPin size={18} className="text-[hsl(var(--a))]" />
                  <span className="text-white/80">{svc.location}</span>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-white text-xl font-bold mb-3 flex items-center gap-2">
                <Tag size={20} className="text-[hsl(var(--a))]" />
                Description
              </h3>
              <p className="text-white/80 leading-relaxed">
                {svc.description}
              </p>

              {svc.details && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <h4 className="text-white font-semibold mb-2">What's Included:</h4>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {svc.details}
                  </p>
                </div>
              )}
            </motion.div>

            <ProviderInfo provider={svc.provider} />

            <ReviewsSection rating={svc.rating} reviewCount={svc.reviews} />
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-white text-xl font-bold mb-5 flex items-center gap-2">
                <Calendar size={20} className="text-[hsl(var(--a))]" />
                Book This Service
              </h3>

              <div className="bg-gradient-to-r from-[hsl(var(--p))]/20 to-[hsl(var(--s))]/20 rounded-xl p-4 mb-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-white/70">Starting from</span>
                  <div>
                    <span className="text-3xl font-bold text-white">${svc.hourly_rate}</span>
                    <span className="text-white/70">/hr</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Duration</span>
                  <span className="text-white font-medium">{svc.duration || 'Flexible'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Location</span>
                  <span className="text-white font-medium">{svc.location || 'On-site'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Category</span>
                  <span className="text-white font-medium">{svc.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Rating</span>
                  <span className="text-white font-medium flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    {svc.rating?.toFixed(1)} ({svc.reviews})
                  </span>
                </div>
              </div>

              <button
                className="cosmic-btn w-full py-3 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleOpen}
                disabled={isOwner}
                title={isOwner ? 'You cannot book your own service' : ''}
              >
                {isOwner ? 'Your Service' : 'Book Now'}
              </button>

              {isOwner && (
                <p className="text-white/50 text-xs text-center mt-3">
                  You cannot book your own service
                </p>
              )}

              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-[hsl(var(--a))] text-sm font-semibold">✓ Verified</div>
                    <div className="text-white/50 text-xs">Provider</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5">
                    <div className="text-[hsl(var(--a))] text-sm font-semibold">✓ Secure</div>
                    <div className="text-white/50 text-xs">Payment</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <RelatedServices
          currentServiceId={serviceId}
          category={svc.category}
        />

        <dialog className={`modal ${open ? 'modal-open' : ''}`}>
          <div className="modal-box bg-[hsl(var(--n))] text-white border border-white/10 max-w-md">
            <h3 className="text-xl font-bold">Confirm Booking</h3>
            <p className="text-white/70 mt-1">{svc.title}</p>
            
            <div className="mt-5 grid gap-4">
              <label className="block">
                <span className="block mb-1 text-sm text-white/80">Your Email</span>
                <input
                  type="email"
                  readOnly
                  value={user?.email || ''}
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white"
                />
              </label>
              <label className="block">
                <span className="block mb-1 text-sm text-white/80">Date & Time</span>
                <input
                  type="datetime-local"
                  readOnly
                  value={defaultDateTime}
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white"
                />
              </label>
              <label className="block">
                <span className="block mb-1 text-sm text-white/80">Estimated Price</span>
                <input
                  type="text"
                  readOnly
                  value={`$${svc.hourly_rate ?? 0}/hr`}
                  className="input input-bordered w-full bg-white/10 border-white/20 text-white"
                />
              </label>
            </div>

            <div className="mt-6 grid gap-2">
              <button className="cosmic-btn w-full" onClick={handleProceed}>
                Continue to Booking
              </button>
              <button
                className="cosmic-btn-outline w-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setOpen(false)}>close</button>
          </form>
        </dialog>
      </div>
    </>
  )
}

export default ServiceDetails