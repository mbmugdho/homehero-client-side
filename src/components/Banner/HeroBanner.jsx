import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import imgPlumbing from '../../assets/hero-plumbing.jpg'
import imgElectrical from '../../assets/hero-electrical.jpg'
import imgCleaning from '../../assets/hero-cleaning.jpg'

const HeroBanner = () => {
  return (
    <section className="container-x py-10">
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden rounded-2xl border border-white/10 shadow-xl">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop
          speed={700}
          pagination={{ clickable: true }}
          className="h-full"
        >
          <SwiperSlide aria-label="Plumbing Pros On-Demand">
            <div className="relative w-full h-full">
              <img
                src={imgPlumbing}
                alt="Plumber fixing a sink"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6A1B9A]/70 via-[#C05DB9]/40 to-transparent mix-blend-multiply" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#140022]/70 via-transparent to-transparent mix-blend-multiply" />

              <div className="relative z-10 h-full flex items-center justify-end">
                <div className="text-right max-w-lg mr-4 sm:mr-8 md:mr-12">
                  <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-white drop-shadow-md">
                    Plumbing Pros On-Demand
                  </h2>
                  <p className="mt-3 text-white/90 text-base sm:text-lg">
                    Fix leaks fast with vetted plumbers available near you.
                  </p>
                  <div className="mt-6 inline-flex gap-3">
                    <Link to="/services?cat=Plumbing" className="cosmic-btn">
                      Find Plumbers
                    </Link>
                    <Link to="/services" className="cosmic-btn-outline">
                      All Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide aria-label="Safe, Smart Electrical Upgrades">
            <div className="relative w-full h-full">
              <img
                src={imgElectrical}
                alt="Electrician working on a panel"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6A1B9A]/70 via-[#C05DB9]/40 to-transparent mix-blend-multiply" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#140022]/70 via-transparent to-transparent mix-blend-multiply" />

              <div className="relative z-10 h-full flex items-center justify-end">
                <div className="text-right max-w-lg mr-4 sm:mr-8 md:mr-12">
                  <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-white drop-shadow-md">
                    Safe, Smart Electrical Upgrades
                  </h2>
                  <p className="mt-3 text-white/90 text-base sm:text-lg">
                    Certified electricians for wiring, lighting, and smart homes.
                  </p>
                  <div className="mt-6 inline-flex gap-3">
                    <Link to="/services?cat=Electrical" className="cosmic-btn">
                      Hire Electricians
                    </Link>
                    <Link to="/services" className="cosmic-btn-outline">
                      See More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide aria-label="Spotless Homes, Happy You">
            <div className="relative w-full h-full">
              <img
                src={imgCleaning}
                alt="Cleaner wiping a counter"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6A1B9A]/70 via-[#C05DB9]/40 to-transparent mix-blend-multiply" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#140022]/70 via-transparent to-transparent mix-blend-multiply" />

              <div className="relative z-10 h-full flex items-center justify-end">
                <div className="text-right max-w-lg mr-4 sm:mr-8 md:mr-12">
                  <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-white drop-shadow-md">
                    Spotless Homes, Happy You
                  </h2>
                  <p className="mt-3 text-white/90 text-base sm:text-lg">
                    Book trusted cleaners with transparent pricing.
                  </p>
                  <div className="mt-6 inline-flex gap-3">
                    <Link to="/services?cat=Cleaning" className="cosmic-btn">
                      Book Cleaning
                    </Link>
                    <Link to="/services" className="cosmic-btn-outline">
                      Browse All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}

export default HeroBanner
