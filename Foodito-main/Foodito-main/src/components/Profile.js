

"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ShoppingBag, Heart, Bell, User, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react"
import axios from "axios"
import "./profile.css"

// Backend API URL - change this to your actual backend URL
const API_URL = "https://backend.sealpnut.com/api"

const Profile = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in and fetch user data
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsLoggedIn(true)
      fetchUserData(token)
      fetchOrders(token)
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(response.data.data)
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const fetchOrders = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setOrders(response.data.data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
    navigate("/")
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  // Get status class based on order status
  const getStatusClass = (status) => {
    switch (status) {
      case "delivered":
        return "profile-status-delivered"
      case "processing":
        return "profile-status-processing"
      case "shipped":
        return "profile-status-shipped"
      case "cancelled":
        return "profile-status-cancelled"
      default:
        return ""
    }
  }

  return (
    <div className="profile-container">
      {/* Header */}
      <header className="profile-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft className="back-icon" />
        </button>
        <h1 className="profile-title">My Profile</h1>
      </header>

      {/* User Info Section */}
      <section className="profile-user-section">
        <div className="profile-user-card">
          {isLoggedIn ? (
            <>
              <div className="profile-avatar">
                <User size={40} />
              </div>
              <div className="profile-user-info">
                <h2 className="profile-user-name">{user?.name || "User"}</h2>
                <p className="profile-user-email">{user?.email || "user@example.com"}</p>
              </div>
              <button className="profile-edit-button" onClick={() => navigate("/edit-profile")}>
                Edit
              </button>
            </>
          ) : (
            <>
              <div className="profile-avatar">
                <User size={40} />
              </div>
              <div className="profile-user-info">
                <h2 className="profile-user-name">Welcome</h2>
                <p className="profile-user-email">Sign in to access your account</p>
              </div>
              <Link to="/login" className="profile-signin-button">
                Sign In
              </Link>
            </>
          )}
        </div>
      </section>

      {/* My Orders Section */}
      <section className="profile-section">
        <div className="profile-section-header">
          <h2 className="profile-section-title">My Orders</h2>
          {isLoggedIn && orders.length > 0 && (
            <Link to="/orders" className="profile-view-all">
              View All
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="profile-loading">
            <div className="loading-spinner"></div>
            <p>Loading orders...</p>
          </div>
        ) : isLoggedIn ? (
          orders.length > 0 ? (
            <div className="profile-orders-list">
              {orders.slice(0, 2).map((order) => (
                <div key={order._id} className="profile-order-card" onClick={() => navigate(`/orders/${order._id}`)}>
                  <div className="profile-order-info">
                    <div className="profile-order-header">
                      <h3 className="profile-order-id">#{order._id.substring(0, 8)}</h3>
                      <span className={`profile-order-status ${getStatusClass(order.orderStatus)}`}>
                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                      </span>
                    </div>
                    <p className="profile-order-date">{formatDate(order.createdAt)}</p>
                    <p className="profile-order-items">
                      {order.items.length} items • ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <ChevronRight className="profile-order-arrow" />
                </div>
              ))}
            </div>
          ) : (
            <div className="profile-empty-state">
              <ShoppingBag size={48} className="profile-empty-icon" />
              <p className="profile-empty-text">You haven't placed any orders yet</p>
              <Link to="/" className="profile-shop-now-button">
                Shop Now
              </Link>
            </div>
          )
        ) : (
          <div className="profile-signin-prompt">
            <p>Sign in to view your orders</p>
            <Link to="/login" className="profile-signin-link">
              Sign In
            </Link>
          </div>
        )}
      </section>

      {/* Account Menu */}
      <section className="profile-section">
        <h2 className="profile-section-title">Account Settings</h2>
        <div className="profile-menu">
          <Link to="/wishlist" className="profile-menu-item">
            <Heart className="profile-menu-icon" />
            <span className="profile-menu-text">My Wishlist</span>
            <ChevronRight className="profile-menu-arrow" />
          </Link>

          <Link to="/notifications" className="profile-menu-item">
            <Bell className="profile-menu-icon" />
            <span className="profile-menu-text">Notifications</span>
            <ChevronRight className="profile-menu-arrow" />
          </Link>

          <Link to="/settings" className="profile-menu-item">
            <Settings className="profile-menu-icon" />
            <span className="profile-menu-text">Settings</span>
            <ChevronRight className="profile-menu-arrow" />
          </Link>
        </div>
      </section>

      {/* Support Menu */}
      <section className="profile-section">
        <h2 className="profile-section-title">Support</h2>
        <div className="profile-menu">
          <Link to="/help" className="profile-menu-item">
            <HelpCircle className="profile-menu-icon" />
            <span className="profile-menu-text">Help Center</span>
            <ChevronRight className="profile-menu-arrow" />
          </Link>

          <Link to="/invite" className="profile-menu-item">
            <span className="profile-menu-icon">👥</span>
            <div className="profile-menu-content">
              <span className="profile-menu-text">Invite Friends & Earn</span>
              <span className="profile-menu-subtitle">You get $10 for every friend</span>
            </div>
            <ChevronRight className="profile-menu-arrow" />
          </Link>

          <Link to="/terms" className="profile-menu-item">
            <span className="profile-menu-icon">📄</span>
            <span className="profile-menu-text">Terms & Conditions</span>
            <ChevronRight className="profile-menu-arrow" />
          </Link>

          <Link to="/privacy" className="profile-menu-item">
            <span className="profile-menu-icon">🔒</span>
            <span className="profile-menu-text">Privacy Policy</span>
            <ChevronRight className="profile-menu-arrow" />
          </Link>
        </div>
      </section>

      {/* Logout Button (only shown if logged in) */}
      {isLoggedIn && (
        <button className="profile-logout-button" onClick={handleLogout}>
          <LogOut className="profile-logout-icon" />
          <span>Logout</span>
        </button>
      )}

      {/* App Version */}
      <footer className="profile-footer">
        <p className="profile-version">Version 1.0.0</p>
      </footer>
    </div>
  )
}

export default Profile

