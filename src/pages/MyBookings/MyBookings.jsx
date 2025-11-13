import { useAuth } from '../../context/AuthContext'

const MyBookings = () => {
  const { userBookings = [] } = useAuth()

  return (
    <section className="container-x py-12">
      <h1 className="text-3xl font-bold text-white mb-6">My Bookings</h1>

      {userBookings.length === 0 ? (
        <p className="text-white">No bookings yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {userBookings.map((b) => (
            <div
              key={b._id || b.id}
              className="card bg-white/10 border border-white/15 text-white shadow-xl"
            >
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-44 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">{b.title}</h2>
                  <span className="badge cosmic-badge text-white">
                    {b.status || 'pending'}
                  </span>
                </div>
                <div className="text-white/80 text-sm mt-1">{b.location}</div>
                <div className="text-white/80 text-sm mt-1">
                  ${b.hourly_rate}/hr • {b.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default MyBookings
