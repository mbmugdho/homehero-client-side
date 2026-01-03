import { motion } from 'framer-motion'

const StatsCard = ({ title, value, icon, color = 'primary', trend, trendValue }) => {
  const colorClasses = {
    primary: 'from-[hsl(var(--p))] to-[hsl(var(--s))]',
    success: 'from-green-500 to-emerald-600',
    warning: 'from-amber-500 to-orange-600',
    info: 'from-blue-500 to-cyan-600',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/60 text-sm font-medium">{title}</p>
          <p className="text-white text-3xl font-bold mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 flex items-center gap-1 ${
              trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
              <span className="text-white/50">vs last month</span>
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard