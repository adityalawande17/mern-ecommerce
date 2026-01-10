import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    joinDate: "",
  });
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    type: "Home",
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    isDefault: false,
  });

  useEffect(() => {
    // Load user data from localStorage
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("userToken");

    if (!token) {
      alert("Please login to view your profile");
      navigate("/login");
      return;
    }

    setUserData({
      name: name || "User",
      email: email || "email@example.com",
      phone: "+91 9876543210",
      joinDate: "October 2025",
    });

    // Mock orders data (you can replace with API call later)
    setOrders([
      {
        id: "ORD001",
        date: "2025-10-20",
        status: "Delivered",
        total: 29999,
        items: 2,
        products: ["Sony Headphones", "Nike Shoes"],
      },
      {
        id: "ORD002",
        date: "2025-10-15",
        status: "Shipped",
        total: 79999,
        items: 1,
        products: ["Samsung Galaxy S23"],
      },
    ]);

    // Mock addresses
    setAddresses([
      {
        id: 1,
        type: "Home",
        name: name,
        address: "123 Main Street, Apartment 4B",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        phone: "+91 9876543210",
        isDefault: true,
      },
    ]);
  }, [navigate]);

  const tabs = [
    { id: "profile", icon: "👤", label: "Profile" },
    { id: "orders", icon: "📦", label: "My Orders" },
    { id: "addresses", icon: "📍", label: "Addresses" },
    { id: "coupons", icon: "🎟️", label: "Coupons" },
    { id: "wishlist", icon: "❤️", label: "Wishlist" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#28a745";
      case "Shipped":
        return "#17a2b8";
      case "Processing":
        return "#ffc107";
      case "Cancelled":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };
  // Add these functions before the return statement (around line 100)

  const handleAddAddress = () => {
    const userName = localStorage.getItem("userName") || "User";
    setAddressForm({
      type: "Home",
      name: userName,
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "+91 ",
      isDefault: false,
    });
    setEditingAddress(null);
    setShowAddressModal(true);
  };

  const handleEditAddress = (address) => {
    setAddressForm(address);
    setEditingAddress(address.id);
    setShowAddressModal(true);
  };

  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter((addr) => addr.id !== addressId));
      alert("Address deleted successfully!");
    }
  };

  const handleSaveAddress = () => {
    if (
      !addressForm.address ||
      !addressForm.city ||
      !addressForm.state ||
      !addressForm.pincode ||
      !addressForm.phone
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (editingAddress) {
      // Update existing address
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress
            ? { ...addressForm, id: editingAddress }
            : addr
        )
      );
      alert("Address updated successfully!");
    } else {
      // Add new address
      const newAddress = {
        ...addressForm,
        id: Date.now(),
      };
      setAddresses([...addresses, newAddress]);
      alert("Address added successfully!");
    }

    setShowAddressModal(false);
    setAddressForm({
      type: "Home",
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      isDefault: false,
    });
  };

  const handleSetDefaultAddress = (addressId) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
    alert("Default address updated!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#1a1a1a" : "#f5f5f5",
        padding: "20px 0",
        transition: "background-color 0.3s ease",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div
          style={{
            backgroundColor: isDarkMode ? "#2d2d2d" : "white",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow: isDarkMode
              ? "0 2px 8px rgba(0,0,0,0.5)"
              : "0 2px 8px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {userData.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1
                style={{
                  margin: "0 0 5px 0",
                  fontSize: "1.8rem",
                  color: isDarkMode ? "#ffffff" : "#333",
                }}
              >
                {userData.name}
              </h1>
              <p
                style={{
                  margin: "0",
                  color: isDarkMode ? "#cccccc" : "#666",
                  fontSize: "0.95rem",
                }}
              >
                {userData.email}
              </p>
              <p
                style={{
                  margin: "5px 0 0 0",
                  color: "#999",
                  fontSize: "0.85rem",
                }}
              >
                Member since {userData.joinDate}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 25px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1rem",
            }}
          >
            Continue Shopping
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            backgroundColor: isDarkMode ? "#2d2d2d" : "white",
            padding: "0",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow: isDarkMode
              ? "0 2px 8px rgba(0,0,0,0.5)"
              : "0 2px 8px rgba(0,0,0,0.1)",
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              borderBottom: isDarkMode ? "2px solid #444" : "2px solid #f0f0f0",
              overflowX: "auto",
              gap: "0",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "18px 30px",
                  backgroundColor:
                    activeTab === tab.id
                      ? isDarkMode
                        ? "#1a1a1a"
                        : "#f8f9fa"
                      : "transparent",
                  color:
                    activeTab === tab.id
                      ? "#28a745"
                      : isDarkMode
                      ? "#cccccc"
                      : "#666",
                  border: "none",
                  borderBottom:
                    activeTab === tab.id
                      ? "3px solid #28a745"
                      : "3px solid transparent",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: activeTab === tab.id ? "600" : "400",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: "30px" }}>
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h2
                  style={{
                    marginTop: "0",
                    marginBottom: "25px",
                    color: isDarkMode ? "#ffffff" : "#333",
                  }}
                >
                  Personal Information
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "600",
                        color: isDarkMode ? "#cccccc" : "#555",
                      }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userData.name}
                      readOnly
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: isDarkMode
                          ? "2px solid #444"
                          : "2px solid #e0e0e0",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                        color: isDarkMode ? "#ffffff" : "#333",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "600",
                        color: isDarkMode ? "#cccccc" : "#555",
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userData.email}
                      readOnly
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: isDarkMode
                          ? "2px solid #444"
                          : "2px solid #e0e0e0",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                        color: isDarkMode ? "#ffffff" : "#333",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "600",
                        color: isDarkMode ? "#cccccc" : "#555",
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={userData.phone}
                      readOnly
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: isDarkMode
                          ? "2px solid #444"
                          : "2px solid #e0e0e0",
                        borderRadius: "8px",
                        fontSize: "1rem",
                        backgroundColor: isDarkMode ? "#1a1a1a" : "#f8f9fa",
                        color: isDarkMode ? "#ffffff" : "#333",
                      }}
                    />
                  </div>
                </div>
                <button
                  style={{
                    marginTop: "25px",
                    padding: "12px 30px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                  }}
                >
                  Edit Profile
                </button>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2
                  style={{
                    marginTop: "0",
                    marginBottom: "25px",
                    color: isDarkMode ? "#ffffff" : "#333",
                  }}
                >
                  Order History
                </h2>
                {orders.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        style={{
                          padding: "20px",
                          border: isDarkMode
                            ? "2px solid #444"
                            : "2px solid #e0e0e0",
                          borderRadius: "12px",
                          backgroundColor: isDarkMode ? "#2d2d2d" : "#fafafa",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "15px",
                        }}
                      >
                        <div style={{ flex: "1", minWidth: "200px" }}>
                          <h3
                            style={{
                              margin: "0 0 8px 0",
                              color: isDarkMode ? "#ffffff" : "#333",
                            }}
                          >
                            Order #{order.id}
                          </h3>
                          <p
                            style={{
                              margin: "4px 0",
                              color: isDarkMode ? "#cccccc" : "#666",
                              fontSize: "0.9rem",
                            }}
                          >
                            📅{" "}
                            {new Date(order.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                          <p
                            style={{
                              margin: "4px 0",
                              color: isDarkMode ? "#cccccc" : "#666",
                              fontSize: "0.9rem",
                            }}
                          >
                            📦 {order.items} item(s) •{" "}
                            {order.products.join(", ")}
                          </p>
                          <p
                            style={{
                              margin: "8px 0 0 0",
                              fontWeight: "600",
                              fontSize: "1.1rem",
                              color: "#28a745",
                            }}
                          >
                            ₹{order.total.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: "10px",
                          }}
                        >
                          <span
                            style={{
                              padding: "6px 15px",
                              backgroundColor: getStatusColor(order.status),
                              color: "white",
                              borderRadius: "20px",
                              fontSize: "0.85rem",
                              fontWeight: "600",
                            }}
                          >
                            {order.status}
                          </span>
                          <button
                            style={{
                              padding: "8px 20px",
                              backgroundColor: "white",
                              color: "#007bff",
                              border: "2px solid #007bff",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontWeight: "600",
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "60px 20px",
                      color: "#999",
                    }}
                  >
                    <p style={{ fontSize: "3rem", margin: "0 0 15px 0" }}>📦</p>
                    <p style={{ fontSize: "1.2rem", margin: "0" }}>
                      No orders yet
                    </p>
                    <button
                      onClick={() => navigate("/")}
                      style={{
                        marginTop: "20px",
                        padding: "12px 30px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div>
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
                      margin: "0",
                      color: isDarkMode ? "#ffffff" : "#333",
                    }}
                  >
                    Saved Addresses
                  </h2>
                  <button
                    onClick={handleAddAddress}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    + Add New Address
                  </button>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      style={{
                        padding: "20px",
                        border: address.isDefault
                          ? "2px solid #28a745"
                          : isDarkMode
                          ? "2px solid #444"
                          : "2px solid #e0e0e0",
                        borderRadius: "12px",
                        backgroundColor: isDarkMode ? "#2d2d2d" : "#fafafa",
                        position: "relative",
                      }}
                    >
                      {address.isDefault && (
                        <span
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            padding: "4px 10px",
                            backgroundColor: "#28a745",
                            color: "white",
                            borderRadius: "12px",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                          }}
                        >
                          DEFAULT
                        </span>
                      )}
                      <h3
                        style={{
                          margin: "0 0 10px 0",
                          color: isDarkMode ? "#ffffff" : "#333",
                        }}
                      >
                        {address.type}
                      </h3>
                      <p
                        style={{
                          margin: "5px 0",
                          color: isDarkMode ? "#cccccc" : "#666",
                          lineHeight: "1.6",
                        }}
                      >
                        <strong>{address.name}</strong>
                        <br />
                        {address.address}
                        <br />
                        {address.city}, {address.state}
                        <br />
                        PIN: {address.pincode}
                        <br />
                        📞 {address.phone}
                      </p>
                      <div
                        style={{
                          marginTop: "15px",
                          display: "flex",
                          gap: "10px",
                          flexDirection: "column",
                        }}
                      >
                        <div style={{ display: "flex", gap: "10px" }}>
                          <button
                            onClick={() => handleEditAddress(address)}
                            style={{
                              flex: "1",
                              padding: "8px",
                              backgroundColor: "white",
                              color: "#007bff",
                              border: "2px solid #007bff",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontWeight: "600",
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                            style={{
                              flex: "1",
                              padding: "8px",
                              backgroundColor: "white",
                              color: "#dc3545",
                              border: "2px solid #dc3545",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontWeight: "600",
                            }}
                          >
                            Delete
                          </button>
                        </div>
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            style={{
                              width: "100%",
                              padding: "8px",
                              backgroundColor: "#28a745",
                              color: "white",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontWeight: "600",
                              fontSize: "0.9rem",
                            }}
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Address Modal */}
                {showAddressModal && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1000,
                    }}
                    onClick={() => setShowAddressModal(false)}
                  >
                    <div
                      style={{
                        backgroundColor: isDarkMode ? "#2d2d2d" : "white",
                        padding: "30px",
                        borderRadius: "15px",
                        maxWidth: "500px",
                        width: "90%",
                        maxHeight: "90vh",
                        overflowY: "auto",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h2
                        style={{
                          marginTop: 0,
                          color: isDarkMode ? "#ffffff" : "#333",
                        }}
                      >
                        {editingAddress ? "Edit Address" : "Add New Address"}
                      </h2>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "15px",
                        }}
                      >
                        {/* Address Type */}
                        <div>
                          <label
                            style={{
                              display: "block",
                              marginBottom: "8px",
                              fontWeight: "600",
                              color: isDarkMode ? "#cccccc" : "#555",
                            }}
                          >
                            Address Type *
                          </label>
                          <select
                            value={addressForm.type}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                type: e.target.value,
                              })
                            }
                            style={{
                              width: "100%",
                              padding: "12px",
                              border: isDarkMode
                                ? "2px solid #444"
                                : "2px solid #e0e0e0",
                              borderRadius: "8px",
                              fontSize: "1rem",
                              backgroundColor: isDarkMode
                                ? "#1a1a1a"
                                : "#ffffff",
                              color: isDarkMode ? "#ffffff" : "#333",
                            }}
                          >
                            <option value="Home">Home</option>
                            <option value="Office">Office</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        {/* Full Name */}
                        <div>
                          <label
                            style={{
                              display: "block",
                              marginBottom: "8px",
                              fontWeight: "600",
                              color: isDarkMode ? "#cccccc" : "#555",
                            }}
                          >
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={addressForm.name}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                name: e.target.value,
                              })
                            }
                            placeholder="Enter full name"
                            style={{
                              width: "100%",
                              padding: "12px",
                              border: isDarkMode
                                ? "2px solid #444"
                                : "2px solid #e0e0e0",
                              borderRadius: "8px",
                              fontSize: "1rem",
                              backgroundColor: isDarkMode
                                ? "#1a1a1a"
                                : "#ffffff",
                              color: isDarkMode ? "#ffffff" : "#333",
                            }}
                          />
                        </div>

                        {/* Address */}
                        <div>
                          <label
                            style={{
                              display: "block",
                              marginBottom: "8px",
                              fontWeight: "600",
                              color: isDarkMode ? "#cccccc" : "#555",
                            }}
                          >
                            Complete Address *
                          </label>
                          <textarea
                            value={addressForm.address}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                address: e.target.value,
                              })
                            }
                            placeholder="House No., Building Name, Street, Area"
                            rows="3"
                            style={{
                              width: "100%",
                              padding: "12px",
                              border: isDarkMode
                                ? "2px solid #444"
                                : "2px solid #e0e0e0",
                              borderRadius: "8px",
                              fontSize: "1rem",
                              backgroundColor: isDarkMode
                                ? "#1a1a1a"
                                : "#ffffff",
                              color: isDarkMode ? "#ffffff" : "#333",
                              fontFamily: "inherit",
                              resize: "vertical",
                            }}
                          />
                        </div>

                        {/* City */}
                        <div>
                          <label
                            style={{
                              display: "block",
                              marginBottom: "8px",
                              fontWeight: "600",
                              color: isDarkMode ? "#cccccc" : "#555",
                            }}
                          >
                            City *
                          </label>
                          <input
                            type="text"
                            value={addressForm.city}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                city: e.target.value,
                              })
                            }
                            placeholder="Enter city"
                            style={{
                              width: "100%",
                              padding: "12px",
                              border: isDarkMode
                                ? "2px solid #444"
                                : "2px solid #e0e0e0",
                              borderRadius: "8px",
                              fontSize: "1rem",
                              backgroundColor: isDarkMode
                                ? "#1a1a1a"
                                : "#ffffff",
                              color: isDarkMode ? "#ffffff" : "#333",
                            }}
                          />
                        </div>

                        {/* State */}
                        <div>
                          <label
                            style={{
                              display: "block",
                              marginBottom: "8px",
                              fontWeight: "600",
                              color: isDarkMode ? "#cccccc" : "#555",
                            }}
                          >
                            State *
                          </label>
                          <input
                            type="text"
                            value={addressForm.state}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                state: e.target.value,
                              })
                            }
                            placeholder="Enter state"
                            style={{
                              width: "100%",
                              padding: "12px",
                              border: isDarkMode
                                ? "2px solid #444"
                                : "2px solid #e0e0e0",
                              borderRadius: "8px",
                              fontSize: "1rem",
                              backgroundColor: isDarkMode
                                ? "#1a1a1a"
                                : "#ffffff",
                              color: isDarkMode ? "#ffffff" : "#333",
                            }}
                          />
                        </div>

                        {/* Pincode */}
                        <div>
                          <label
                            style={{
                              display: "block",
                              marginBottom: "8px",
                              fontWeight: "600",
                              color: isDarkMode ? "#cccccc" : "#555",
                            }}
                          >
                            Pincode *
                          </label>
                          <input
                            type="text"
                            value={addressForm.pincode}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                pincode: e.target.value,
                              })
                            }
                            placeholder="6-digit pincode"
                            maxLength="6"
                            style={{
                              width: "100%",
                              padding: "12px",
                              border: isDarkMode
                                ? "2px solid #444"
                                : "2px solid #e0e0e0",
                              borderRadius: "8px",
                              fontSize: "1rem",
                              backgroundColor: isDarkMode
                                ? "#1a1a1a"
                                : "#ffffff",
                              color: isDarkMode ? "#ffffff" : "#333",
                            }}
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label
                            style={{
                              display: "block",
                              marginBottom: "8px",
                              fontWeight: "600",
                              color: isDarkMode ? "#cccccc" : "#555",
                            }}
                          >
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={addressForm.phone}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                phone: e.target.value,
                              })
                            }
                            placeholder="+91 9876543210"
                            style={{
                              width: "100%",
                              padding: "12px",
                              border: isDarkMode
                                ? "2px solid #444"
                                : "2px solid #e0e0e0",
                              borderRadius: "8px",
                              fontSize: "1rem",
                              backgroundColor: isDarkMode
                                ? "#1a1a1a"
                                : "#ffffff",
                              color: isDarkMode ? "#ffffff" : "#333",
                            }}
                          />
                        </div>

                        {/* Set as Default */}
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                            color: isDarkMode ? "#cccccc" : "#555",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={addressForm.isDefault}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                isDefault: e.target.checked,
                              })
                            }
                            style={{
                              width: "18px",
                              height: "18px",
                              cursor: "pointer",
                            }}
                          />
                          Set as default address
                        </label>
                      </div>

                      {/* Buttons */}
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "25px",
                        }}
                      >
                        <button
                          onClick={() => setShowAddressModal(false)}
                          style={{
                            flex: 1,
                            padding: "12px",
                            backgroundColor: "transparent",
                            color: isDarkMode ? "#ffffff" : "#666",
                            border: isDarkMode
                              ? "2px solid #444"
                              : "2px solid #e0e0e0",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "1rem",
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveAddress}
                          style={{
                            flex: 1,
                            padding: "12px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "1rem",
                          }}
                        >
                          {editingAddress ? "Update Address" : "Save Address"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Coupons Tab */}
            {activeTab === "coupons" && (
              <div>
                <h2
                  style={{
                    marginTop: "0",
                    marginBottom: "25px",
                    color: isDarkMode ? "#ffffff" : "#333",
                  }}
                >
                  Available Coupons
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(350px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {[
                    {
                      code: "WELCOME50",
                      discount: "50% OFF",
                      desc: "On your first order above ₹999",
                      expiry: "31 Dec 2025",
                      color: "#667eea",
                    },
                    {
                      code: "SAVE100",
                      discount: "₹100 OFF",
                      desc: "On orders above ₹500",
                      expiry: "15 Nov 2025",
                      color: "#f093fb",
                    },
                    {
                      code: "FESTIVE25",
                      discount: "25% OFF",
                      desc: "On electronics",
                      expiry: "05 Nov 2025",
                      color: "#43e97b",
                    },
                  ].map((coupon, index) => (
                    <div
                      key={index}
                      style={{
                        background: `linear-gradient(135deg, ${coupon.color} 0%, ${coupon.color}dd 100%)`,
                        padding: "20px",
                        borderRadius: "12px",
                        color: "white",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-20px",
                          right: "-20px",
                          width: "80px",
                          height: "80px",
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <h3 style={{ margin: "0 0 5px 0", fontSize: "1.5rem" }}>
                        {coupon.discount}
                      </h3>
                      <p
                        style={{
                          margin: "0 0 15px 0",
                          opacity: 0.9,
                          fontSize: "0.9rem",
                        }}
                      >
                        {coupon.desc}
                      </p>
                      <div
                        style={{
                          padding: "10px 15px",
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                          borderRadius: "8px",
                          display: "inline-block",
                          marginBottom: "15px",
                        }}
                      >
                        <code
                          style={{
                            color: "#333",
                            fontWeight: "700",
                            fontSize: "1.1rem",
                            letterSpacing: "1px",
                          }}
                        >
                          {coupon.code}
                        </code>
                      </div>
                      <p
                        style={{
                          margin: "0",
                          fontSize: "0.8rem",
                          opacity: 0.8,
                        }}
                      >
                        Valid till {coupon.expiry}
                      </p>
                      <button
                        style={{
                          marginTop: "15px",
                          width: "100%",
                          padding: "10px",
                          backgroundColor: "white",
                          color: coupon.color,
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "600",
                          fontSize: "0.95rem",
                        }}
                      >
                        Copy Code
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <p style={{ fontSize: "3rem", margin: "0 0 15px 0" }}>❤️</p>
                <h3
                  style={{
                    margin: "0 0 10px 0",
                    color: isDarkMode ? "#ffffff" : "#333",
                  }}
                >
                  Your Wishlist is Empty
                </h3>
                <p
                  style={{
                    color: isDarkMode ? "#cccccc" : "#666",
                    marginBottom: "20px",
                  }}
                >
                  Save your favorite items here
                </p>
                <button
                  onClick={() => navigate("/wishlist")}
                  style={{
                    padding: "12px 30px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Go to Wishlist
                </button>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2
                  style={{
                    marginTop: "0",
                    marginBottom: "25px",
                    color: isDarkMode ? "#ffffff" : "#333",
                  }}
                >
                  Account Settings
                </h2>

                {/* Dark Mode Toggle - Special Section */}
                <div
                  style={{
                    padding: "20px",
                    border: isDarkMode ? "2px solid #444" : "2px solid #e0e0e0",
                    borderRadius: "12px",
                    backgroundColor: isDarkMode ? "#2d2d2d" : "#fafafa",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <span style={{ fontSize: "2rem" }}>
                      {isDarkMode ? "🌙" : "☀️"}
                    </span>
                    <div>
                      <h3
                        style={{
                          margin: "0 0 5px 0",
                          color: isDarkMode ? "#ffffff" : "#333",
                        }}
                      >
                        Dark Mode
                      </h3>
                      <p
                        style={{
                          margin: "0",
                          color: isDarkMode ? "#cccccc" : "#666",
                          fontSize: "0.9rem",
                        }}
                      >
                        {isDarkMode
                          ? "Dark theme enabled"
                          : "Light theme enabled"}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <label
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "60px",
                      height: "34px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: isDarkMode ? "#28a745" : "#ccc",
                        transition: "0.4s",
                        borderRadius: "34px",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          content: "",
                          height: "26px",
                          width: "26px",
                          left: isDarkMode ? "30px" : "4px",
                          bottom: "4px",
                          backgroundColor: "white",
                          transition: "0.4s",
                          borderRadius: "50%",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        }}
                      ></span>
                    </span>
                  </label>
                </div>

                {/* Other Settings */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  {[
                    {
                      icon: "🔒",
                      title: "Change Password",
                      desc: "Update your password regularly",
                    },
                    {
                      icon: "🔔",
                      title: "Notifications",
                      desc: "Manage email and push notifications",
                    },
                    {
                      icon: "🌐",
                      title: "Language & Region",
                      desc: "English (India)",
                    },
                    {
                      icon: "💳",
                      title: "Payment Methods",
                      desc: "Manage saved cards and UPI",
                    },
                    {
                      icon: "🔐",
                      title: "Privacy & Security",
                      desc: "Control your data and privacy",
                    },
                    {
                      icon: "❓",
                      title: "Help & Support",
                      desc: "Get help with your orders",
                    },
                  ].map((setting, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "20px",
                        border: isDarkMode
                          ? "2px solid #444"
                          : "2px solid #e0e0e0",
                        borderRadius: "12px",
                        backgroundColor: isDarkMode ? "#2d2d2d" : "#fafafa",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = "#28a745";
                        e.currentTarget.style.backgroundColor = isDarkMode
                          ? "#333333"
                          : "#f8fff9";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = isDarkMode
                          ? "#444"
                          : "#e0e0e0";
                        e.currentTarget.style.backgroundColor = isDarkMode
                          ? "#2d2d2d"
                          : "#fafafa";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}
                      >
                        <span style={{ fontSize: "2rem" }}>{setting.icon}</span>
                        <div>
                          <h3
                            style={{
                              margin: "0 0 5px 0",
                              color: isDarkMode ? "#ffffff" : "#333",
                            }}
                          >
                            {setting.title}
                          </h3>
                          <p
                            style={{
                              margin: "0",
                              color: isDarkMode ? "#cccccc" : "#666",
                              fontSize: "0.9rem",
                            }}
                          >
                            {setting.desc}
                          </p>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "1.5rem",
                          color: isDarkMode ? "#666" : "#999",
                        }}
                      >
                        ›
                      </span>
                    </div>
                  ))}

                  {/* Logout Button */}
                  <div
                    onClick={() => {
                      localStorage.removeItem("userToken");
                      localStorage.removeItem("userName");
                      localStorage.removeItem("userEmail");
                      alert("Logged out successfully");
                      navigate("/login");
                    }}
                    style={{
                      padding: "20px",
                      border: "2px solid #dc3545",
                      borderRadius: "12px",
                      backgroundColor: isDarkMode ? "#2d2d2d" : "#fff5f5",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      marginTop: "15px",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "#dc3545";
                      e.currentTarget.style.backgroundColor = isDarkMode
                        ? "#3d1f1f"
                        : "#ffe5e5";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "#dc3545";
                      e.currentTarget.style.backgroundColor = isDarkMode
                        ? "#2d2d2d"
                        : "#fff5f5";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <span style={{ fontSize: "2rem" }}>🚪</span>
                      <div>
                        <h3
                          style={{
                            margin: "0 0 5px 0",
                            color: "#dc3545",
                            fontWeight: "700",
                          }}
                        >
                          Logout
                        </h3>
                        <p
                          style={{
                            margin: "0",
                            color: isDarkMode ? "#cccccc" : "#666",
                            fontSize: "0.9rem",
                          }}
                        >
                          Sign out from your account
                        </p>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "1.5rem",
                        color: "#dc3545",
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
