import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ServiceCard = ({ service }) => {
  const {
    id, title, category, description, rating, reviews,
    hourly_rate, duration, location, image,  featured,
  } = service || {};

  const price = typeof hourly_rate === 'number' ? `$${hourly_rate}/hr` : '';

  const handleBook = () => {
    Swal.fire({
      icon: 'success',
      title: 'Added to booking',
      text: `You’re booking: ${title}`,
      confirmButtonColor: '#8C2FA3',
      background: '#1b0b28',
      color: '#fff',
    });
  };

  return (
    <article className="card bg-white/10 border border-white/15 text-white shadow-xl hover:shadow-2xl transition hover:-translate-y-1">
      <figure className="relative h-44 md:h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/40" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="badge cosmic-badge  text-white">{category}</span>
          {featured && <span className="badge cosmic-badge text-white">Featured</span>}
        </div>
      </figure>

      <div className="card-body p-4">
        <h3 className="font-semibold text-lg leading-snug">{title}</h3>
        {description && <p className="text-white/80 text-sm mt-1">{description}</p>}

        <div className="mt-2 flex items-center gap-2 text-amber-400" aria-label={`Rating ${rating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 20 20"
              fill={i < Math.round(rating) ? 'currentColor' : 'none'}
              stroke="currentColor"
              className={i < Math.round(rating) ? '' : 'text-amber-400/40'}>
              <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91 6.06 6.09 10 0l3.94 6.09 5.572.82-4.756 4.635 1.122 6.545z" />
            </svg>
          ))}
          <span className="text-white/80 text-sm">{rating?.toFixed(1)} · {reviews} reviews</span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/80">
          {price && <div className="font-semibold">{price}</div>}
          {duration && (
            <div className="flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70">
                <path d="M12 7v5l4 2M12 22A10 10 0 1 1 12 2a10 10 0 0 1 0 20Z" />
              </svg>
              <span>{duration}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70">
                <path d="M12 21s7-4.35 7-11a7 7 0 0 0-14 0c0 6.65 7 11 7 11Zm0-9a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
              </svg>
              <span className=" max-w-[10rem]">{location}</span>
            </div>
          )}
        </div>
        <div className="card-actions mt-4 gap-2">
          <Link to={`/service/${id}`} className="cosmic-btn">View Details</Link>
          <button type="button" onClick={handleBook} className="cosmic-btn-outline">Add Service</button>
        </div>
      </div>
    </article>
  );
};

export const ServiceCardSkeleton = () => (
  <div className="card bg-white/10 border border-white/15 text-white shadow-xl">
    <div className="h-48 skeleton"></div>
    <div className="card-body p-4">
      <div className="skeleton h-5 w-3/4"></div>
      <div className="skeleton h-4 w-full mt-2"></div>
      <div className="skeleton h-4 w-2/3 mt-2"></div>
      <div className="skeleton h-9 w-40 mt-4"></div>
    </div>
  </div>
);

export default ServiceCard;