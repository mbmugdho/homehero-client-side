import { motion } from 'framer-motion'
import { CheckCircle, Phone, Mail, Clock, Award } from 'lucide-react'

const ProviderInfo = ({ provider }) => {
  if (!provider) return null

  const { name, experience, contact, verified, profile_img } = provider

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6"
    >
      <h3 className="text-white text-xl font-bold mb-5 flex items-center gap-2">
        <Award size={22} className="text-[hsl(var(--a))]" />
        About the Provider
      </h3>

      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-xl overflow-hidden ring-2 ring-[hsl(var(--p))]/30 bg-gradient-to-br from-[hsl(var(--p))] to-[hsl(var(--s))]">
            {profile_img ? (
              <img
                src={profile_img}
                alt={name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = `<span class="w-full h-full flex items-center justify-center text-white text-2xl font-bold">${
                    name?.[0] || 'P'
                  }</span>`
                }}
              />
            ) : (
              <span className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                {name?.[0] || 'P'}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-white text-lg font-semibold">
              {name || 'Service Provider'}
            </h4>
            {verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                <CheckCircle size={12} />
                Verified
              </span>
            )}
          </div>

          <div className="mt-3 space-y-2">
            {experience && (
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Clock size={16} className="text-[hsl(var(--a))]" />
                <span>{experience} of experience</span>
              </div>
            )}

            {contact && (
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Phone size={16} className="text-[hsl(var(--a))]" />
                <a
                  href={`tel:${contact}`}
                  className="hover:text-white transition-colors"
                >
                  {contact}
                </a>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {contact && (
              <a
                href={`tel:${contact}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <Phone size={16} />
                Call Provider
              </a>
            )}
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
              <Mail size={16} />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProviderInfo
