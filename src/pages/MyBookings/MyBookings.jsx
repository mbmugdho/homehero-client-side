import { useAuth } from '../../context/AuthContext'
import Swal from 'sweetalert2'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageTitle } from '../../usePageTitle'

const MyBookings = () => {
  const { userBookings = [], cancelBooking, ready } = useAuth()
  const [deleting, setDeleting] = useState(null)
  const loading = !ready

  const rows = useMemo(() => userBookings, [userBookings])

  const handleCancel = async (b) => {
    const res = await Swal.fire({
      icon: 'warning',
      title: 'Cancel this booking?',
      text: 'This will remove the booking.',
      showCancelButton: true,
      confirmButtonText: 'Cancel booking',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      background: '#1b0b28',
      color: '#fff',
    })
    if (!res.isConfirmed) return
    const id = (b._id || '').toString()
    setDeleting(id)
    const ok = await cancelBooking(id)
    setDeleting(null)
    if (ok) {
      Swal.fire({
        icon: 'success',
        title: 'Booking canceled',
        timer: 1200,
        showConfirmButton: false,
        background: '#1b0b28',
        color: '#fff',
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed to cancel',
        background: '#1b0b28',
        color: '#fff',
      })
    }
  }

  return (
    <>
    <PageTitle 
  title="Bookings" 
  description="View and manage all your HomeHero bookings" 
/>
      <section className="container-x py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-cosmic">My Bookings</h1>
          <Link to="/services" className="cosmic-btn-outline">
            Find more services
          </Link>
        </div>

        {loading ? (
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
            <table className="table text-white">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Booking Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(3)].map((_, i) => (
                  <tr key={i}>
                    <td>
                      <div className="skeleton h-5 w-40" />
                    </td>
                    <td>
                      <div className="skeleton h-5 w-36" />
                    </td>
                    <td>
                      <div className="skeleton h-5 w-20" />
                    </td>
                    <td>
                      <div className="skeleton h-5 w-20" />
                    </td>
                    <td>
                      <div className="skeleton h-5 w-28" />
                    </td>
                    <td className="text-right">
                      <div className="skeleton h-9 w-28 ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : rows.length === 0 ? (
          <p className="text-white text-center mt-6">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
            <table className="table text-white">
              <thead>
                <tr>
                  <th className="text-white">Service</th>
                  <th className="text-white">Booking Date</th>
                  <th className="text-white">Price</th>
                  <th className="text-white">Status</th>
                  <th className="text-white">Location</th>
                  <th className="text-right text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((b) => {
                  const id = (b._id || '').toString()
                  const date = b.bookingDate
                    ? new Date(b.bookingDate).toLocaleString()
                    : '—'
                  const price =
                    typeof b.price === 'number' ? b.price : b.hourly_rate
                  return (
                    <tr key={id} className="hover">
                      <td className="max-w-[260px]">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.image || '/placeholder.jpg'}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover border border-white/10"
                          />
                          <div className="truncate">
                            <div className="font-semibold truncate">
                              {b.title || 'Untitled Service'}
                            </div>
                            <div className="text-white/70 text-sm">
                              {b.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{date}</td>
                      <td>${price}</td>
                      <td>
                        <span className="badge cosmic-badge text-white">
                          {b.status || 'pending'}
                        </span>
                      </td>
                      <td className="truncate max-w-[180px]">
                        {b.location || '—'}
                      </td>
                      <td>
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/service/${encodeURIComponent(
                              b.serviceId || ''
                            )}`}
                            className="cosmic-btn-outline"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleCancel(b)}
                            disabled={deleting === id}
                            className="cosmic-btn"
                          >
                            {deleting === id ? (
                              <span className="loading loading-spinner loading-sm" />
                            ) : (
                              'Cancel'
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}

export default MyBookings
