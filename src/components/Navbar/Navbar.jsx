import { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'

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
  const { isAuthed, logout, user } = useAuth?.() || { isAuthed: false }

  const closeDrawer = () => {
    const el = document.getElementById('navbar-drawer')
    if (el) el.checked = false
  }

  useEffect(() => {
    closeDrawer()
  }, [location.pathname])

  const slideDown = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
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
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[hsl(var(--p))] to-[hsl(var(--s))] shadow-md">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.2"
                >
                  <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z" />
                </svg>
              </div>
              <span className="text-white font-extrabold">HomeHero</span>
            </Link>

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
              <NavLink to="/provider/add-service" className={topLinkClass}>
                Add Service
              </NavLink>
              {isAuthed && (
                <>
                  <NavLink to="/my-services" className={topLinkClass}>
                    My Services
                  </NavLink>
                  <NavLink to="/my-bookings" className={topLinkClass}>
                    My Bookings
                  </NavLink>
                </>
              )}
            </nav>

            <div className="flex items-center gap-2">
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
                    <div className="w-9 rounded-full ring-2 ring-[hsl(var(--a))/0.7]">
                      <img
                        alt="User avatar"
                        src={user?.avatar || 'https://i.pravatar.cc/72?img=32'}
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-[hsl(var(--n))] text-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-white/10"
                  >
                    <li>
                      <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li>
                      <NavLink to="/my-bookings">My Bookings</NavLink>
                    </li>
                    <li>
                      <NavLink to="/my-services">My Services</NavLink>
                    </li>
                    <li>
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

      <div className="drawer-side z-[999]">
        <label htmlFor="navbar-drawer" className="drawer-overlay" />
        <div className="w-72 min-h-full bg-[hsl(var(--n))] text-white border-l border-white/10 p-4 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-lg font-extrabold mb-3"
            onClick={closeDrawer}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[hsl(var(--p))] to-[hsl(var(--s))] shadow-md">
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="white"
                strokeWidth="2.2"
              >
                <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z" />
              </svg>
            </div>
            HomeHero
          </Link>

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
            <li>
              <NavLink
                to="/provider/add-service"
                className={drawerLinkClass}
                onClick={closeDrawer}
              >
                Add Service
              </NavLink>
            </li>

            {isAuthed ? (
              <>
                <li>
                  <NavLink
                    to="/my-services"
                    className={drawerLinkClass}
                    onClick={closeDrawer}
                  >
                    My Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-bookings"
                    className={drawerLinkClass}
                    onClick={closeDrawer}
                  >
                    My Bookings
                  </NavLink>
                </li>
                <li className="mt-2 border-t border-white/10" />
                <li>
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 cosmic-btn"
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
                <li className="mt-2 border-t border-white/10" />
                <li>
                  <NavLink
                    to="/login"
                    className={`${drawerLinkClass} cosmic-btn`}
                    onClick={closeDrawer}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className={`${drawerLinkClass} cosmic-btn`}
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
