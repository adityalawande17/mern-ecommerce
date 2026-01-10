import React, { useState } from "react";

const StarRating = ({
  rating = 0,
  onRatingChange = null,
  size = 24,
  interactive = false,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const handleMouseEnter = (index) => {
    if (interactive) {
      setHoverRating(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const getColor = (index) => {
    const currentRating = interactive ? hoverRating || rating : rating;
    if (index < Math.floor(currentRating)) {
      return "#FFA500";
    } else if (index < currentRating && currentRating % 1 !== 0) {
      return "#FFA500";
    } else {
      return "#D3D3D3";
    }
  };

  const getFill = (index) => {
    const currentRating = interactive ? hoverRating || rating : rating;
    if (index < Math.floor(currentRating)) {
      return "100%";
    } else if (index < currentRating) {
      const decimal = currentRating % 1;
      return `${decimal * 100}%`;
    } else {
      return "0%";
    }
  };

  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          style={{
            cursor: interactive ? "pointer" : "default",
            position: "relative",
            width: size,
            height: size,
            transition: "transform 0.2s ease",
          }}
          onMouseOver={(e) => {
            if (interactive) {
              e.currentTarget.style.transform = "scale(1.2)";
            }
          }}
          onMouseOut={(e) => {
            if (interactive) {
              e.currentTarget.style.transform = "scale(1)";
            }
          }}
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D3D3D3"
            strokeWidth="2"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>

          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={getColor(index)}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <defs>
              <clipPath id={`clip-${index}`}>
                <rect x="0" y="0" width={getFill(index)} height="100%" />
              </clipPath>
            </defs>
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              clipPath={`url(#clip-${index})`}
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default StarRating;
