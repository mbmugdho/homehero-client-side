import { useAuth } from '../../context/AuthContext'

const MyServices = () => {
  const {
    userServices = [],
    finishService,
    ongoingCount = 0,
    finishedCount = 0,
  } = useAuth()

  return (
    <section className="container-x py-12">
      <h1 className="text-3xl font-bold text-white mb-6">My Services</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-white">
          <div className="text-sm text-white/80">Ongoing</div>
          <div className="text-3xl font-extrabold">{ongoingCount}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-white">
          <div className="text-sm text-white/80">Finished</div>
          <div className="text-3xl font-extrabold">{finishedCount}</div>
        </div>
      </div>

      {userServices.length === 0 ? (
        <p className="text-white text-center mt-6">
          You have no ongoing or finished services yet.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {userServices.map((svc) => (
            <div
              key={svc._id || svc.id}
              className="card bg-white/10 border border-white/15 text-white shadow-xl"
            >
              <img
                src={svc.image || '/placeholder.jpg'}
                alt={svc.title || 'Service'}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">
                    {svc.title || 'Untitled Service'}
                  </h2>
                  <span className="badge cosmic-badge text-white">
                    {svc.status || 'ongoing'}
                  </span>
                </div>
                {svc.description && (
                  <p className="text-white/80 text-sm mt-1">
                    {svc.description}
                  </p>
                )}
                {svc.status === 'ongoing' && (
                  <button
                    onClick={() => finishService((svc._id || '').toString())}
                    className="cosmic-btn mt-3 w-full"
                  >
                     Finished
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
