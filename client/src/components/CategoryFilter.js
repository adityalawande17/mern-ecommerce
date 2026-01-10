import React, { useContext } from "react";
import { itemContext } from "../context/ItemContext";
import { ThemeContext } from "../context/ThemeContext";

const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useContext(itemContext);
  const { isDarkMode } = useContext(ThemeContext);

  const categories = [
    { name: "All", icon: "🏪" },
    { name: "Electronics", icon: "💻" },
    { name: "Fashion", icon: "👕" },
    { name: "Mobiles", icon: "📱" },
    { name: "Furniture", icon: "🛋️" },
    { name: "Medicines", icon: "💊" },
    { name: "Books", icon: "📚" },
    { name: "Sports", icon: "⚽" },
    { name: "Home", icon: "🏠" },
  ];

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#1a1a1a" : "#f9fafb",
        padding: "30px 20px",
        borderBottom: isDarkMode ? "1px solid #444" : "1px solid #e5e7eb",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "1.8rem",
            color: isDarkMode ? "#ffffff" : "#1f2937",
          }}
        >
          Shop by Category
        </h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              style={{
                padding: "15px 25px",
                backgroundColor:
                  selectedCategory === category.name
                    ? "#28a745"
                    : isDarkMode
                    ? "#2d2d2d"
                    : "#ffffff",
                color:
                  selectedCategory === category.name
                    ? "#ffffff"
                    : isDarkMode
                    ? "#ffffff"
                    : "#374151",
                border: `2px solid ${
                  selectedCategory === category.name
                    ? "#28a745"
                    : isDarkMode
                    ? "#444"
                    : "#e5e7eb"
                }`,
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow:
                  selectedCategory === category.name
                    ? "0 4px 12px rgba(40, 167, 69, 0.3)"
                    : "0 2px 4px rgba(0, 0, 0, 0.05)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                minWidth: "140px",
                justifyContent: "center",
              }}
              onMouseOver={(e) => {
                if (selectedCategory !== category.name) {
                  e.target.style.borderColor = "#28a745";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== category.name) {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                }
              }}
            >
              <span style={{ fontSize: "24px" }}>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {selectedCategory !== "All" && (
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "16px",
              color: isDarkMode ? "#cccccc" : "#6b7280",
            }}
          >
            Showing products in:{" "}
            <strong style={{ color: "#28a745" }}>{selectedCategory}</strong>
            <button
              onClick={() => setSelectedCategory("All")}
              style={{
                marginLeft: "15px",
                padding: "6px 15px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
