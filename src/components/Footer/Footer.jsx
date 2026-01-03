import { Link } from 'react-router-dom'
import { HousePlus, Mail, Phone, MapPin } from 'lucide-react'
import {
  FaXTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from 'react-icons/fa6'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', to: '/' },
    { name: 'Services', to: '/services' },
    { name: 'About Us', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ]

  const serviceLinks = [
    { name: 'Cleaning', to: '/services?category=Cleaning' },
    { name: 'Plumbing', to: '/services?category=Plumbing' },
    { name: 'Electrical', to: '/services?category=Electrical' },
    { name: 'Painting', to: '/services?category=Painting' },
  ]

  const supportLinks = [
    { name: 'FAQ', to: '/#faq' },
    { name: 'Terms of Service', to: '/terms' },
    { name: 'Privacy Policy', to: '/privacy' },
    { name: 'Become a Provider', to: '/register' },
  ]

  const socialLinks = [
    { icon: <FaFacebookF />, href: 'https://facebook.com', label: 'Facebook' },
    {
      icon: <FaInstagram />,
      href: 'https://instagram.com',
      label: 'Instagram',
    },
    { icon: <FaXTwitter />, href: 'https://x.com', label: 'Twitter' },
    { icon: <FaLinkedinIn />, href: 'https://linkedin.com', label: 'LinkedIn' },
  ]

  return (
    <footer className="text-slate-100 mt-auto">
      <div className="glass-tint border-t border-white/10">
        <div className="container-x py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <Link
                to="/"
                className="flex items-center gap-2 text-white font-extrabold text-xl mb-4"
              >
                <HousePlus size={28} />
                <span>HomeHero</span>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Your trusted platform for finding verified home service
                professionals. Quality service, transparent pricing, and
                satisfaction guaranteed.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[hsl(var(--p))] transition-colors duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.to}
                      className="text-white/70 hover:text-[hsl(var(--a))] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Popular Services</h4>
              <ul className="space-y-2">
                {serviceLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.to}
                      className="text-white/70 hover:text-[hsl(var(--a))] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <MapPin
                    size={18}
                    className="text-[hsl(var(--a))] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-white/70">
                    123 Service Street, Dhaka 1205, Bangladesh
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone
                    size={18}
                    className="text-[hsl(var(--a))] flex-shrink-0"
                  />
                  <a
                    href="tel:+8801700000000"
                    className="text-white/70 hover:text-[hsl(var(--a))] transition-colors"
                  >
                    +880 1700-000000
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Mail
                    size={18}
                    className="text-[hsl(var(--a))] flex-shrink-0"
                  />
                  <a
                    href="mailto:support@homehero.com"
                    className="text-white/70 hover:text-[hsl(var(--a))] transition-colors"
                  >
                    support@homehero.com
                  </a>
                </li>
              </ul>

              <div className="mt-6">
                <h5 className="text-white font-semibold text-sm mb-2">
                  Support
                </h5>
                <ul className="space-y-1">
                  {supportLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.to}
                        className="text-white/60 hover:text-[hsl(var(--a))] transition-colors text-xs"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="container-x py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
            <p className="text-white/60 text-xs">
              © {currentYear} HomeHero. All rights reserved.
            </p>
            <p className="text-white/50 text-xs">
              Crafted with ❤️ by{' '}
              <span className="text-[hsl(var(--a))]">MUGDHO</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
