import { motion } from 'framer-motion'
import { Search, CalendarCheck, ThumbsUp } from 'lucide-react'

const steps = [
  {
    icon: <Search size={32} />,
    title: 'Search & Discover',
    desc: 'Browse through our wide range of verified home service professionals in your area.',
  },
  {
    icon: <CalendarCheck size={32} />,
    title: 'Book Instantly',
    desc: 'Choose your preferred date, time, and service provider. Confirm with just one click.',
  },
  {
    icon: <ThumbsUp size={32} />,
    title: 'Get It Done',
    desc: 'Sit back and relax while our trusted pros handle everything. Pay securely after completion.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const HowItWorks = () => {
  return (
    <section className="container-x ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-cosmic text-3xl sm:text-4xl font-extrabold">
          How It Works
        </h2>
        <p className="text-white/80 mt-3 max-w-2xl mx-auto">
          Getting professional help for your home has never been easier. Just three simple steps!
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-[hsl(var(--p))] to-[hsl(var(--s))] flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {idx + 1}
            </div>

            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[hsl(var(--p))]/20 to-[hsl(var(--s))]/20 flex items-center justify-center text-[hsl(var(--a))] group-hover:scale-110 transition-transform duration-300">
              {step.icon}
            </div>

            <h3 className="text-white text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>

            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[hsl(var(--p))]/50 to-transparent" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default HowItWorks