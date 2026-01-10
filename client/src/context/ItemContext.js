import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const itemContext = createContext();

const CustomItemContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Fetch products from backend
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Calculate total price whenever cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  }, [cart]);

  // Cart functions
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product) => {
    const index = cart.findIndex((item) => item._id === product._id);
    if (index > -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  // Filter products by search and category
  const getFilteredProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  // Wishlist functions
  const addToWishlist = (product) => {
    const existingItem = wishlist.find((item) => item._id === product._id);
    if (!existingItem) {
      setWishlist([...wishlist, product]);
      alert(`${product.name} added to wishlist!`);
    } else {
      alert("Item already in wishlist!");
    }
  };

  const removeFromWishlist = (product) => {
    setWishlist(wishlist.filter((item) => item._id !== product._id));
  };

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product);
  };

  // Available coupons
  const availableCoupons = [
    {
      code: "SAVE100",
      type: "fixed",
      value: 100,
      minOrder: 500,
      description: "₹100 OFF on orders above ₹500",
    },
    {
      code: "FESTIVE25",
      type: "percentage",
      value: 25,
      minOrder: 1000,
      description: "25% OFF on orders above ₹1000",
    },
    {
      code: "FIRST50",
      type: "percentage",
      value: 50,
      minOrder: 999,
      description: "50% OFF on orders above ₹999",
    },
  ];

  // Coupon functions
  const applyCoupon = (couponCode) => {
    const coupon = availableCoupons.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase()
    );

    if (!coupon) {
      return { success: false, message: "Invalid coupon code" };
    }

    if (totalPrice < coupon.minOrder) {
      return {
        success: false,
        message: `Minimum order of ₹${coupon.minOrder} required`,
      };
    }

    let discount = 0;
    if (coupon.type === "fixed") {
      discount = coupon.value;
    } else if (coupon.type === "percentage") {
      discount = (totalPrice * coupon.value) / 100;
    }

    setAppliedCoupon(coupon);
    setCouponDiscount(discount);

    return {
      success: true,
      message: `Coupon applied! You saved ₹${Math.floor(discount)}`,
      discount: discount,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  return (
    <itemContext.Provider
      value={{
        products,
        getProducts,
        itemsInCart: cart.length,
        cart,
        addToCart,
        removeFromCart,
        totalPrice,
        searchQuery,
        setSearchQuery,
        getFilteredProducts,
        selectedCategory,
        setSelectedCategory,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
        appliedCoupon,
        couponDiscount,
        availableCoupons,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </itemContext.Provider>
  );
};

export default CustomItemContext;
