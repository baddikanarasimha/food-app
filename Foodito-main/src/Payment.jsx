"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FaCreditCard, FaWallet, FaMoneyBillWave } from "react-icons/fa";
import axios from "axios";
import "./Payment.css";

// Import toast at the top of the file
import { Toaster, toast } from "react-hot-toast";

// Backend API URL - change this to your actual backend URL
const API_URL = "https://backend.sealpnut.com/api";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showUPIOptions, setShowUPIOptions] = useState(false);
  const [showCardOptions, setShowCardOptions] = useState(false);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load cart items and check login status on component mount
  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);

      // Fetch selected address
      const selectedAddressId = localStorage.getItem("selectedAddressId");
      if (selectedAddressId) {
        fetchSelectedAddress(token, selectedAddressId);
      } else {
        // Redirect to address page if no address is selected
        alert("Please select a delivery address");
        navigate("/address");
      }
    } else {
      // Redirect non-logged in users
      alert("Please login to proceed with payment");
      navigate("/login");
    }

    // Load cart items
    const savedCart = localStorage.getItem("carts");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (parsedCart.length === 0) {
        // Redirect if cart is empty
        alert("Your cart is empty");
        navigate("/cart");
      } else {
        setCartItems(parsedCart);
      }
    } else {
      // Redirect if cart is empty
      alert("Your cart is empty");
      navigate("/cart");
    }
  }, [navigate]);

  const fetchSelectedAddress = async (token, addressId) => {
    try {
      // Use the dedicated address API endpoint
      const response = await axios.get(`${API_URL}/address`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.data) {
        const address = response.data.data.find(
          (addr) => addr._id === addressId
        );
        if (address) {
          setSelectedAddress(address);
        } else {
          // If address not found, redirect to address page
          alert("Please select a delivery address");
          navigate("/address");
        }
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      alert("Error fetching address. Please try again.");
      navigate("/address");
    }
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const toggleUPIOptions = () => {
    setShowUPIOptions(!showUPIOptions);
  };

  const toggleCardOptions = () => {
    setShowCardOptions(!showCardOptions);
  };

  const toggleWalletOptions = () => {
    setShowWalletOptions(!showWalletOptions);
  };

  // Calculate cart totals - matching the Cart component structure
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const deliveryFee = 3; // Static delivery fee to match Cart component
  const total = subtotal + deliveryFee; // Calculate total

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      alert("Please login to place an order");
      navigate("/login");
      return;
    }

    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (!selectedAddress) {
      alert("Please select a delivery address");
      navigate("/address");
      return;
    }

    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");

      // Create order object
      const order = {
        items: cartItems.map((item) => ({
          product: item.id.toString(),
          name: item.itemname,
          price: item.price,
          quantity: item.quantity || 1,
        })),
        totalAmount: total, // Use the total calculated above
        shippingAddress: {
          street: selectedAddress.address,
          city: selectedAddress.locality,
          state: selectedAddress.state,
          zipCode: selectedAddress.pinCode,
          country: "India",
        },
        paymentMethod: selectedPaymentMethod,
        paymentStatus:
          selectedPaymentMethod === "cod" ? "pending" : "completed",
        orderStatus: "processing",
      };

      // Send order to backend using the orders API
      const response = await axios.post(`${API_URL}/orders`, order, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Clear cart
      localStorage.removeItem("carts");

      // Store order details for confirmation page
      localStorage.setItem(
        "lastOrder",
        JSON.stringify({
          orderId: response.data.data._id,
          items: cartItems,
          totalAmount: total, // Use the total calculated above
          paymentMethod: selectedPaymentMethod,
          shippingAddress: selectedAddress,
          orderDate: new Date().toISOString(),
        })
      );

      // Add toast notification here
      toast.success("Order placed successfully!", {
        position: "top-center",
        duration: 3000,
      });

      // Redirect to confirmation page
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-page">
      {/* Header */}
      <div className="payment-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="payment-title">Payment</h1>
      </div>

      {/* Selected Address Summary */}
      {selectedAddress && (
        <div className="card selected-address-summary">
          <h3>Delivery Address</h3>
          <div className="address-details">
            <p className="address-name">{selectedAddress.name}</p>
            <p>{selectedAddress.address}</p>
            <p>
              {selectedAddress.locality}, {selectedAddress.state} -{" "}
              {selectedAddress.pinCode}
            </p>
            <p>Mobile: {selectedAddress.mobileNo}</p>
          </div>
        </div>
      )}

      {/* Payment Method Section */}
      <div className="card payment-method-section">
        <h3>Recommended Payment Options</h3>
        <div className="radio-button">
          <input
            type="radio"
            id="cod"
            name="payment"
            value="cash_on_delivery"
            checked={selectedPaymentMethod === "cash_on_delivery"}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="cod">
            <FaMoneyBillWave /> Cash on Delivery (Cash/UPI)
          </label>
        </div>

        <h3>Online Payment Options</h3>
        <div className="radio-button" onClick={toggleUPIOptions}>
          <input
            type="radio"
            id="upi"
            name="payment"
            value="upi"
            checked={selectedPaymentMethod === "upi"}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="upi">
            <FaCreditCard /> UPI (Pay via any App)
          </label>
        </div>
        {showUPIOptions && (
          <div className="options-list">
            <p>Available UPI Options:</p>
            <ul>
              <li>GPay</li>
              <li>PhonePe</li>
              <li>Paytm</li>
            </ul>
          </div>
        )}

        <div className="radio-button" onClick={toggleCardOptions}>
          <input
            type="radio"
            id="credit-debit"
            name="payment"
            value="credit_card"
            checked={selectedPaymentMethod === "credit_card"}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="credit-debit">
            <FaCreditCard /> Credit/Debit Card
          </label>
        </div>
        {showCardOptions && (
          <div className="options-list">
            <p>Available Cards:</p>
            <ul>
              <li>SBI Card</li>
              <li>HDFC Card</li>
              <li>ICICI Card</li>
              <li>Axis Card</li>
            </ul>
          </div>
        )}

        <div className="radio-button" onClick={toggleWalletOptions}>
          <input
            type="radio"
            id="wallets"
            name="payment"
            value="paypal"
            checked={selectedPaymentMethod === "paypal"}
            onChange={handlePaymentMethodChange}
          />
          <label htmlFor="wallets">
            <FaWallet /> Wallets
          </label>
        </div>
        {showWalletOptions && (
          <div className="options-list">
            <p>Available Wallets:</p>
            <ul>
              <li>Paytm Wallet</li>
              <li>Mobikwik</li>
              <li>Freecharge</li>
              <li>Amazon Pay</li>
            </ul>
          </div>
        )}
      </div>

      {/* Price Details Section */}
      <div className="card price-details">
        <h3>
          Price Details ({cartItems.length}{" "}
          {cartItems.length === 1 ? "Item" : "Items"})
        </h3>
        <div className="price-item">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="price-item">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="total-amount">
          <span>Total Amount</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Pay Now Button */}
      <button
        className="pay-now-button"
        disabled={!selectedPaymentMethod || isProcessing}
        onClick={handlePlaceOrder}
      >
        {isProcessing ? "Processing..." : "Place Order"}
      </button>
      <Toaster />
    </div>
  );
};

export default PaymentPage;
