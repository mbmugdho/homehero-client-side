import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Users, Briefcase, Star, MapPin } from 'lucide-react'

const stats = [
  {
    icon: <Briefcase size={28} />,
    value: 5000,
    suffix: '+',
    label: 'Services Completed',
  },
  {
    icon: <Users size={28} />,
    value: 2500,
    suffix: '+',
    label: 'Happy Customers',
  },
  {
    icon: <Star size={28} />,
    value: 4.9,
    suffix: '',
    label: 'Average Rating',
    decimals: 1,
  },
  {
    icon: <MapPin size={28} />,
    value: 50,
    suffix: '+',
    label: 'Cities Covered',
  },
]

const CounterNumber = ({ value, suffix = '', decimals = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplayValue(v),
    })
    return () => controls.stop()
  }, [value])

  return (
    <span>
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.floor(displayValue)}
      {suffix}
    </span>
  )
}

const StatsCounter = () => {
  return (
    <section className="container-x ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-[hsl(var(--p))]/20 via-[hsl(var(--s))]/10 to-[hsl(var(--p))]/20 backdrop-blur border border-white/10 rounded-3xl p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <h2 className="text-cosmic text-3xl sm:text-4xl font-extrabold">
            Trusted by Thousands
          </h2>
          <p className="text-white/80 mt-3">
            Numbers that speak for our commitment to quality service
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center text-[hsl(var(--a))]">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                <CounterNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default StatsCounter
