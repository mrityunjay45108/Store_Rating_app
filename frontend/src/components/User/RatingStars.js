import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating, setRating, maxStars = 5 }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= (hover || rating);
        
        return (
          <button
            type="button"
            key={starValue}
            style={{ 
              background: 'none', 
              border: 'none', 
              padding: '4px', 
              cursor: 'pointer',
              outline: 'none'
            }}
            className="transition-transform duration-200 active:scale-90"
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              size={36} 
              style={{
                fill: isActive ? '#facc15' : 'transparent',
                color: isActive ? '#facc15' : '#d1d5db', 
                transition: 'all 0.2s ease'
              }}
            />
          </button>
        );
      })}
      
      {rating > 0 && (
        <span className="ml-2 font-bold text-yellow-600" style={{ fontSize: '1.2rem' }}>
          {rating}
        </span>
      )}
    </div>
  );
};

export default RatingStars;