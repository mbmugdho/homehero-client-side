import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  CheckCircle
} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'
import Swal from 'sweetalert2'
import { PageTitle } from '../../usePageTitle'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const contactInfo = [
  {
    icon: <MapPin size={24} />,
    title: 'Visit Us',
    details: ['123 Service Street', 'Dhaka 1205, Bangladesh'],
  },
  {
    icon: <Phone size={24} />,
    title: 'Call Us',
    details: ['+880 1700-000000', '+880 1800-000000'],
  },
  {
    icon: <Mail size={24} />,
    title: 'Email Us',
    details: ['support@homehero.com', 'info@homehero.com'],
  },
  {
    icon: <Clock size={24} />,
    title: 'Working Hours',
    details: ['Mon - Fri: 9AM - 6PM', 'Sat: 10AM - 4PM'],
  },
]

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setLoading(false)
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })

    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'We\'ll get back to you within 24 hours.',
      confirmButtonColor: '#8C2FA3',
      background: '#1b0b28',
      color: '#fff',
    })

    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <PageTitle title="Contact Us" description="Get in touch with HomeHero support team" />
      
      <div className="space-y-0">
        <section className="container-x py-16">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[hsl(var(--p))]/20 text-[hsl(var(--a))] text-sm font-semibold mb-4">
              Contact Us
            </span>
            <h1 className="text-cosmic text-4xl sm:text-5xl font-extrabold leading-tight">
              We'd Love to Hear From You
            </h1>
            <p className="text-white/80 text-lg mt-6">
              Have questions, feedback, or need assistance? Our team is here to help you 24/7.
            </p>
          </motion.div>
        </section>

        <section className="container-x py-8">
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-[hsl(var(--p))]/20 flex items-center justify-center text-[hsl(var(--a))] mb-4">
                  {info.icon}
                </div>
                <h3 className="text-white font-bold mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-white/60 text-sm">{detail}</p>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="container-x py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[hsl(var(--p))]/20 flex items-center justify-center text-[hsl(var(--a))]">
                  <MessageSquare size={20} />
                </div>
                <h2 className="text-white text-2xl font-bold">Send a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Your Name *</label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input input-bordered w-full bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[hsl(var(--p))]"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="input input-bordered w-full bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[hsl(var(--p))]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Subject *</label>
                  <input
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="input input-bordered w-full bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[hsl(var(--p))]"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-2">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    className="textarea textarea-bordered w-full bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[hsl(var(--p))] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || submitted}
                  className="cosmic-btn w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : submitted ? (
                    <>
                      <CheckCircle size={18} />
                      Sent Successfully
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="space-y-8"
            >
              {/* Map  */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692693!2d90.27923991057026!3d23.780573258035968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1699900000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HomeHero Location"
                />
              </div>

              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4">Connect With Us</h3>
                <p className="text-white/60 text-sm mb-5">
                  Follow us on social media for updates, tips, and special offers.
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: <FaFacebookF />, href: 'https://facebook.com', color: 'hover:bg-blue-600' },
                    { icon: <FaInstagram />, href: 'https://instagram.com', color: 'hover:bg-pink-600' },
                    { icon: <FaXTwitter />, href: 'https://x.com', color: 'hover:bg-gray-700' },
                    { icon: <FaLinkedinIn />, href: 'https://linkedin.com', color: 'hover:bg-blue-700' },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white transition-all duration-300 ${social.color}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-[hsl(var(--p))]/20 to-[hsl(var(--s))]/20 backdrop-blur border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-2">Have Common Questions?</h3>
                <p className="text-white/60 text-sm mb-4">
                  Check out our FAQ section for quick answers to frequently asked questions.
                </p>
                <a href="/#faq" className="cosmic-btn-outline inline-flex text-sm">
                  View FAQ
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact