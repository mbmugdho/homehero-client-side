import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroBanner from '../../components/Banner/HeroBanner'
import ThreeDCarousel from '../../components/Carousel/ThreeDCarousel'
import PopularServices from '../../components/PopularServices/PopularServices'
import CustomerReviews from '../../components/CustomerReview/CustomerReviews'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import StatsCounter from '../../components/StatsCounter/StatsCounter'
import FAQ from '../../components/FAQ/FAQ'
import CTABanner from '../../components/CTABanner/CTABanner'
import { PageTitle } from '../../usePageTitle'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const fadeUpChild = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const immediateContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const immediateItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const immediateItemDelay = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.4 },
  },
}

const Section = ({ children, className = '', id }) => (
  <div id={id} className={`py-8 md:py-10 ${className}`}>
    {children}
  </div>
)

const Home = () => {
  return (
    <div className="space-y-0">
      <PageTitle
        title="Home"
        description="Browse and book trusted services on HomeHero"
      />

      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Trust/Features Section  */}
      <Section>
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left side - Text Content */}
            <motion.div
              variants={immediateContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                className="text-cosmic text-3xl sm:text-4xl font-extrabold leading-tight"
                variants={immediateItem}
              >
                Trusted home services, right where you live
              </motion.h2>
              
              <motion.p
                className="mt-3 text-white/90 text-base sm:text-lg"
                variants={immediateItem}
              >
                We help clients discover and book the best local professionals —
                from cleaning to plumbing to electrical. Every provider is vetted,
                pricing is transparent, and our friendly support team is here to
                help before and after your booking.
              </motion.p>

              <motion.ul
                className="mt-6 space-y-3"
                variants={immediateContainer}
                initial="hidden"
                animate="visible"
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
                    variants={immediateItem}
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
                variants={immediateItem}
              >
                <Link to="/services" className="cosmic-btn">
                  Explore Services
                </Link>
                <a href="#how-it-works" className="cosmic-btn-outline">
                  How it works
                </a>
              </motion.div>
            </motion.div>

            {/* Right side - Popular Categories Card */}
            <motion.div
              variants={immediateItemDelay}
              initial="hidden"
              animate="visible"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h3 className="text-white/90 text-xl font-semibold">
                  Popular in your area
                </h3>
                <p className="text-white/70 mt-1">
                  Book trusted professionals for everyday home needs.
                </p>

                <motion.div
                  className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
                  variants={immediateContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    {
                      title: 'Cleaning',
                      desc: 'Deep cleans, move‑outs, regular upkeep',
                    },
                    { title: 'Plumbing', desc: 'Leaks, installs, water heaters' },
                    {
                      title: 'Electrical',
                      desc: 'Wiring, lighting, smart homes',
                    },
                    { title: 'Gardening', desc: 'Lawn care, trimming, planting' },
                  ].map((cat, idx) => (
                    <motion.div
                      key={idx}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors cursor-pointer"
                      variants={immediateItem}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-white font-semibold">{cat.title}</div>
                      <div className="text-white/70 text-sm">{cat.desc}</div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-6 text-white/70 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
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
          </div>
        </div>
      </Section>

      {/* 4. 3D Carousel */}
      <Section>
        <ThreeDCarousel />
      </Section>

      {/* 5. How It Works */}
      <Section id="how-it-works">
        <HowItWorks />
      </Section>

      {/* 6. Popular Services */}
      <Section>
        <PopularServices />
      </Section>

      {/* 7. Statistics Counter */}
      <Section>
        <StatsCounter />
      </Section>

      {/* 8. Customer Reviews */}
      <Section>
        <CustomerReviews />
      </Section>

      {/* 9. FAQ Section */}
      <Section>
        <FAQ />
      </Section>

      {/* 10. CTA  */}
      <Section>
        <CTABanner />
      </Section>

      {/* 11. Newsletter */}
      <Section className="pb-12">
        <motion.div
          className="container-x"
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
              <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
                <fieldset className="w-full max-w-lg mx-auto">
                  <label className="block text-white/80 mb-2">
                    Enter your email address
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="input input-bordered flex-1 rounded-full bg-white/90 text-[hsl(var(--bc))]"
                    />
                    <button className="cosmic-btn whitespace-nowrap">
                      Subscribe
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </motion.div>
      </Section>
    </div>
  )
}

export default Home