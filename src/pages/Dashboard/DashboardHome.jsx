import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import StatsCard from '../../components/Dashboard/StatsCard'
import { 
  BookingsBarChart, 
  CategoryPieChart, 
  RevenueLineChart 
} from '../../components/Dashboard/DashboardCharts'
import { 
  CalendarCheck, 
  CheckCircle2, 
  Clock, 
  Wrench,
  DollarSign,
  TrendingUp,
  ArrowRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import { PageTitle } from '../../usePageTitle'

const DashboardHome = () => {
  const { user, appUser, userBookings = [], providerServices = [] } = useAuth()

  const displayName = user?.displayName || appUser?.name || user?.email?.split('@')[0] || 'User'

  const stats = useMemo(() => {
    const total = userBookings.length
    const completed = userBookings.filter(b => b.status === 'finished').length
    const ongoing = userBookings.filter(b => b.status === 'ongoing').length
    const totalSpent = userBookings.reduce((sum, b) => sum + (b.price || b.hourly_rate || 0), 0)

    return { total, completed, ongoing, totalSpent, services: providerServices.length }
  }, [userBookings, providerServices])

  const bookingsChartData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map((name, idx) => ({
      name,
      bookings: Math.max(1, Math.floor(userBookings.length / 6) + (idx % 3))
    }))
  }, [userBookings])

  const categoryData = useMemo(() => {
    const categories = {}
    userBookings.forEach(b => {
      const cat = b.category || 'Other'
      categories[cat] = (categories[cat] || 0) + 1
    })
    return Object.entries(categories).map(([name, value]) => ({ name, value }))
  }, [userBookings])

  const spendingData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    const baseAmount = stats.totalSpent / 6
    return months.map((name, idx) => ({
      name,
      amount: Math.floor(baseAmount * (0.7 + Math.random() * 0.6))
    }))
  }, [stats.totalSpent])

  const recentBookings = useMemo(() => {
    return [...userBookings]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
  }, [userBookings])

  return (
    <>
      <PageTitle title="Dashboard" description="Manage your HomeHero bookings and services" />
      
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back, <span className="text-cosmic">{displayName}</span>! 👋
          </h1>
          <p className="text-white/60 mt-1">
            Here's what's happening with your account today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatsCard
            title="Total Bookings"
            value={stats.total}
            icon={<CalendarCheck size={24} />}
            color="primary"
            trend="up"
            trendValue="12%"
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            icon={<CheckCircle2 size={24} />}
            color="success"
          />
          <StatsCard
            title="Ongoing"
            value={stats.ongoing}
            icon={<Clock size={24} />}
            color="warning"
          />
          <StatsCard
            title="Total Spent"
            value={`$${stats.totalSpent}`}
            icon={<DollarSign size={24} />}
            color="info"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BookingsBarChart data={bookingsChartData} />
          <CategoryPieChart 
            data={categoryData.length > 0 ? categoryData : [
              { name: 'Cleaning', value: 4 },
              { name: 'Plumbing', value: 3 },
              { name: 'Electrical', value: 2 },
              { name: 'Other', value: 1 },
            ]} 
          />
        </div>

        <RevenueLineChart data={spendingData} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h3 className="text-white font-bold text-lg">Recent Bookings</h3>
            <Link 
              to="/dashboard/bookings" 
              className="flex items-center gap-1 text-[hsl(var(--a))] hover:text-[hsl(var(--p))] transition-colors text-sm font-medium"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-white/60">No bookings yet.</p>
              <Link to="/services" className="cosmic-btn mt-4 inline-flex">
                Browse Services
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Service</th>
                    <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Category</th>
                    <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Date</th>
                    <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Price</th>
                    <th className="text-left text-white/60 text-sm font-medium px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking, idx) => (
                    <tr 
                      key={booking._id || idx} 
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={booking.image || '/placeholder.jpg'} 
                            alt="" 
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="text-white font-medium truncate max-w-[200px]">
                            {booking.title || 'Service'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white/70">{booking.category || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white/70">
                          {booking.bookingDate 
                            ? new Date(booking.bookingDate).toLocaleDateString() 
                            : 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold">
                          ${booking.price || booking.hourly_rate || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === 'finished' 
                            ? 'bg-green-500/20 text-green-400'
                            : booking.status === 'ongoing'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {booking.status || 'pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <Link
            to="/services"
            className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--p))] to-[hsl(var(--s))] flex items-center justify-center">
              <TrendingUp size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">Browse Services</p>
              <p className="text-white/50 text-sm">Find new services</p>
            </div>
            <ArrowRight size={20} className="text-white/30 ml-auto group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/dashboard/add-service"
            className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Wrench size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">Add Service</p>
              <p className="text-white/50 text-sm">Offer your skills</p>
            </div>
            <ArrowRight size={20} className="text-white/30 ml-auto group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/dashboard/profile"
            className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
              <CheckCircle2 size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">Update Profile</p>
              <p className="text-white/50 text-sm">Edit your info</p>
            </div>
            <ArrowRight size={20} className="text-white/30 ml-auto group-hover:text-white/70 group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>
      </div>
    </>
  )
}

export default DashboardHome