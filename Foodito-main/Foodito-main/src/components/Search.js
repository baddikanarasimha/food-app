

"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./search.css"
import menu1 from "../assets/menu/menu_1.png"; 
import menu2 from "../assets/menu/menu_2.png";
import menu3 from "../assets/menu/menu_3.png";
import menu4 from "../assets/menu/menu_4.png";
import menu5 from "../assets/menu/menu_5.png";
import menu6 from "../assets/menu/menu_6.png";
import menu7 from "../assets/menu/menu_7.png";
import menu8 from "../assets/menu/menu_8.png";

const Search = ({ selectedCategory, setSelectedCategory }) => {
  // State for search input
  const [searchTerm, setSearchTerm] = useState("")

  // Menu categories
  const menuCategories = [
    { id: "all", name: "All", image: menu1 },
    { id: "salad", name: "Salad", image: menu2 },
    { id: "rolls", name: "Rolls", image: menu3 },
    { id: "deserts", name: "Deserts", image: menu4 },
    { id: "sandwich", name: "Sandwich", image: menu5 },
    { id: "cake", name: "Cake", image: menu6 },
    { id: "pureveg", name: "Pureveg", image: menu7  },  
    { id: "pasta", name: "Pasta", image: menu8 },
    { id: "noodles", name: "Noodles", image: menu7 },
  ]
  // Filter categories based on search term
  const filteredCategories = menuCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Function to handle category selection
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === "all" ? null : categoryId)
  }

  return (
    <>
      <div className="search-header">
        <div className="InputContainer">
          <input
            type="text"
            name="text"
            className="input"
            id="input"
            placeholder="Search for restaurant, dish"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label htmlFor="input" className="labelforsearch">
            <svg viewBox="0 0 512 512" className="searchIcon">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
            </svg>
          </label>
          <div className="border"></div>
          <button className="micButton">
            <svg viewBox="0 0 384 512" className="micIcon">
              <path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"></path>
            </svg>
          </button>
        </div>
        
      </div>

      <div className="menu-categories-container">
        <div className="menu-categories">
          {filteredCategories.map((category) => {
            // Check if this category is selected (for "all", check if selectedCategory is null)
            const isActive = category.id === "all" ? selectedCategory === null : selectedCategory === category.id

            return (
              <div
                key={category.id}
                className={`menu-category ${isActive ? "menu-category-active" : ""}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className={`menu-category-image ${isActive ? "menu-category-image-active" : ""}`}>
                  <img src={category.image || "/placeholder.svg"} alt={category.name} />
                </div>
                <p className={isActive ? "menu-category-text-active" : ""}>{category.name}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Search


