"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ArrowLeft, CheckCircle, Package, Truck, Home } from "lucide-react"
import axios from "axios"
import "./Orderdetail.css"

// Backend API URL - change this to your actual backend URL
const API_URL = "https://backend.sealpnut.com/api"

const OrderDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    fetchOrderDetails(token)
  }, [id, navigate])

  const fetchOrderDetails = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setOrder(response.data.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching order details:", error)
      setIsLoading(false)
      if (error.response && error.response.status === 404) {
        alert("Order not found")
        navigate("/profile")
      }
    }
  }

  const handleCancelOrder = async (orderId) => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    try {
      await axios.put(
        `${API_URL}/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      // After successful cancellation, refetch order details to update the UI
      fetchOrderDetails(token)
      alert("Order cancelled successfully!")
    } catch (error) {
      console.error("Error cancelling order:", error)
      alert("Failed to cancel order.")
    }
  }

  if (isLoading) {
    return (
      <div className="order-loading">
        <div className="loading-spinner"></div>
        <p>Loading order details...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="order-error">
        <p>Order not found</p>
        <Link to="/profile" className="back-to-profile-btn">
          Back to Profile
        </Link>
      </div>
    )
  }

  // Calculate order progress percentage based on status
  const getOrderProgress = () => {
    switch (order.orderStatus) {
      case "processing":
        return 25
      case "shipped":
        return 50
      case "delivered":
        return 100
      case "cancelled":
        return 0
      default:
        return 25
    }
  }

  return (
    <div className="order-details-container">
      {/* Header */}
      <header className="order-details-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="order-details-title">Order Details</h1>
      </header>

      <div className="order-details-card">
        <div className="order-id">
          <h2>Order #{order._id.substring(0, 8)}</h2>
          <p>Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Order Status */}
        <div className="order-status-tracker">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${getOrderProgress()}%` }}></div>
          </div>

          <div className="order-status">
            <div
              className={`status-step ${order.orderStatus === "processing" || order.orderStatus === "shipped" || order.orderStatus === "delivered" ? "completed" : ""}`}
            >
              <CheckCircle className="status-icon" />
              <div className="status-text">
                <h3>Order Confirmed</h3>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div
              className={`status-step ${order.orderStatus === "shipped" || order.orderStatus === "delivered" ? "completed" : ""}`}
            >
              <Package className="status-icon" />
              <div className="status-text">
                <h3>Processing</h3>
                <p>{order.orderStatus === "processing" ? "In progress" : "Completed"}</p>
              </div>
            </div>
            <div className={`status-step ${order.orderStatus === "delivered" ? "completed" : ""}`}>
              <Truck className="status-icon" />
              <div className="status-text">
                <h3>Shipping</h3>
                <p>{order.orderStatus === "shipped" || order.orderStatus === "delivered" ? "In transit" : "Pending"}</p>
              </div>
            </div>
            <div className={`status-step ${order.orderStatus === "delivered" ? "completed" : ""}`}>
              <Home className="status-icon" />
              <div className="status-text">
                <h3>Delivery</h3>
                <p>{order.orderStatus === "delivered" ? "Delivered" : "Pending"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="shipping-address">
          <h3>Shipping Address</h3>
          <p>{order.shippingAddress.street}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}
          </p>
          <p>Country: {order.shippingAddress.country}</p>
        </div>

        {/* Payment Information */}
        <div className="payment-info">
          <h3>Payment Information</h3>
          <p>
            <strong>Method:</strong> {getPaymentMethodName(order.paymentMethod)}
          </p>
          <p>
            <strong>Status:</strong> {getPaymentStatusName(order.paymentStatus)}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="order-items-card">
        <h2>Order Items</h2>
        <div className="order-items-list">
          {order.items.map((item, index) => (
            <div key={index} className="order-item">
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Qty: {item.quantity}</p>
                <p className="item-price">₹{item.price.toFixed(2)}</p>
              </div>
              <div className="item-total">₹{(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="order-total">
          <div className="price-row">
            <span>Subtotal</span>
            <span>₹{order.totalAmount.toFixed(2)}</span>
          </div>
          <div className="price-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="price-row total">
            <span>Total</span>
            <span>₹{order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="order-actions">
        {order.orderStatus === "processing" && (
          <button className="cancel-order-btn" onClick={() => handleCancelOrder(order._id)}>
            Cancel Order
          </button>
        )}
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

// Helper function to get payment method display name
function getPaymentMethodName(method) {
  switch (method) {
    case "cash_on_delivery":
      return "Cash on Delivery"
    case "credit_card":
      return "Credit/Debit Card"
    case "paypal":
      return "PayPal"
    case "upi":
      return "UPI"
    default:
      return method
  }
}

// Helper function to get payment status display name
function getPaymentStatusName(status) {
  switch (status) {
    case "pending":
      return "Pending"
    case "completed":
      return "Paid"
    case "failed":
      return "Failed"
    case "refunded":
      return "Refunded"
    default:
      return status
  }
}

export default OrderDetails

