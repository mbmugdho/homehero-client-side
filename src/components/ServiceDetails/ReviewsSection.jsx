import { motion } from 'framer-motion'
import { Star, MessageSquare, ThumbsUp } from 'lucide-react'
import { useMemo } from 'react'

const generateMockReviews = (rating, reviewCount) => {
  const reviewTemplates = [
    {
      name: 'Sarah Ahmed',
      avatar: 'S',
      comment: 'Excellent service! Very professional and thorough. Would definitely recommend to anyone looking for quality work.',
      date: '2 weeks ago',
    },
    {
      name: 'Mohammad Khan',
      avatar: 'M',
      comment: 'Great experience from start to finish. The team was punctual and did an amazing job. Very satisfied!',
      date: '1 month ago',
    },
    {
      name: 'Fatima Rahman',
      avatar: 'F',
      comment: 'Professional service with fair pricing. They completed the work on time and cleaned up afterwards. Highly recommend!',
      date: '1 month ago',
    },
    {
      name: 'Rahim Uddin',
      avatar: 'R',
      comment: 'Very happy with the quality of work. The provider was knowledgeable and friendly. Will use again.',
      date: '2 months ago',
    },
    {
      name: 'Nadia Islam',
      avatar: 'N',
      comment: 'Outstanding service! They went above and beyond my expectations. Truly a 5-star experience.',
      date: '2 months ago',
    },
  ]

  const shuffled = [...reviewTemplates].sort(() => 0.5 - Math.random())
  const selectedReviews = shuffled.slice(0, Math.min(4, reviewCount > 0 ? 4 : 0))

  return selectedReviews.map((review, idx) => ({
    ...review,
    rating: Math.max(4, Math.min(5, Math.round(rating - (idx * 0.2) + Math.random() * 0.5))),
  }))
}

const StarRating = ({ rating, size = 16 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={star <= Math.round(rating) 
            ? 'text-amber-400 fill-amber-400' 
            : 'text-white/20'
          }
        />
      ))}
    </div>
  )
}

const ReviewCard = ({ review, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--p))] to-[hsl(var(--s))] flex items-center justify-center text-white font-semibold flex-shrink-0">
          {review.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h4 className="text-white font-semibold">{review.name}</h4>
            <span className="text-white/50 text-xs">{review.date}</span>
          </div>

          <div className="mt-1">
            <StarRating rating={review.rating} size={14} />
          </div>

          <p className="mt-2 text-white/70 text-sm leading-relaxed">
            {review.comment}
          </p>

          <div className="mt-3 flex items-center gap-4">
            <button className="flex items-center gap-1 text-white/50 text-xs hover:text-white/80 transition-colors">
              <ThumbsUp size={14} />
              Helpful
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ReviewsSection = ({ rating = 0, reviewCount = 0 }) => {
  const reviews = useMemo(() => {
    return generateMockReviews(rating, reviewCount)
  }, [rating, reviewCount])

  const ratingDistribution = useMemo(() => {
    const base = rating || 4.5
    return [
      { stars: 5, percent: Math.round(base * 15) },
      { stars: 4, percent: Math.round((5 - base) * 20 + 20) },
      { stars: 3, percent: Math.round((5 - base) * 10 + 5) },
      { stars: 2, percent: Math.round((5 - base) * 5) },
      { stars: 1, percent: Math.round((5 - base) * 2) },
    ]
  }, [rating])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6"
    >
      <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare size={22} className="text-[hsl(var(--a))]" />
        Customer Reviews
      </h3>

      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        <div className="bg-white/5 rounded-xl p-5">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-white">{rating?.toFixed(1) || '0.0'}</div>
            <div className="mt-2">
              <StarRating rating={rating} size={20} />
            </div>
            <p className="text-white/60 text-sm mt-1">
              Based on {reviewCount} reviews
            </p>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-2">
                <span className="text-white/60 text-xs w-8">{item.stars} ★</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[hsl(var(--p))] to-[hsl(var(--s))] rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <span className="text-white/60 text-xs w-8">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, idx) => (
              <ReviewCard key={idx} review={review} index={idx} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-white/60">No reviews yet. Be the first to review!</p>
            </div>
          )}

          {reviewCount > 4 && (
            <button className="w-full py-3 text-center text-[hsl(var(--a))] hover:text-white font-medium transition-colors">
              View all {reviewCount} reviews
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ReviewsSection