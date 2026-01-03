import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How do I book a service?',
    answer:
      'Simply browse our services, select the one you need, choose your preferred date and time, and confirm your booking. You can pay securely online or after the service is completed.',
  },
  {
    question: 'Are all service providers verified?',
    answer:
      'Yes! Every professional on HomeHero goes through a rigorous background check, skill verification, and interview process before being approved to offer services on our platform.',
  },
  {
    question: 'What if I need to cancel or reschedule?',
    answer:
      'You can cancel or reschedule your booking up to 24 hours before the scheduled time at no extra cost. Just go to "My Bookings" and manage your appointments.',
  },
  {
    question: 'How is pricing determined?',
    answer:
      'Pricing is set by individual service providers based on the type of service, duration, and complexity. All prices are displayed upfront with no hidden fees.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We currently operate in major cities across Bangladesh including Dhaka, Chittagong, Sylhet, Khulna, and Gazipur. We are rapidly expanding to new locations.',
  },
  {
    question: 'Is there a satisfaction guarantee?',
    answer:
      'Absolutely! If you are not satisfied with the service, contact our support team within 24 hours and we will arrange a re-service or provide a refund.',
  },
]

const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-white font-semibold pr-4 group-hover:text-[hsl(var(--a))] transition-colors">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-white/60"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-white/70 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

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
          Frequently Asked Questions
        </h2>
        <p className="text-white/80 mt-3 max-w-2xl mx-auto">
          Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-3xl mx-auto bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-8"
      >
        {faqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            faq={faq}
            isOpen={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
          />
        ))}
      </motion.div>
    </section>
  )
}

export default FAQ