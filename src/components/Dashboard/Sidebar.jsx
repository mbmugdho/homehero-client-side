import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Wrench, 
  UserCircle, 
  PlusCircle,
  Settings,
  HelpCircle,
  X
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { user, appUser } = useAuth()

  const menuItems = [
    {
      label: 'Overview',
      to: '/dashboard',
      icon: <LayoutDashboard size={20} />,
      end: true,
    },
    {
      label: 'My Bookings',
      to: '/dashboard/bookings',
      icon: <CalendarCheck size={20} />,
    },
    {
      label: 'My Services',
      to: '/dashboard/services',
      icon: <Wrench size={20} />,
    },
    {
      label: 'Add Service',
      to: '/dashboard/add-service',
      icon: <PlusCircle size={20} />,
    },
    {
      label: 'Profile',
      to: '/dashboard/profile',
      icon: <UserCircle size={20} />,
    },
  ]

  const bottomItems = [
    {
      label: 'Help & Support',
      to: '/contact',
      icon: <HelpCircle size={20} />,
    },
  ]

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-[hsl(var(--p))] to-[hsl(var(--s))] text-white shadow-lg'
        : 'text-white/70 hover:bg-white/10 hover:text-white'
    }`

  const displayName = user?.displayName || appUser?.name || user?.email?.split('@')[0] || 'User'
  const avatarSrc = user?.photoURL || appUser?.photoURL || ''
  const initial = (displayName?.[0] || 'U').toUpperCase()

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[hsl(var(--n))] border-r border-white/10 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full ring-2 ring-[hsl(var(--a))]/50 overflow-hidden bg-gradient-to-br from-[hsl(var(--p))] to-[hsl(var(--s))] flex items-center justify-center">
                  {avatarSrc ? (
                    <img src={avatarSrc} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-lg">{initial}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{displayName}</p>
                  <p className="text-white/50 text-xs truncate">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden p-2 text-white/70 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-wider px-4 mb-3">
              Main Menu
            </p>
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
                onClick={onClose}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
            {bottomItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={onClose}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar