import { useAuth } from '../../context/AuthContext'

const MyServices = () => {
  const { userBookings, finishService } = useAuth()

  const ongoing = userBookings.filter((b) => b.status === 'ongoing')
  const finished = userBookings.filter((b) => b.status === 'finished')

  return (
    <section className="container-x py-12">
      <h1 className="text-3xl font-bold text-white mb-6">My Services</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-white">
          <div className="text-sm text-white/80">Ongoing</div>
          <div className="text-3xl font-extrabold">{ongoing.length}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-white">
          <div className="text-sm text-white/80">Finished</div>
          <div className="text-3xl font-extrabold">{finished.length}</div>
        </div>
      </div>

      {!userBookings.length ? (
        <p className="text-white">
          You have no ongoing or finished services yet.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {userBookings.map((svc) => (
            <div
              key={svc._id || svc.id}
              className="card bg-white/10 border border-white/15 text-white shadow-xl"
            >
              <img
                src={svc.image}
                alt={svc.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">{svc.title}</h2>
                  <span className="badge cosmic-badge text-white">
                    {svc.status || 'ongoing'}
                  </span>
                </div>
                <p className="text-white/80 text-sm mt-1">{svc.description}</p>

                {svc.status === 'ongoing' && (
                  <button
                    onClick={() => finishService(svc._id || svc.id)}
                    className="cosmic-btn mt-3 w-full"
                  >
                    Finish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default MyServices
