import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ServiceDetails() {
  const service = useLoaderData(); 

  const {
    title,
    category,
    description,
    details,
    rating,
    reviews,
    hourly_rate,
    duration,
    location,
    image,
    provider,
    featured,
  } = service || {};

  function handleBook() {
    Swal.fire({
      icon: 'success',
      title: 'Booking started',
      text: `You’re booking: ${title}`,
      confirmButtonColor: '#8C2FA3',
      background: '#1b0b28',
      color: '#fff',
    });
  }

  return (
    <section className="container-x py-12">
      <div className="card bg-white/10 border border-white/15 text-white shadow-xl overflow-hidden">
        <figure className="relative h-64 md:h-80">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/0 to-black/40" />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="badge cosmic-badge text-white/90">{category}</span>
            {featured && <span className="badge cosmic-badge text-white">Featured</span>}
          </div>
        </figure>

        <div className="p-5">
          <div className="grid gap-6 md:grid-cols-[1.5fr_.9fr] items-start">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-cosmic">{title}</h1>
              {description && <p className="text-white/90 mt-2">{description}</p>}

              <div className="mt-3 flex items-center gap-2 text-amber-400" aria-label={`Rating ${rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill={i < Math.round(rating) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    className={i < Math.round(rating) ? '' : 'text-amber-400/40'}
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91 6.06 6.09 10 0l3.94 6.09 5.572.82-4.756 4.635 1.122 6.545z" />
                  </svg>
                ))}
                <span className="text-white/80 text-sm">
                  {rating?.toFixed(1)} · {reviews} reviews
                </span>
              </div>

              {details && (
                <>
                  <h3 className="mt-6 font-semibold text-white/95">What's included</h3>
                  <p className="text-white/85 mt-2">{details}</p>
                </>
              )}
            </div>

            <aside className="card bg-white/5 border border-white/10 p-4">
              <div className="flex items-center gap-3">
                <img
                  src={provider?.profile_img}
                  alt={provider?.name}
                  className="w-12 h-12 rounded-full border-2 border-white/40"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <strong>{provider?.name}</strong>
                    {provider?.verified && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[hsl(var(--a))]">
                        <path d="M9 12l2 2 4-4M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" />
                      </svg>
                    )}
                  </div>
                  <div className="text-white/70 text-sm">{provider?.experience} experience</div>
                </div>
              </div>

              <div className="mt-3 space-y-2 text-sm text-white/85">
                <div className="flex items-center justify-between">
                  <span>Rate</span>
                  <span className="font-semibold">${hourly_rate}/hr</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Duration</span>
                  <span>{duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Location</span>
                  <span className="text-right">{location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Contact</span>
                  <a className="underline underline-offset-4" href={`tel:${provider?.contact}`}>{provider?.contact}</a>
                </div>
              </div>

              <button className="cosmic-btn w-full mt-4" type="button" onClick={handleBook}>
                Add Service
              </button>
              <Link to="/services" className="cosmic-btn-outline w-full text-center mt-2">
                Back to Services
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}