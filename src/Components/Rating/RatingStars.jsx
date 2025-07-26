/* eslint-disable react/prop-types */
export default function RatingStars({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1 text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          className="w-4 h-4 fill-current"
          viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09L5.634 12 1 7.91l6.06-.88L10 2l2.94 5.03L19 7.91 14.366 12l1.512 6.09z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            d="M10 15l-5.878 3.09L5.634 12 1 7.91l6.06-.88L10 2l2.94 5.03L19 7.91 14.366 12l1.512 6.09z"
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300 fill-current"
          viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09L5.634 12 1 7.91l6.06-.88L10 2l2.94 5.03L19 7.91 14.366 12l1.512 6.09z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
}
