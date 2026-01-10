import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { itemContext } from "../context/ItemContext";
import { ThemeContext } from "../context/ThemeContext";
import ProductReviews from "../components/ProductReviews";
import StarRating from "../components/StarRating";
import Header from "../components/Header";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, products } = useContext(itemContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const availableCoupons = [
    { code: "SAVE100", discount: "₹100 OFF", minOrder: 500, color: "#f093fb" },
    {
      code: "FESTIVE25",
      discount: "25% OFF",
      minOrder: 1000,
      color: "#43e97b",
    },
    { code: "FIRST50", discount: "50% OFF", minOrder: 999, color: "#667eea" },
  ];

  const productImages = [
    product?.imageUrl,
    product?.imageUrl,
    product?.imageUrl,
    product?.imageUrl,
  ];

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (product) {
      const related = products
        .filter((p) => p.category === product.category && p._id !== product._id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product, products, id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`Added ${quantity} ${quantity > 1 ? "items" : "item"} to cart!`);
  };

  const copyCouponCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code "${code}" copied!`);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
          }}
        >
          <h2 style={{ color: isDarkMode ? "#ffffff" : "#333" }}>Loading...</h2>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
          }}
        >
          <h2 style={{ color: isDarkMode ? "#ffffff" : "#333" }}>
            Product not found
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: isDarkMode ? "#1a1a1a" : "#f5f5f5",
          padding: "20px",
          transition: "background-color 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div style={{ marginBottom: "20px" }}>
            <span
              onClick={() => navigate("/")}
              style={{
                color: "#007bff",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Home
            </span>
            <span
              style={{ color: isDarkMode ? "#999" : "#666", margin: "0 10px" }}
            >
              /
            </span>
            <span
              style={{
                color: isDarkMode ? "#999" : "#666",
                fontSize: "0.9rem",
              }}
            >
              {product.category}
            </span>
            <span
              style={{ color: isDarkMode ? "#999" : "#666", margin: "0 10px" }}
            >
              /
            </span>
            <span
              style={{
                color: isDarkMode ? "#cccccc" : "#333",
                fontSize: "0.9rem",
              }}
            >
              {product.name}
            </span>
          </div>

          {/* Main Product Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: isDarkMode
                ? "0 4px 12px rgba(0,0,0,0.5)"
                : "0 4px 12px rgba(0,0,0,0.1)",
              marginBottom: "30px",
            }}
          >
            {/* Left Side - Images */}
            <div>
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "20px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                }}
              >
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    onMouseEnter={() => setSelectedImage(index)}
                    style={{
                      width: "80px",
                      height: "80px",
                      border:
                        selectedImage === index
                          ? "3px solid #28a745"
                          : `2px solid ${isDarkMode ? "#444" : "#ddd"}`,
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Product Info */}
            <div>
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: "700",
                  color: isDarkMode ? "#ffffff" : "#333",
                  marginBottom: "15px",
                  lineHeight: "1.3",
                }}
              >
                {product.name}
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "5px 15px",
                    backgroundColor: "#fabb00ff",
                    borderRadius: "20px",
                    color: "white",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}
                >
                  <span>⭐</span>
                  <span>4.5</span>
                </div>
                <span
                  style={{
                    color: isDarkMode ? "#cccccc" : "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  Reviews
                </span>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <p
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#000000ff",
                    margin: "0",
                  }}
                >
                  ₹{product.price}
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    color: isDarkMode ? "#999" : "#666",
                    textDecoration: "line-through",
                    margin: "5px 0 0 0",
                  }}
                >
                  ₹{Math.floor(product.price * 1.3)}
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#28a745",
                    margin: "5px 0 0 0",
                    fontWeight: "600",
                  }}
                >
                  You save ₹{Math.floor(product.price * 0.3)} (23% off)
                </p>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: isDarkMode ? "#ffffff" : "#333",
                    marginBottom: "15px",
                  }}
                >
                  🎟️ Available Offers
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {availableCoupons.map((coupon, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "12px 15px",
                        background: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                        border: `2px dashed ${isDarkMode ? "#444" : "#ddd"}`,
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontWeight: "700",
                            color: coupon.color,
                            fontSize: "1rem",
                            marginRight: "10px",
                          }}
                        >
                          {coupon.discount}
                        </span>
                        <span
                          style={{
                            color: isDarkMode ? "#cccccc" : "#666",
                            fontSize: "0.85rem",
                          }}
                        >
                          on orders above ₹{coupon.minOrder}
                        </span>
                      </div>
                      <button
                        onClick={() => copyCouponCode(coupon.code)}
                        style={{
                          padding: "6px 15px",
                          backgroundColor: coupon.color,
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "0.85rem",
                        }}
                      >
                        {coupon.code}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <p
                  style={{
                    color: product.countInStock > 10 ? "#28a745" : "#ffc107",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                  }}
                >
                  {product.countInStock > 10
                    ? ` In Stock (${product.countInStock} available)`
                    : ` Only ${product.countInStock} left in stock`}
                </p>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "10px",
                    fontWeight: "600",
                    color: isDarkMode ? "#ffffff" : "#333",
                    fontSize: "1rem",
                  }}
                >
                  Quantity:
                </label>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: isDarkMode ? "#444" : "#f0f0f0",
                      border: "none",
                      borderRadius: "8px",
                      cursor: quantity > 1 ? "pointer" : "not-allowed",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: isDarkMode ? "#ffffff" : "#333",
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "600",
                      color: isDarkMode ? "#ffffff" : "#333",
                      minWidth: "50px",
                      textAlign: "center",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.countInStock, quantity + 1))
                    }
                    disabled={quantity >= product.countInStock}
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: isDarkMode ? "#444" : "#f0f0f0",
                      border: "none",
                      borderRadius: "8px",
                      cursor:
                        quantity < product.countInStock
                          ? "pointer"
                          : "not-allowed",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: isDarkMode ? "#ffffff" : "#333",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "15px", marginBottom: "20px" }}
              >
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: "1",
                    padding: "15px",
                    backgroundColor: "#fabb00ff",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    transition: "all 0.3s ease",
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate("/cart")}
                  style={{
                    flex: "1",
                    padding: "15px",
                    backgroundColor: "#efbf1eff",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    transition: "all 0.3s ease",
                  }}
                >
                  Buy Now
                </button>
              </div>

              <div
                style={{
                  padding: "15px",
                  backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                  borderRadius: "10px",
                }}
              >
                <p
                  style={{
                    margin: "8px 0",
                    color: isDarkMode ? "#cccccc" : "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  🚚 Free delivery on orders above ₹500
                </p>
                <p
                  style={{
                    margin: "8px 0",
                    color: isDarkMode ? "#cccccc" : "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  📦 Cash on delivery available
                </p>
                <p
                  style={{
                    margin: "8px 0",
                    color: isDarkMode ? "#cccccc" : "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  ↩️ 7-day easy return policy
                </p>
              </div>
            </div>
          </div>

          {/* About This Product */}
          <div
            style={{
              backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: isDarkMode
                ? "0 4px 12px rgba(0,0,0,0.5)"
                : "0 4px 12px rgba(0,0,0,0.1)",
              marginBottom: "30px",
            }}
          >
            <h2
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                color: isDarkMode ? "#ffffff" : "#333",
                marginBottom: "20px",
              }}
            >
              📋 About This Product
            </h2>
            <p
              style={{
                color: isDarkMode ? "#cccccc" : "#666",
                lineHeight: "1.8",
                fontSize: "1rem",
                marginBottom: "20px",
              }}
            >
              {product.description}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "15px",
              }}
            >
              <div
                style={{
                  padding: "15px",
                  backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                  borderRadius: "10px",
                }}
              >
                <strong style={{ color: isDarkMode ? "#ffffff" : "#333" }}>
                  Category:
                </strong>
                <span
                  style={{
                    color: isDarkMode ? "#cccccc" : "#666",
                    marginLeft: "10px",
                  }}
                >
                  {product.category}
                </span>
              </div>
              <div
                style={{
                  padding: "15px",
                  backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                  borderRadius: "10px",
                }}
              >
                <strong style={{ color: isDarkMode ? "#ffffff" : "#333" }}>
                  Brand:
                </strong>
                <span
                  style={{
                    color: isDarkMode ? "#cccccc" : "#666",
                    marginLeft: "10px",
                  }}
                >
                  Premium Brand
                </span>
              </div>
              <div
                style={{
                  padding: "15px",
                  backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                  borderRadius: "10px",
                }}
              >
                <strong style={{ color: isDarkMode ? "#ffffff" : "#333" }}>
                  Warranty:
                </strong>
                <span
                  style={{
                    color: isDarkMode ? "#cccccc" : "#666",
                    marginLeft: "10px",
                  }}
                >
                  1 Year Manufacturer Warranty
                </span>
              </div>
              <div
                style={{
                  padding: "15px",
                  backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                  borderRadius: "10px",
                }}
              >
                <strong style={{ color: isDarkMode ? "#ffffff" : "#333" }}>
                  Delivery:
                </strong>
                <span
                  style={{
                    color: isDarkMode ? "#cccccc" : "#666",
                    marginLeft: "10px",
                  }}
                >
                  2-3 Business Days
                </span>
              </div>
            </div>
          </div>

          {/* You Might Also Like */}
          {relatedProducts.length > 0 && (
            <div
              style={{
                backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
                padding: "30px",
                borderRadius: "15px",
                boxShadow: isDarkMode
                  ? "0 4px 12px rgba(0,0,0,0.5)"
                  : "0 4px 12px rgba(0,0,0,0.1)",
                marginBottom: "30px",
              }}
            >
              <h2
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: isDarkMode ? "#ffffff" : "#333",
                  marginBottom: "25px",
                }}
              >
                💡 You Might Also Like
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                }}
              >
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct._id}
                    onClick={() => navigate(`/product/${relatedProduct._id}`)}
                    style={{
                      padding: "15px",
                      border: isDarkMode ? "1px solid #444" : "1px solid #ddd",
                      borderRadius: "12px",
                      cursor: "pointer",
                      backgroundColor: isDarkMode ? "#1a1a1a" : "#fafafa",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 16px rgba(0,0,0,0.2)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <img
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.name}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "contain",
                        marginBottom: "10px",
                        borderRadius: "8px",
                      }}
                    />
                    <h4
                      style={{
                        color: isDarkMode ? "#ffffff" : "#333",
                        fontSize: "0.95rem",
                        marginBottom: "8px",
                        fontWeight: "600",
                      }}
                    >
                      {relatedProduct.name.substring(0, 40)}...
                    </h4>
                    <p
                      style={{
                        color: "#28a745",
                        fontSize: "1.1rem",
                        fontWeight: "700",
                        margin: "0",
                      }}
                    >
                      ₹{relatedProduct.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ⭐ NEW PROFESSIONAL REVIEWS SECTION ⭐ */}
          <ProductReviews productId={product._id} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
