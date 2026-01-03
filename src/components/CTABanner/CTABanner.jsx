import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wrench, ArrowRight } from 'lucide-react'

const CTABanner = () => {
  return (
    <section className="container-x ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[hsl(var(--p))] via-[hsl(var(--s))] to-[hsl(var(--p))] p-8 md:p-12"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-white/20 items-center justify-center">
              <Wrench size={32} className="text-white" />
            </div>
            <div>
              <h3 className="text-white text-2xl md:text-3xl font-extrabold">
                Are You a Service Professional?
              </h3>
              <p className="text-white/90 mt-2 max-w-lg">
                Join HomeHero and grow your business. Reach thousands of
                customers looking for trusted professionals like you.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/provider/add-service"
              className="inline-flex items-center justify-center gap-2 bg-white text-[hsl(var(--p))] font-bold px-6 py-3 rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start Offering Services
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-all"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default CTABanner
