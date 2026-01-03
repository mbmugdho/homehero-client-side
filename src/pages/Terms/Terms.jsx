import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Shield, ChevronDown } from 'lucide-react'
import { PageTitle } from '../../usePageTitle'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const termsContent = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing and using HomeHero's services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.`,
  },
  {
    title: 'Use of Services',
    content: `HomeHero provides a platform connecting homeowners with service professionals. You agree to use our services only for lawful purposes and in accordance with these terms. You must be at least 18 years old to use our services.`,
  },
  {
    title: 'User Accounts',
    content: `You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to terminate accounts that violate our terms.`,
  },
  {
    title: 'Service Provider Terms',
    content: `Service providers on our platform are independent contractors, not employees of HomeHero. We verify credentials but do not guarantee the quality of work. Disputes between users and providers should be resolved directly.`,
  },
  {
    title: 'Payment Terms',
    content: `Payments are processed securely through our platform. Prices are set by service providers and displayed before booking. Cancellation policies vary by service provider. Refunds are handled on a case-by-case basis.`,
  },
  {
    title: 'Limitation of Liability',
    content: `HomeHero is not liable for any damages arising from the use of our services. We provide the platform "as is" without warranties of any kind. Our liability is limited to the amount paid for the specific service.`,
  },
  {
    title: 'Privacy Policy',
    content: `We collect and use personal information as described in our Privacy Policy. By using our services, you consent to our data practices. We do not sell your personal information to third parties.`,
  },
  {
    title: 'Changes to Terms',
    content: `We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.`,
  },
]

const privacyContent = [
  {
    title: 'Information We Collect',
    content: `We collect information you provide directly, such as name, email, phone number, and address. We also collect usage data, device information, and cookies to improve our services.`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use your information to provide and improve services, process transactions, send notifications, and personalize your experience. We may use data for analytics and marketing purposes.`,
  },
  {
    title: 'Information Sharing',
    content: `We share information with service providers to facilitate bookings. We may share data with third-party services for payment processing and analytics. We do not sell your personal data.`,
  },
  {
    title: 'Data Security',
    content: `We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure. You are responsible for maintaining the security of your account.`,
  },
  {
    title: 'Your Rights',
    content: `You have the right to access, update, or delete your personal information. You can opt out of marketing communications at any time. Contact us to exercise your data rights.`,
  },
]

const AccordionItem = ({ item, isOpen, onClick }) => (
  <div className="border-b border-white/10 last:border-b-0">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-4 text-left"
    >
      <span className="text-white font-semibold pr-4">{item.title}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-white/60 flex-shrink-0"
      >
        <ChevronDown size={20} />
      </motion.span>
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <p className="pb-4 text-white/70 leading-relaxed">{item.content}</p>
    </motion.div>
  </div>
)

const Terms = () => {
  const [activeTab, setActiveTab] = useState('terms')
  const [openIndex, setOpenIndex] = useState(0)

  const content = activeTab === 'terms' ? termsContent : privacyContent

  return (
    <>
      <PageTitle 
        title={activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'} 
        description="Read HomeHero's terms of service and privacy policy" 
      />
      
      <div className="space-y-0">
        {/* Hero */}
        <section className="container-x py-16">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[hsl(var(--p))] to-[hsl(var(--s))] flex items-center justify-center mb-6">
              {activeTab === 'terms' ? (
                <FileText size={32} className="text-white" />
              ) : (
                <Shield size={32} className="text-white" />
              )}
            </div>
            <h1 className="text-cosmic text-4xl sm:text-5xl font-extrabold leading-tight">
              {activeTab === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
            </h1>
            <p className="text-white/80 text-lg mt-6">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>
        </section>

        {/* Tab Switch */}
        <section className="container-x py-4">
          <motion.div
            className="flex justify-center"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className="inline-flex bg-white/5 border border-white/10 rounded-full p-1">
              <button
                onClick={() => {
                  setActiveTab('terms')
                  setOpenIndex(0)
                }}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeTab === 'terms'
                    ? 'bg-gradient-to-r from-[hsl(var(--p))] to-[hsl(var(--s))] text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Terms of Service
              </button>
              <button
                onClick={() => {
                  setActiveTab('privacy')
                  setOpenIndex(0)
                }}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeTab === 'privacy'
                    ? 'bg-gradient-to-r from-[hsl(var(--p))] to-[hsl(var(--s))] text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Privacy Policy
              </button>
            </div>
          </motion.div>
        </section>

        {/* Content */}
        <section className="container-x py-12 pb-16">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-8"
          >
            {content.map((item, idx) => (
              <AccordionItem
                key={idx}
                item={item}
                isOpen={openIndex === idx}
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              />
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="max-w-3xl mx-auto mt-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-white/60 text-sm">
              Have questions about our policies?{' '}
              <a href="/contact" className="text-[hsl(var(--a))] hover:underline">
                Contact our support team
              </a>
            </p>
          </motion.div>
        </section>
      </div>
    </>
  )
}

export default Terms