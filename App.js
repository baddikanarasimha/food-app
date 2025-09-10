

"use client";

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Search from "./components/Search";
import Items from "./components/Items"; 
import Layout from "./Layout";
import Categories from "./components/Categories";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Notify from "./components/Notify";
import Signup from "./Signup";
import Login from "./Login";
import Address from "./Address";
import Payment from "./Payment";
import OrderConfirmation from "./Orderconfirmation"; // Ensure the file name matches
import OrderDetails from "./components/Orderdetails"; // Ensure the file name matches
import "./App.css";

function App() {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Check if user is logged in
  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn()) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/categories"
              element={<Categories setSelectedCategory={setSelectedCategory} />}
            />
             <Route
            path="/"
            element={
              <>
                <Search selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <Items selectedCategory={selectedCategory} />
              </>
            }
          />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/notify" element={<Notify />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/address" element={<Address />} />

            {/* Protected Routes */}
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-confirmation"
              element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;



