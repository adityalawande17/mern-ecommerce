import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "MEGA SALE",
      subtitle: "Up to 50% OFF on Electronics",
      description: "Shop the latest smartphones, laptops, and gadgets",
      backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      imageUrl:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600",
      buttonText: "Shop Now",
      buttonAction: () => navigate("/"),
    },
    {
      id: 2,
      title: "Fashion Week",
      subtitle: "Trending Styles for Everyone",
      description: "Discover the hottest fashion trends of the season",
      backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      imageUrl:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600",

      buttonText: "Explore Fashion",
      buttonAction: () => navigate("/"),
    },
    {
      id: 3,
      title: "Tech Deals",
      subtitle: "Premium Gadgets at Best Prices",
      description: "Get the latest technology at unbeatable prices",
      backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      imageUrl:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600",
      buttonText: "View Deals",
      buttonAction: () => navigate("/"),
    },
    {
      id: 4,
      title: "Home Essentials",
      subtitle: "Transform Your Living Space",
      description: "Furniture, decor, and appliances for your home",
      backgroundColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      imageUrl:
        "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1600",
      buttonText: "Browse Home",
      buttonAction: () => navigate("/"),
    },
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: slide.imageUrl
              ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.imageUrl}) center/cover no-repeat`
              : slide.backgroundColor,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            opacity: currentSlide === index ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
            padding: "60px 40px",
            color: "white",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "800",
              marginBottom: "15px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              animation:
                currentSlide === index ? "slideInDown 0.8s ease" : "none",
            }}
          >
            {slide.title}
          </h1>

          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              marginBottom: "10px",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              animation: currentSlide === index ? "slideInUp 1s ease" : "none",
            }}
          >
            {slide.subtitle}
          </h2>

          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "30px",
              maxWidth: "600px",
              opacity: 0.9,
              animation: currentSlide === index ? "fadeIn 1.2s ease" : "none",
            }}
          >
            {slide.description}
          </p>

          <button
            onClick={slide.buttonAction}
            style={{
              padding: "15px 40px",
              fontSize: "1.1rem",
              fontWeight: "700",
              backgroundColor: "white",
              color: "#333",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
              animation: currentSlide === index ? "bounceIn 1.5s ease" : "none",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
            }}
          >
            {slide.buttonText}
          </button>
        </div>
      ))}

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: "#333",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "24px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
          zIndex: 10,
        }}
        // onMouseOver={(e) => {
        //   e.target.style.backgroundColor = "white";
        //   e.target.style.transform = "translateY(-50%) scale(1.1)";
        // }}
        // onMouseOut={(e) => {
        //   e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        //   e.target.style.transform = "translateY(-50%) scale(1)";
        // }}
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: "#333",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "24px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease",
          zIndex: 10,
        }}
        // onMouseOver={(e) => {
        //   e.target.style.backgroundColor = "white";
        //   e.target.style.transform = "translateY(-50%) scale(1.1)";
        // }}
        // onMouseOut={(e) => {
        //   e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        //   e.target.style.transform = "translateY(-50%) scale(1)";
        // }}
      >
        ›
      </button>

      {/* Dots Indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 10,
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: currentSlide === index ? "40px" : "12px",
              height: "12px",
              borderRadius: "6px",
              backgroundColor:
                currentSlide === index ? "white" : "rgba(255, 255, 255, 0.5)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem !important;
          }
          h2 {
            font-size: 1.5rem !important;
          }
          p {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;
