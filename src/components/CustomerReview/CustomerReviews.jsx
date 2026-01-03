import React from 'react'
import Marquee from 'react-fast-marquee'

const reviews = [
  {
    name: 'Alice Johnson',
    review: 'Absolutely amazing service! My home has never been cleaner.',
  },
  {
    name: 'Rahim Uddin',
    review: 'Plumbing service was super fast and reliable. Highly recommended!',
  },
  {
    name: 'Sara Ahmed',
    review:
      'Electrician arrived on time and fixed everything quickly.',
  },
  {
    name: 'James Smith',
    review:
      'The gardener transformed my backyard beautifully.',
  },
  {
    name: 'Nadia Khan',
    review:
      'Easy booking, friendly staff, and top-quality service. Will use again.',
  },
]

const CustomerReviews = () => {
  return (
    <section className="container-x  ">
      <h2 className="text-cosmic text-3xl sm:text-4xl font-extrabold text-center mb-8">
        What Our Customers Say
      </h2>

      <Marquee gradient={false} speed={60} pauseOnHover={true}>
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="mr-6 bg-white/5 border border-white/15 rounded-2xl p-6 w-72 flex-shrink-0 shadow-xl"
          >
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-amber-400 mr-1"
                >
                  <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.401 8.172L12 18.896l-7.335 3.853 1.401-8.172-5.934-5.786 8.2-1.193z" />
                </svg>
              ))}
            </div>
            <p className="text-white/80 text-sm mb-3">{r.review}</p>
            <div className="text-white/90 font-semibold text-sm">
              - {r.name}
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  )
}

export default CustomerReviews
