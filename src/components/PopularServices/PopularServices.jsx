import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ServiceCard from '../../components/ServiceCard/ServiceCard'
import { API_BASE_URL } from '../../config'

const PopularServices = () => {
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/services`, {
          headers: { 'Content-Type': 'application/json' },
        })

        if (!res.ok) throw new Error('Failed to fetch services')
        const data = await res.json()
        const top6 = data.sort((a, b) => b.rating - a.rating).slice(0, 6)
        setServices(top6)
      } catch (err) {
        console.error(err)
      }
    }

    fetchServices()
  }, [])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section className="container-x py-2">
      <header className="mb-6 text-center">
        <h2 className="text-cosmic text-3xl sm:text-4xl font-extrabold">
          Popular Services
        </h2>
        <p className="text-white/80 mt-2">
          Our most sought-after services picked just for you.
        </p>
      </header>

      <motion.div
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((svc) => (
          <motion.div key={svc._id} variants={item}>
            <ServiceCard service={svc} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default PopularServices
