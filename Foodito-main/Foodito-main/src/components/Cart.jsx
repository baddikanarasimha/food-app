

"use client";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Import the ArrowLeft icon
import "./Carts.css";
import crossicon from "../assets/cross_icon.png";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // Hook to navigate back

  // Load cart items from local storage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("carts");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("carts", JSON.stringify(updatedCart)); // Update local storage
  };

  // Calculate the subtotal for all cart items
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const deliveryFee = 3; // Static delivery fee
  const total = subtotal + deliveryFee; // Calculate total

  return (
    <div className="cart-container">
      {/* Back Button and Title */}
      <div className="cart-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft className="back-icon" />
        </button>
        <h1 className="cart-title">Your Cart</h1>
      </div>

      {/* Headings for the cart items - only visible on larger screens */}
      <div className="cartitems desktop-only">
        <div>Food Item</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Total</div>
        <div>Remove</div>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                {/* Item details */}
                <div className="item-info">
                  <div className="item-image-container">
                    <img src={item.image || "/placeholder.svg"} alt={item.itemname} className="item-image" />
                  </div>
                  <div className="item-name">{item.itemname}</div>
                </div>

                {/* Mobile view - price, quantity, total in a grid */}
                <div className="mobile-details">
                  <div className="mobile-detail">
                    <span className="detail-label">Price</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                  <div className="mobile-detail">
                    <span className="detail-label">Qty</span>
                    <span>{item.quantity || 1}</span>
                  </div>
                  <div className="mobile-detail">
                    <span className="detail-label">Total</span>
                    <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                </div>

                {/* Desktop view - each in its own column */}
                <div className="desktop-price desktop-only">${item.price.toFixed(2)}</div>
                <div className="desktop-quantity desktop-only">{item.quantity || 1}</div>
                <div className="desktop-total desktop-only">${(item.price * (item.quantity || 1)).toFixed(2)}</div>

                {/* Remove button */}
                <div className="remove-button-container">
                  <button className="remove-button" onClick={() => removeFromCart(index)}>
                    <img src={crossicon || "/placeholder.svg"} alt="Remove" className="cross-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-bottom">
            {/* Promo code section */}
            <div className="promocode">
              <p>If you have any promo code, enter here</p>
              <div className="promo-input-container">
                <input type="text" placeholder="Promo code" />
                <button>Submit</button>
              </div>
            </div>

            {/* Cart totals section */}
            <div className="cart-totals">
              <h2>Cart Totals</h2>
              <div className="prices">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <hr />
              <div className="prices">
                <p>Delivery Fee</p>
                <p>${deliveryFee.toFixed(2)}</p>
              </div>
              <hr />
              <div className="prices">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <Link to="/Address">
                <button id="proceed">PROCEED TO CHECK OUT</button>
              </Link>
            </div>
          </div>
        </>
      )}
      <Toaster />
    </div>
  );
};

export default Cart;