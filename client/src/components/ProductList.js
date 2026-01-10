import React, { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { itemContext } from "../context/ItemContext";
import { ThemeContext } from "../context/ThemeContext";

const ProductList = () => {
  const { getFilteredProducts, searchQuery, selectedCategory } =
    useContext(itemContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortBy, setSortBy] = useState("bestMatch");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  // Price ranges in rupees
  const priceRanges = [
    { id: "range1", label: "₹25 - ₹4,999", min: 25, max: 4999 },
    { id: "range2", label: "₹5,000 - ₹9,999", min: 5000, max: 9999 },
    { id: "range3", label: "₹10,000 - ₹19,999", min: 10000, max: 19999 },
    { id: "range4", label: "₹20,000 - ₹29,999", min: 20000, max: 29999 },
    { id: "range5", label: "₹30,000 - ₹49,999", min: 30000, max: 49999 },
    { id: "range6", label: "₹50,000 - ₹74,999", min: 50000, max: 74999 },
    { id: "range7", label: "₹75,000 - ₹99,999", min: 75000, max: 99999 },
    { id: "range8", label: "₹1,00,000+", min: 100000, max: Infinity },
  ];

  // Sort options
  const sortOptions = [
    { id: "bestMatch", label: "Best Match", icon: "✨" },
    { id: "bestSelling", label: "Best Selling", icon: "🔥" },
    { id: "bestDiscount", label: "Best Discount", icon: "💰" },
    { id: "priceLowToHigh", label: "Price: Low to High", icon: "⬆️" },
    { id: "priceHighToLow", label: "Price: High to Low", icon: "⬇️" },
    { id: "customerRating", label: "Customer Rating", icon: "⭐" },
  ];

  useEffect(() => {
    let filtered = getFilteredProducts();

    // Apply price range filters
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((product) => {
        return selectedPriceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId);
          return product.price >= range.min && product.price <= range.max;
        });
      });
    }

    // Apply sorting
    let sorted = [...filtered];
    switch (sortBy) {
      case "priceLowToHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "bestSelling":
        sorted.sort((a, b) => b.countInStock - a.countInStock);
        break;
      case "customerRating":
        sorted.sort(() => Math.random() - 0.5); // Random for demo
        break;
      case "bestDiscount":
        sorted.sort((a, b) => b.price - a.price); // Higher price = more discount potential
        break;
      default:
        // Best Match - keep current order
        break;
    }

    setSortedProducts(sorted);
  }, [
    searchQuery,
    selectedCategory,
    getFilteredProducts,
    sortBy,
    selectedPriceRanges,
  ]);

  const handlePriceRangeToggle = (rangeId) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId)
        ? prev.filter((id) => id !== rangeId)
        : [...prev, rangeId]
    );
  };

  const clearAllFilters = () => {
    setSelectedPriceRanges([]);
  };

  const getCurrentSortOption = () => {
    return sortOptions.find((option) => option.id === sortBy);
  };

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#1a1a1a" : "#f5f5f5",
        minHeight: "100vh",
        transition: "all 0.3s ease",
        paddingTop: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          gap: "20px",
          padding: "0 20px",
        }}
      >
        {/* Left Sidebar - Filters */}
        <div
          style={{
            width: "280px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: isDarkMode
                ? "0 2px 8px rgba(0,0,0,0.5)"
                : "0 2px 8px rgba(0,0,0,0.1)",
              position: "sticky",
              top: "20px",
            }}
          >
            {/* Filter Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                paddingBottom: "15px",
                borderBottom: isDarkMode
                  ? "1px solid #444"
                  : "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  color: isDarkMode ? "#ffffff" : "#333",
                }}
              >
                Filters
              </h3>
              {selectedPriceRanges.length > 0 && (
                <button
                  onClick={clearAllFilters}
                  style={{
                    padding: "5px 12px",
                    backgroundColor: "transparent",
                    color: "#007bff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                  }}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Price Filter */}
            <div>
              <h4
                style={{
                  margin: "0 0 15px 0",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: isDarkMode ? "#ffffff" : "#333",
                }}
              >
                Price
              </h4>

              {/* Price Range Checkboxes */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {priceRanges.map((range) => (
                  <label
                    key={range.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      padding: "8px",
                      borderRadius: "6px",
                      backgroundColor: selectedPriceRanges.includes(range.id)
                        ? isDarkMode
                          ? "#1a1a1a"
                          : "#f0f9ff"
                        : "transparent",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!selectedPriceRanges.includes(range.id)) {
                        e.currentTarget.style.backgroundColor = isDarkMode
                          ? "#3d3d3d"
                          : "#f8f9fa";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selectedPriceRanges.includes(range.id)) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedPriceRanges.includes(range.id)}
                      onChange={() => handlePriceRangeToggle(range.id)}
                      style={{
                        width: "18px",
                        height: "18px",
                        marginRight: "12px",
                        cursor: "pointer",
                        accentColor: "#007bff",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: isDarkMode ? "#cccccc" : "#666",
                        fontWeight: selectedPriceRanges.includes(range.id)
                          ? "600"
                          : "400",
                      }}
                    >
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>

              {/* Show More Button */}
              <button
                style={{
                  marginTop: "15px",
                  padding: "8px 0",
                  width: "100%",
                  backgroundColor: "transparent",
                  color: "#007bff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  textAlign: "left",
                }}
              >
                Show all (15)
              </button>
            </div>

            {/* Active Filters Count */}
            {selectedPriceRanges.length > 0 && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "12px",
                  backgroundColor: isDarkMode ? "#1a1a1a" : "#f0f9ff",
                  borderRadius: "8px",
                  border: isDarkMode ? "1px solid #444" : "1px solid #bfdbfe",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.85rem",
                    color: isDarkMode ? "#cccccc" : "#666",
                  }}
                >
                  <strong style={{ color: isDarkMode ? "#ffffff" : "#333" }}>
                    {selectedPriceRanges.length}
                  </strong>{" "}
                  price filter{selectedPriceRanges.length > 1 ? "s" : ""}{" "}
                  applied
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1 }}>
          {/* Sort By Dropdown */}
          <div
            style={{
              backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
              borderRadius: "12px",
              padding: "15px 20px",
              marginBottom: "20px",
              boxShadow: isDarkMode
                ? "0 2px 8px rgba(0,0,0,0.5)"
                : "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                color: isDarkMode ? "#cccccc" : "#666",
                fontSize: "0.95rem",
              }}
            >
              Showing{" "}
              <strong style={{ color: isDarkMode ? "#ffffff" : "#333" }}>
                {sortedProducts.length}
              </strong>{" "}
              results
            </p>

            {/* Sort Dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 20px",
                  backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                  border: isDarkMode ? "1px solid #444" : "1px solid #e5e7eb",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  color: isDarkMode ? "#ffffff" : "#333",
                  minWidth: "220px",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span>Sort by:</span>
                  <strong>{getCurrentSortOption()?.label}</strong>
                </span>
                <span style={{ fontSize: "0.8rem" }}>▼</span>
              </button>

              {/* Dropdown Menu */}
              {showSortDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: 0,
                    backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
                    border: isDarkMode ? "1px solid #444" : "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: isDarkMode
                      ? "0 10px 30px rgba(0,0,0,0.7)"
                      : "0 10px 30px rgba(0,0,0,0.15)",
                    minWidth: "250px",
                    zIndex: 1000,
                    overflow: "hidden",
                  }}
                >
                  {sortOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => {
                        setSortBy(option.id);
                        setShowSortDropdown(false);
                      }}
                      style={{
                        padding: "12px 20px",
                        cursor: "pointer",
                        backgroundColor:
                          sortBy === option.id
                            ? isDarkMode
                              ? "#1a1a1a"
                              : "#f0f9ff"
                            : "transparent",
                        borderLeft:
                          sortBy === option.id
                            ? "3px solid #007bff"
                            : "3px solid transparent",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (sortBy !== option.id) {
                          e.currentTarget.style.backgroundColor = isDarkMode
                            ? "#3d3d3d"
                            : "#f8f9fa";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (sortBy !== option.id) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <span style={{ fontSize: "1.2rem" }}>{option.icon}</span>
                      <span
                        style={{
                          fontSize: "0.95rem",
                          color: isDarkMode ? "#ffffff" : "#333",
                          fontWeight: sortBy === option.id ? "600" : "400",
                        }}
                      >
                        {option.label}
                      </span>
                      {sortBy === option.id && (
                        <span
                          style={{
                            marginLeft: "auto",
                            color: "#007bff",
                            fontSize: "1rem",
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <p
              style={{
                textAlign: "center",
                color: isDarkMode ? "#cccccc" : "#666",
                marginBottom: "20px",
                fontSize: "0.95rem",
              }}
            >
              Found {sortedProducts.length} result
              {sortedProducts.length !== 1 ? "s" : ""} for
              <strong style={{ color: isDarkMode ? "#ffffff" : "#333" }}>
                {" "}
                "{searchQuery}"
              </strong>
            </p>
          )}

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                backgroundColor: isDarkMode ? "#2d2d2d" : "#ffffff",
                borderRadius: "12px",
                boxShadow: isDarkMode
                  ? "0 2px 8px rgba(0,0,0,0.5)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🔍</div>
              <h3
                style={{
                  color: isDarkMode ? "#ffffff" : "#333",
                  marginBottom: "10px",
                }}
              >
                No products found
              </h3>
              <p style={{ color: isDarkMode ? "#cccccc" : "#666" }}>
                Try adjusting your search or filters
              </p>
              {selectedPriceRanges.length > 0 && (
                <button
                  onClick={clearAllFilters}
                  style={{
                    marginTop: "20px",
                    padding: "10px 25px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {sortedProducts.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
