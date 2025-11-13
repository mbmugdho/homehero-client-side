import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { motion } from 'framer-motion'

import imgPlumbing from '../../assets/hero-plumbing.jpg'
import imgElectrical from '../../assets/hero-electrical.jpg'
import imgCleaning from '../../assets/hero-cleaning.jpg'

const slides = [
  {
    img: imgPlumbing,
    title: 'Plumbing Pros On-Demand',
    desc: 'Fix leaks fast with vetted plumbers available near you.',
    btnPrimary: { text: 'Find Plumbers', to: '/services?cat=Plumbing' },
    btnSecondary: { text: 'All Services', to: '/services' },
    alt: 'Plumber fixing a sink',
  },
  {
    img: imgElectrical,
    title: 'Safe, Smart Electrical Upgrades',
    desc: 'Certified electricians for wiring, lighting, and smart homes.',
    btnPrimary: { text: 'Hire Electricians', to: '/services?cat=Electrical' },
    btnSecondary: { text: 'See More', to: '/services' },
    alt: 'Electrician working on a panel',
  },
  {
    img: imgCleaning,
    title: 'Spotless Homes, Happy You',
    desc: 'Book trusted cleaners with transparent pricing.',
    btnPrimary: { text: 'Book Cleaning', to: '/services?cat=Cleaning' },
    btnSecondary: { text: 'Browse All', to: '/services' },
    alt: 'Cleaner wiping a counter',
  },
]

const HeroBanner = () => {
  return (
    <section className="container-x py-15">
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-2xl border border-white/10 shadow-xl">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop
          speed={700}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx} aria-label={slide.title}>
              <div className="relative w-full h-full">
                <img
                  src={slide.img}
                  alt={slide.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6A1B9A]/70 via-[#C05DB9]/40 to-transparent mix-blend-multiply" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#140022]/70 via-transparent to-transparent mix-blend-multiply" />

                <div className="relative z-10 h-full flex items-center justify-end">
                  <motion.div
                    className="text-right max-w-lg mr-4 sm:mr-8 md:mr-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    key={slide.title}
                  >
                    <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-white drop-shadow-md">
                      {slide.title}
                    </h2>
                    <p className="mt-3 text-white/90 text-base sm:text-lg">
                      {slide.desc}
                    </p>
                    <div className="mt-6 inline-flex gap-3">
                      <Link to={slide.btnPrimary.to} className="cosmic-btn">
                        {slide.btnPrimary.text}
                      </Link>
                      <Link to={slide.btnSecondary.to} className="cosmic-btn-outline">
                        {slide.btnSecondary.text}
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default HeroBanner
