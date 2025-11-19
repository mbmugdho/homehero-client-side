import { HousePlus } from 'lucide-react'
import { FaXTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="text-slate-100">
      <div className="glass-tint border-t border-white/10 py-8">
        <div className="container-x flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-2 text-white font-extrabold">
            <HousePlus />
            HomeHero
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="btn btn-ghost btn-sm text-white border-white/20 hover:bg-white/10"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="btn btn-ghost btn-sm text-white border-white/20 hover:bg-white/10"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="btn btn-ghost btn-sm text-white border-white/20 hover:bg-white/10"
            >
              <FaFacebookF />
            </a>
          </div>

          <div className="w-full text-center text-xs text-white/60">
            © {new Date().getFullYear()} HomeHero. All rights reserved.
            <br />
            <p>
              Created by: <i>MUGDHO</i>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
