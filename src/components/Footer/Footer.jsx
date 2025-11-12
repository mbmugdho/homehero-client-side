const Footer = () => {
  return (
    <footer className="text-slate-100">
      <div className="glass-tint border-t border-white/10 py-8">
        <div className="container-x flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-2 text-white font-extrabold">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z" />
            </svg>
            HomeHero
          </div>

          <div className="flex items-center gap-2">
            <a href="#" aria-label="Twitter" className="btn btn-ghost btn-sm text-white border-white/20 hover:bg-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.2 1.7-2.1-.8.5-1.7.9-2.6 1.1A3.9 3.9 0 0 0 12 8.7c0 .3 0 .6.1.9-3.2-.2-6-1.7-7.9-4.1-.4.7-.6 1.4-.6 2.2 0 1.5.8 2.9 2 3.6-.7 0-1.3-.2-1.9-.5v.1c0 2.1 1.6 3.8 3.6 4.2-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 1.8 2.3 3.1 4.3 3.2A7.8 7.8 0 0 1 2 19.5a11 11 0 0 0 6 1.8c7.2 0 11.2-6 11.2-11.2v-.5c.8-.6 1.5-1.3 2-2.1Z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="btn btn-ghost btn-sm text-white border-white/20 hover:bg-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5zm6-1.9a1.1 1.1 0 1 0 1.1 1.1A1.1 1.1 0 0 0 18 5.6Z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="btn btn-ghost btn-sm text-white border-white/20 hover:bg-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7.5c0-1.2.3-2 2-2h2V2.1C16.6 2 15.2 2 14 2c-3 0-5 1.8-5 5.1V10H6v4h3v8h4Z"/></svg>
            </a>
          </div>


          <div className="w-full text-center text-xs text-white/60">
            © {new Date().getFullYear()} HomeHero. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;