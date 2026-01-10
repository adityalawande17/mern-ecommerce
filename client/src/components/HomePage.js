import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import { itemContext } from "../context/ItemContext";
import { ThemeContext } from "../context/ThemeContext";

const Home = () => {
  const navigate = useNavigate();
  const { products } = useContext(itemContext);
  const { isDarkMode } = useContext(ThemeContext);

  // Get featured products (first 6)
  const featuredProducts = products.slice(0, 6);

  // Deal banners
  const dealBanners = [
    {
      id: 1,
      title: "Electronics Sale",
      subtitle: "Up to 50% OFF",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      icon: "💻",
      link: "/products?category=Electronics",
    },
    {
      id: 2,
      title: "Fashion Week",
      subtitle: "Trending Styles",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      icon: "👕",
      link: "/products?category=Fashion",
    },
    {
      id: 3,
      title: "Mobile Bonanza",
      subtitle: "Best Deals",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      icon: "📱",
      link: "/products?category=Mobiles",
    },
    {
      id: 4,
      title: "Home Decor",
      subtitle: "Save Big",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      icon: "🏠",
      link: "/products?category=Home",
    },
  ];

  // Category cards
  const categories = [
    { name: "Electronics", icon: "💻", color: "#667eea" },
    { name: "Fashion", icon: "👕", color: "#f093fb" },
    { name: "Mobiles", icon: "📱", color: "#4facfe" },
    { name: "Furniture", icon: "🛋️", color: "#43e97b" },
    { name: "Books", icon: "📚", color: "#fa709a" },
    { name: "Sports", icon: "⚽", color: "#30cfd0" },
  ];

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#1a1a1a" : "#f5f5f5",
        minHeight: "100vh",
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Deal Banners Section */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "30px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {dealBanners.map((banner) => (
            <div
              key={banner.id}
              onClick={() => navigate(banner.link)}
              style={{
                background: banner.color,
                borderRadius: "15px",
                padding: "30px 20px",
                textAlign: "center",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 25px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(0, 0, 0, 0.2)";
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "10px" }}>
                {banner.icon}
              </div>
              <h3
                style={{
                  color: "white",
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  margin: "0 0 5px 0",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                {banner.title}
              </h3>
              <p
                style={{
                  color: "white",
                  fontSize: "1rem",
                  margin: 0,
                  opacity: 0.9,
                }}
              >
                {banner.subtitle}
              </p>
              <button
                style={{
                  marginTop: "15px",
                  padding: "8px 20px",
                  backgroundColor: "white",
                  color: "#333",
                  border: "none",
                  borderRadius: "20px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Shop Now
              </button>
            </div>
          ))}
        </div>

        {/* Shop by Category Section */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: isDarkMode ? "#ffffff" : "#333",
                margin: 0,
              }}
            >
              Shop by Category
            </h2>
            <button
              onClick={() => navigate("/products")}
              style={{
                padding: "10px 25px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.95rem",
              }}
            >
              View All Categories →
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "20px",
            }}
          >
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() => navigate(`/products?category=${category.name}`)}
                style={{
                  backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
                  borderRadius: "15px",
                  padding: "30px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: isDarkMode
                    ? "0 4px 12px rgba(0,0,0,0.5)"
                    : "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  border: isDarkMode ? "1px solid #444" : "1px solid #e5e7eb",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.borderColor = category.color;
                  e.currentTarget.style.boxShadow = `0 8px 20px ${category.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = isDarkMode
                    ? "#444"
                    : "#e5e7eb";
                  e.currentTarget.style.boxShadow = isDarkMode
                    ? "0 4px 12px rgba(0,0,0,0.5)"
                    : "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    margin: "0 auto 15px",
                    backgroundColor: `${category.color}20`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                  }}
                >
                  {category.icon}
                </div>
                <h3
                  style={{
                    color: isDarkMode ? "#ffffff" : "#333",
                    fontSize: "1rem",
                    fontWeight: "600",
                    margin: 0,
                  }}
                >
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products Section */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: isDarkMode ? "#ffffff" : "#333",
                margin: 0,
              }}
            >
              Featured Products
            </h2>
            <button
              onClick={() => navigate("/products")}
              style={{
                padding: "10px 25px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.95rem",
              }}
            >
              View All Products →
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "25px",
            }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                style={{
                  backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
                  borderRadius: "15px",
                  padding: "20px",
                  cursor: "pointer",
                  boxShadow: isDarkMode
                    ? "0 4px 12px rgba(0,0,0,0.5)"
                    : "0 4px 12px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  border: isDarkMode ? "1px solid #444" : "1px solid #e5e7eb",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = isDarkMode
                    ? "0 12px 25px rgba(0,0,0,0.7)"
                    : "0 12px 25px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = isDarkMode
                    ? "0 4px 12px rgba(0,0,0,0.5)"
                    : "0 4px 12px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "contain",
                    borderRadius: "12px",
                    marginBottom: "15px",
                    backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                  }}
                />
                <h3
                  style={{
                    color: isDarkMode ? "#ffffff" : "#333",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    margin: "0 0 10px 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.name}
                </h3>
                <p
                  style={{
                    color: isDarkMode ? "#999" : "#666",
                    fontSize: "0.9rem",
                    margin: "0 0 15px 0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {product.description}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      color: "#28a745",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      margin: 0,
                    }}
                  >
                    ₹{product.price}
                  </p>
                  <button
                    style={{
                      padding: "8px 20px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product._id}`);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "20px",
            padding: "60px 40px",
            textAlign: "center",
            marginBottom: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "2.5rem",
              fontWeight: "700",
              margin: "0 0 15px 0",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            Explore Our Complete Collection
          </h2>
          <p
            style={{
              color: "white",
              fontSize: "1.2rem",
              margin: "0 0 30px 0",
              opacity: 0.9,
            }}
          >
            Browse thousands of products across all categories
          </p>
          <button
            onClick={() => navigate("/products")}
            style={{
              padding: "15px 40px",
              backgroundColor: "white",
              color: "#667eea",
              border: "none",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "1.1rem",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Shop All Products →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
