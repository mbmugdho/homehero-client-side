import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import { HousePlus, Sun, Moon } from 'lucide-react'

const topLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
    isActive
      ? 'text-[hsl(var(--p))] bg-white/90 shadow-sm'
      : 'text-white/80 hover:text-white hover:bg-white/10'
  }`

const drawerLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
    isActive
      ? 'bg-[hsl(var(--p))]/30 text-white shadow-sm'
      : 'text-white/80 hover:bg-white/10 hover:text-white'
  }`

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthed, logout, user, appUser } = useAuth()

  const [mode, setMode] = useState(
    () => localStorage.getItem('hh-mode') || 'dark'
  )
  const [glow, setGlow] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
    localStorage.setItem('hh-mode', mode)
  }, [mode])

  const toggleMode = () => {
    setGlow(true)
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
    setTimeout(() => setGlow(false), 500)
  }

  const closeDrawer = () => {
    const el = document.getElementById('navbar-drawer')
    if (el) el.checked = false
  }

  useEffect(() => {
    closeDrawer()
  }, [location.pathname])

  const handleAddServiceClick = (e) => {
    e.preventDefault()
    closeDrawer()
    if (isAuthed) {
      navigate('/dashboard/add-service')
    } else {
      navigate('/login', { state: { from: '/dashboard/add-service' } })
    }
  }

  const slideDown = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
  }

  const displayName = useMemo(() => {
    const n =
      user?.displayName ||
      appUser?.name ||
      user?.email?.split('@')?.[0] ||
      'User'
    return n
  }, [user, appUser])

  const initial = useMemo(() => {
    return (displayName?.trim()?.[0] || 'U').toUpperCase()
  }, [displayName])

  const avatarSrc = useMemo(() => {
    const p0 = user?.photoURL
    const p1 = user?.reloadUserInfo?.photoUrl
    const p2 =
      user?.providerData?.find((p) => p?.photoURL)?.photoURL ||
      user?.providerData?.[0]?.photoURL
    const p3 = appUser?.photoURL
    const p4 = user?.avatar
    const src = p0 || p1 || p2 || p3 || p4 || ''
    return src ? src.replace(/=s\d+-c$/, '=s256-c') : ''
  }, [user, appUser])

  const AvatarCircle = ({ size = 9 }) => (
    <div
      className={`w-${size} h-${size} rounded-full ring-2 ring-[hsl(var(--a))/0.7] overflow-hidden bg-gradient-to-br from-[hsl(var(--p))] to-[hsl(var(--s))] text-white grid place-items-center`}
    >
      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt={displayName || 'User avatar'}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="font-bold">{initial}</span>
      )}
    </div>
  )

  const iconVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: { rotate: 180, scale: 1.3, transition: { duration: 0.4 } },
  }

  return (
    <div className="drawer drawer-end z-50">
      <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />

      <motion.div
        className="drawer-content"
        variants={slideDown}
        initial="hidden"
        animate="visible"
      >
        <div className="navbar sticky top-0 border-b border-white/10 text-white glass-tint backdrop-blur-md shadow-[0_1px_10px_hsl(var(--p)/0.3)]">
          <div className="container-x w-full flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2.5 text-lg sm:text-xl font-extrabold tracking-tight"
            >
              <HousePlus />
              <span className="text-white font-extrabold">HomeHero</span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              aria-label="Primary"
              className="hidden md:flex items-center gap-2"
            >
              <NavLink to="/" end className={topLinkClass}>
                Home
              </NavLink>
              <NavLink to="/services" className={topLinkClass}>
                Services
              </NavLink>

              {/* Conditional Navigation based on Authintication */}
              {isAuthed ? (
                <NavLink to="/dashboard" className={topLinkClass}>
                  Dashboard
                </NavLink>
              ) : (
                <button
                  onClick={handleAddServiceClick}
                  className="px-3 py-2 rounded-lg font-medium transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
                >
                  Add Service
                </button>
              )}
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMode}
                className="relative cosmic-btn-outline text-white hidden md:grid place-items-center"
                aria-label="Toggle theme"
              >
                {glow && (
                  <span className="absolute inset-0 rounded-full bg-[hsl(var(--p))] opacity-40 blur-xl scale-150 animate-ping" />
                )}
                <motion.div
                  key={mode}
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                >
                  {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
              </button>

              {!isAuthed ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/login" className="cosmic-btn text-white">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="cosmic-btn text-white bg-gradient-to-r from-[hsl(var(--p))] to-[hsl(var(--s))]"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="hidden md:block dropdown dropdown-end">
                  <label tabIndex={0} className="cosmic-btn btn-circle avatar">
                    <AvatarCircle size={12} />
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-[hsl(var(--n))] text-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-white/10"
                  >
                    <li>
                      <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/profile">Profile</NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/bookings">My Bookings</NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/services">My Services</NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/add-service">Add Service</NavLink>
                    </li>
                    <li className="border-t border-white/10 mt-1 pt-1">
                      <button type="button" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}

              <label
                htmlFor="navbar-drawer"
                className="md:hidden btn btn-ghost text-white"
                aria-label="Open menu"
              >
                <svg
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h16M3 12h16M3 18h16" />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <div className="drawer-side z-[999]">
        <label htmlFor="navbar-drawer" className="drawer-overlay" />
        <div className="w-72 min-h-full bg-[hsl(var(--n))] text-white border-l border-white/10 p-4 space-y-3">
          <div className="flex items-center mb-3">
            <Link
              to="/"
              className="flex items-center gap-2.5 text-lg font-extrabold"
              onClick={closeDrawer}
            >
              <HousePlus />
              HomeHero
            </Link>

            <button
              onClick={toggleMode}
              className="relative btn btn-ghost btn-sm text-white ml-auto grid place-items-center"
            >
              {glow && (
                <span className="absolute inset-0 rounded-full bg-[hsl(var(--p))] opacity-40 blur-xl scale-150 animate-ping" />
              )}
              <motion.div
                key={mode}
                variants={iconVariants}
                initial="initial"
                animate="animate"
              >
                {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </button>
          </div>

          {/* User Info (when logged in) */}
          {isAuthed && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 mb-2">
              <div className="w-10 h-10">
                <AvatarCircle size={10} />
              </div>
              <div className="truncate">
                <div className="font-semibold truncate">{displayName}</div>
                <div className="text-white/70 text-sm truncate">
                  {user?.email}
                </div>
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          <ul className="menu space-y-1">
            <li>
              <NavLink
                to="/"
                end
                className={drawerLinkClass}
                onClick={closeDrawer}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={drawerLinkClass}
                onClick={closeDrawer}
              >
                Services
              </NavLink>
            </li>

            {isAuthed ? (
              <>
                {/* Authenticated Mobile Menu */}
                <li>
                  <NavLink
                    to="/dashboard"
                    className={drawerLinkClass}
                    onClick={closeDrawer}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/profile"
                    className={drawerLinkClass}
                    onClick={closeDrawer}
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/services"
                    className={drawerLinkClass}
                    onClick={closeDrawer}
                  >
                    My Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/bookings"
                    className={drawerLinkClass}
                    onClick={closeDrawer}
                  >
                    My Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/add-service"
                    className={drawerLinkClass}
                    onClick={closeDrawer}
                  >
                    Add Service
                  </NavLink>
                </li>
                <li className="mt-2 border-t border-white/10 pt-2">
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 text-red-400"
                    onClick={() => {
                      logout()
                      closeDrawer()
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Non-Authenticated Mobile Menu */}
                <li>
                  <button
                    onClick={handleAddServiceClick}
                    className="px-3 py-2 rounded-lg font-medium transition-all duration-200 text-white/80 hover:bg-white/10 hover:text-white text-left w-full"
                  >
                    Add Service
                  </button>
                </li>
                <li className="mt-2 border-t border-white/10 pt-2">
                  <NavLink
                    to="/login"
                    className="cosmic-btn text-center justify-center"
                    onClick={closeDrawer}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="cosmic-btn-outline text-center justify-center"
                    onClick={closeDrawer}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar