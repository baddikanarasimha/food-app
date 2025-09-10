



import React, { useState } from "react";
import "./App.css";
import profileIcon from "./assets/profile_icon.png";
import homeIcon from "./assets/home-button.png";
import categoriesIcon from "./assets/categories.png";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Items from "./components/Items";
import { Link } from "react-router-dom";

function Home() {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="app-container">
      {/* Search Component */}
      <Search
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Items Component */}
      <Items selectedCategory={selectedCategory} />

      {/* Footer */}
      <Footer />

      {/* Footer Navigation */}
      <div className="footer-nav">
        <Link to="/home">
          <span className="icon">
            <img src={homeIcon} alt="Home Icon" />
          </span>
          Home
        </Link>

        <Link to="/categories">
          <span className="icon">
            <img src={categoriesIcon} alt="Categories Icon" />
          </span>
          Categories
        </Link>

        <Link to="/profile">
          <span className="icon">
            <img src={profileIcon} alt="Profile Icon" />
          </span>
          Account
        </Link>
      </div>
    </div>
  );
}

export default Home;