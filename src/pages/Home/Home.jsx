import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroBanner from '../../components/Banner/HeroBanner'
import ThreeDCarousel from '../../components/Carousel/ThreeDCarousel'
import PopularServices from '../../components/PopularServices/PopularServices'
import CustomerReviews from '../../components/CustomerReview/CustomerReviews'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const fadeUpStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const fadeUpChild = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const Home = () => {
  return (
    <div>
      <HeroBanner />

      <motion.section
        className="container-x py-12 md:py-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center"
          variants={fadeUpStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={fadeUpChild}>
            <h2 className="text-cosmic text-3xl sm:text-4xl font-extrabold leading-tight">
              Trusted home services, right where you live
            </h2>
            <p className="mt-3 text-white/90 text-base sm:text-lg">
              We help clients discover and book the best local professionals —
              from cleaning to plumbing to electrical. Every provider is vetted,
              pricing is transparent, and our friendly support team is here to
              help before and after your booking.
            </p>

            <motion.ul
              className="mt-6 space-y-3"
              variants={fadeUpStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {[
                {
                  title: 'Vetted local pros',
                  desc: 'Identity checks, reviews, and quality standards.',
                },
                {
                  title: 'Upfront pricing',
                  desc: 'Clear rates with no surprises at checkout.',
                },
                {
                  title: 'Support that cares',
                  desc: "We're here to ensure you get the best service possible.",
                },
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start gap-3"
                  variants={fadeUpChild}
                >
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[hsl(var(--a))]">
                    ✓
                  </span>
                  <div className="text-white/90">
                    <strong className="block">{item.title}</strong>
                    <span className="text-white/70">{item.desc}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              variants={fadeUpChild}
            >
              <Link to="/services" className="cosmic-btn">
                Explore Services
              </Link>
              <Link to="/services" className="cosmic-btn-outline">
                How it works
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUpChild}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h3 className="text-white/90 text-xl font-semibold">
                Popular in your area
              </h3>
              <p className="text-white/70 mt-1">
                Book trusted professionals for everyday home needs.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Cleaning', desc: 'Deep cleans, move‑outs, regular upkeep' },
                  { title: 'Plumbing', desc: 'Leaks, installs, water heaters' },
                  { title: 'Electrical', desc: 'Wiring, lighting, smart homes' },
                  { title: 'Gardening', desc: 'Lawn care, trimming, planting' },
                ].map((cat, idx) => (
                  <motion.div
                    key={idx}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                    variants={fadeUpChild}
                  >
                    <div className="text-white font-semibold">{cat.title}</div>
                    <div className="text-white/70 text-sm">{cat.desc}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-6 text-white/70 text-sm"
                variants={fadeUpChild}
              >
                Can't find what you need?{' '}
                <Link
                  to="/services"
                  className="underline underline-offset-4 decoration-[hsl(var(--a))]"
                >
                  Browse all categories
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.div
        variants={fadeUpChild}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <ThreeDCarousel />
      </motion.div>

      <motion.div
        variants={fadeUpChild}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <PopularServices />
      </motion.div>

      <CustomerReviews />

      <motion.section
        className="container-x py-16"
        variants={fadeUpChild}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-cosmic text-3xl font-extrabold">
              Get the best of HomeHero
            </h3>
            <p className="text-white/80 mt-2">
              Tips, seasonal offers, and local service updates.
            </p>
            <form className="mt-6">
              <fieldset className="w-full max-w-lg mx-auto">
                <label className="block text-white/80 mb-2">
                  Enter your email address
                </label>
                <div className="join gap-3 w-full">
                  <input
                    type="email"
                    required
                    placeholder="your email address"
                    className="input input-bordered join-item w-full rounded-full bg-white/90 text-[hsl(var(--bc))]"
                  />
                  <button className="cosmic-btn join-item whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home
