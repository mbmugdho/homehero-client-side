import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Shield,
  Users,
  Award,
  Heart,
  Target,
  Lightbulb,
  ArrowRight,
} from 'lucide-react'
import { PageTitle } from '../../usePageTitle'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const values = [
  {
    icon: <Shield size={28} />,
    title: 'Trust & Safety',
    desc: 'Every service provider is thoroughly vetted and verified for your peace of mind.',
  },
  {
    icon: <Users size={28} />,
    title: 'Community First',
    desc: 'We connect local professionals with homeowners, strengthening communities.',
  },
  {
    icon: <Award size={28} />,
    title: 'Quality Assured',
    desc: 'We maintain high standards and only work with the best professionals.',
  },
  {
    icon: <Heart size={28} />,
    title: 'Customer Love',
    desc: 'Your satisfaction is our priority. We go above and beyond to help.',
  },
]

const team = [
  {
    name: 'Md Montasir Billah',
    role: 'CEO & Founder',
    image:
      'https://ik.imagekit.io/azfnpskmy/profile.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Emily Davis',
    role: 'Head of Operations',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'David Wilson',
    role: 'Lead Developer',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  },
]

const About = () => {
  return (
    <>
      <PageTitle
        title="About Us"
        description="Learn about HomeHero's mission to connect homeowners with trusted service professionals"
      />

      <div className="space-y-0">
        <section className="container-x py-16">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[hsl(var(--p))]/20 text-[hsl(var(--a))] text-sm font-semibold mb-4">
              About HomeHero
            </span>
            <h1 className="text-cosmic text-4xl sm:text-5xl font-extrabold leading-tight">
              Making Home Services <br />
              Simple & Reliable
            </h1>
            <p className="text-white/80 text-lg mt-6 leading-relaxed">
              Founded in 2024, HomeHero is on a mission to transform how
              homeowners find and book trusted service professionals. We believe
              everyone deserves a safe, clean, and well-maintained home.
            </p>
          </motion.div>
        </section>

        <section className="container-x py-12">
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              variants={fadeUp}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(var(--p))] to-[hsl(var(--s))] flex items-center justify-center mb-5">
                <Target size={28} className="text-white" />
              </div>
              <h2 className="text-white text-2xl font-bold mb-3">
                Our Mission
              </h2>
              <p className="text-white/70 leading-relaxed">
                To connect homeowners with verified, skilled professionals who
                deliver exceptional service. We aim to make home maintenance
                stress-free, transparent, and accessible to everyone.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(var(--s))] to-[hsl(var(--a))] flex items-center justify-center mb-5">
                <Lightbulb size={28} className="text-white" />
              </div>
              <h2 className="text-white text-2xl font-bold mb-3">Our Vision</h2>
              <p className="text-white/70 leading-relaxed">
                To become the most trusted home services platform, where every
                homeowner can find reliable help with just a few clicks, and
                every skilled professional can grow their business.
              </p>
            </motion.div>
          </motion.div>
        </section>

        <section className="container-x py-12">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h2 className="text-cosmic text-3xl sm:text-4xl font-extrabold">
              Our Core Values
            </h2>
            <p className="text-white/70 mt-3 max-w-xl mx-auto">
              These principles guide everything we do at HomeHero.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-[hsl(var(--p))]/20 flex items-center justify-center text-[hsl(var(--a))] mb-4">
                  {value.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-white/60 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="container-x py-12">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h2 className="text-cosmic text-3xl sm:text-4xl font-extrabold">
              Meet Our Team
            </h2>
            <p className="text-white/70 mt-3 max-w-xl mx-auto">
              The passionate people behind HomeHero working to make your life
              easier.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-[hsl(var(--p))]/30 mb-4 group-hover:ring-[hsl(var(--a))]/50 transition-all">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white font-bold text-lg">{member.name}</h3>
                <p className="text-[hsl(var(--a))] text-sm">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="container-x py-12">
          <motion.div
            className="bg-gradient-to-r from-[hsl(var(--p))]/20 via-[hsl(var(--s))]/10 to-[hsl(var(--p))]/20 backdrop-blur border border-white/10 rounded-3xl p-8 md:p-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '5,000+', label: 'Services Completed' },
                { value: '2,500+', label: 'Happy Customers' },
                { value: '500+', label: 'Verified Providers' },
                { value: '50+', label: 'Cities Covered' },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="container-x py-12 pb-16">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">
              Ready to experience the HomeHero difference?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/services"
                className="cosmic-btn inline-flex items-center gap-2"
              >
                Explore Services
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="cosmic-btn-outline">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  )
}

export default About
