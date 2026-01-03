import { useState } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Dashboard/Sidebar'
import {
  Menu,
  Bell,
  Search,
  HousePlus,
  LogOut,
  User,
  Settings,
  Sun,
  Moon,
} from 'lucide-react'
import { useEffect } from 'react'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, appUser, logout } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState(
    () => localStorage.getItem('hh-mode') || 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', mode)
    localStorage.setItem('hh-mode', mode)
  }, [mode])

  const toggleMode = () =>
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))

  const displayName =
    user?.displayName || appUser?.name || user?.email?.split('@')[0] || 'User'
  const avatarSrc = user?.photoURL || appUser?.photoURL || ''
  const initial = (displayName?.[0] || 'U').toUpperCase()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-[hsl(var(--n))]/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                <Menu size={24} />
              </button>

              <Link
                to="/"
                className="flex items-center gap-2 text-white font-bold"
              >
                <HousePlus size={24} className="text-[hsl(var(--a))]" />
                <span className="hidden sm:inline">HomeHero</span>
              </Link>
            </div>

            {/* Center - Search (hidden on mobile) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[hsl(var(--p))] transition-colors"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleMode}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[hsl(var(--p))] rounded-full" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 p-1.5 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <div className="w-9 h-9 rounded-full ring-2 ring-[hsl(var(--a))]/50 overflow-hidden bg-gradient-to-br from-[hsl(var(--p))] to-[hsl(var(--s))] flex items-center justify-center">
                    {avatarSrc ? (
                      <img
                        src={avatarSrc}
                        alt={displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-sm">
                        {initial}
                      </span>
                    )}
                  </div>
                  <span className="hidden lg:block text-white/80 text-sm font-medium">
                    {displayName}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-[hsl(var(--n))] border border-white/10 rounded-xl shadow-xl z-50 py-2">
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-white font-semibold truncate">
                          {displayName}
                        </p>
                        <p className="text-white/50 text-xs truncate">
                          {user?.email}
                        </p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/dashboard/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <User size={18} />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          <Settings size={18} />
                          <span>Dashboard</span>
                        </Link>
                      </div>
                      <div className="border-t border-white/10 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 w-full text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut size={18} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
