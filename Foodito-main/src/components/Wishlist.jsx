

"use client";

import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Heart, ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Replace useRouter with useNavigate
import "./wishlist.css";

const Wishlist = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  // Initialize wishlist from localStorage
  const [wishlist, setWishlist] = useState([]);

  // Initialize cart from localStorage
  const [cart, setCart] = useState([]);

  // Load data on component mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    const parsedWishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
    setWishlist(parsedWishlist);

    const savedCart = localStorage.getItem("carts");
    const parsedCart = savedCart ? JSON.parse(savedCart).filter((item) => item !== null) : [];
    setCart(parsedCart);
  }, []);

  // Function to remove item from wishlist
  const removeFromWishlist = (id) => {
    const item = wishlist.find((item) => item.id === id);
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    toast.success(`${item.itemname} removed from wishlist!`, {
      position: "top-right",
      duration: 3000,
    });
  };

  // Function to add items to the cart
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      toast.success(`${item.itemname} quantity updated in cart!`, {
        position: "top-right",
        duration: 3000,
      });
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
      toast.success(`${item.itemname} added to cart!`, {
        position: "top-right",
        duration: 3000,
      });
    }

    setCart(updatedCart);
    localStorage.setItem("carts", JSON.stringify(updatedCart));
  };

  // Function to handle quantity changes in the cart
  const handleQuantityChange = (id, change) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(item.quantity + change, 0);
          if (newQuantity > 0) {
            toast.success(`${item.itemname} quantity updated in cart!`, {
              position: "top-right",
              duration: 3000,
            });
            return { ...item, quantity: newQuantity };
          } else {
            toast.error(`${item.itemname} removed from cart!`, {
              position: "top-right",
              duration: 3000,
            });
            return null; // Mark for removal
          }
        }
        return item;
      })
      .filter((item) => item !== null); // Remove items marked as null

    setCart(updatedCart);
    localStorage.setItem("carts", JSON.stringify(updatedCart));
  };

  return (
    <div className="wishlist-container">
      {/* Header with back button */}
      <div className="wishlist-header">
        <button className="back-button" onClick={() => navigate(-1)}> {/* Use navigate(-1) to go back */}
          <ArrowLeft className="back-icon" />
        </button>
        <h1>My Wishlist</h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <Heart className="empty-wishlist-icon" />
          <h2>Your wishlist is empty</h2>
          <p>Add items to your wishlist to save them for later</p>
          <button className="browse-button" onClick={() => navigate("/")}> {/* Use navigate("/") to go to home */}
            Browse Products
          </button>
        </div>
      ) : (
        <div className="wishlist-items-grid">
          {wishlist.map((item) => {
            const cartItem = cart.find((cartItem) => cartItem.id === item.id);
            return (
              <div className="wishlist-item-card" key={item.id}>
                <div className="wishlist-item-image-container">
                  <img src={item.image || "/placeholder.svg"} alt={item.itemname} className="wishlist-item-image" />
                  <button className="wishlist-remove-button" onClick={() => removeFromWishlist(item.id)}>
                    <Trash2 className="wishlist-remove-icon" />
                  </button>
                </div>

                <div className="wishlist-item-details">
                  <h3 className="wishlist-item-name">{item.itemname}</h3>
                  <div className="wishlist-item-price-container">
                    <span className="wishlist-item-original-price">${item.originalprice}</span>
                    <span className="wishlist-item-price">${item.price}</span>
                    <span className="wishlist-item-discount">-{item.discount}%</span>
                  </div>

                  {cartItem ? (
                    <div className="wishlist-quantity-controls">
                      <button className="wishlist-quantity-button" onClick={() => handleQuantityChange(item.id, -1)}>
                        -
                      </button>
                      <span className="wishlist-quantity-display">{cartItem.quantity}</span>
                      <button className="wishlist-quantity-button" onClick={() => handleQuantityChange(item.id, 1)}>
                        +
                      </button>
                    </div>
                  ) : (
                    <button className="wishlist-add-to-cart-button" onClick={() => addToCart(item)}>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Wishlist;