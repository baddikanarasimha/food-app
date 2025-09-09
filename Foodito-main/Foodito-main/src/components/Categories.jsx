

"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, SearchIcon } from "lucide-react";
import "./category.css";

const CategoriesPage = ({ setSelectedCategory }) => {
  const navigate = useNavigate();

  // Define food categories with circular images
  const foodCategories = [
    { id: "salad", name: "Salad", image: "/placeholder.svg?height=150&width=150" },
    { id: "rolls", name: "Rolls", image: "/placeholder.svg?height=150&width=150" },
    { id: "deserts", name: "Deserts", image: "/placeholder.svg?height=150&width=150" },
    { id: "sandwich", name: "Sandwich", image: "/placeholder.svg?height=150&width=150" },
    { id: "cake", name: "Cake", image: "/placeholder.svg?height=150&width=150" },
    { id: "pureveg", name: "Pureveg", image: "/placeholder.svg?height=150&width=150" },
    { id: "pasta", name: "Pasta", image: "/placeholder.svg?height=150&width=150" },
    { id: "noodles", name: "Noodles", image: "/placeholder.svg?height=150&width=150" },
  ];

  // State for search input and filtered categories
  const [searchTerm, setSearchTerm] = useState("");

  // Filter categories based on the search term
  const filteredCategories = foodCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId); // Call the prop function
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div className="categories-page">
      {/* Header */}
      <div className="categories-header">
        <Link to="/" className="back-button">
          <ArrowLeft className="back-icon" />
        </Link>
        <h1 className="categories-title">All Categories</h1>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <SearchIcon className="search-icon" />
        <input
          type="text"
          placeholder="Search categories..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="category-image-container">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="category-image"
              />
            </div>
            <h3 className="category-name">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;