

"use client"

import { useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import { Heart } from "lucide-react"
import "./food.css"

import food1 from"../assets/food/food_1.png";
import  food2 from"../assets/food/food_2.png";
import food3 from"../assets/food/food_3.png";
import food4 from"../assets/food/food_4.png";
import food5 from"../assets/food/food_5.png";
import food6 from"../assets/food/food_6.png";
import food7 from "../assets/food/food_7.png";
import food8 from"../assets/food/food_8.png";
import food9 from"../assets/food/food_9.png";
import food10 from"../assets/food/food_10.png";
import food11 from"../assets/food/food_11.png";
import food12 from"../assets/food/food_12.png";
import food13 from"../assets/food/food_13.png";
import food14 from"../assets/food/food_14.png";
import food15 from"../assets/food/food_15.png";
import food16 from"../assets/food/food_16.png";
import food17 from"../assets/food/food_17.png";
import food18 from"../assets/food/food_18.png";
import food19 from"../assets/food/food_19.png";
import food20 from"../assets/food/food_20.png";
import food21 from"../assets/food/food_21.png";
import food22 from"../assets/food/food_22.png";
import food23 from"../assets/food/food_23.png";
import food24 from"../assets/food/food_24.png";
import food25 from"../assets/food/food_25.png";
import food26 from"../assets/food/food_26.png";
import food27 from"../assets/food/food_27.png";
import food28 from"../assets/food/food_28.png";
import food29 from"../assets/food/food_29.png";
import food30 from"../assets/food/food_30.png";
import food31 from"../assets/food/food_31.png";
import food32 from"../assets/food/food_32.png";


const Items = ({ selectedCategory }) => {
  // Initialize items data
  const [items] = useState([
    // Salad items
    {
      id: 1,
      itemname: "Greek Salad",
      image: food1,
      price: 20,
      originalprice: 50,
      discount: 30,
      category: "salad",
    },
    {
      id: 2,
      itemname: "Mushroom Salad",
      image: food2,
      price: 40,
      originalprice: 50,
      discount: 20,
      category: "salad",
    },
    {
      id: 3,
      itemname: "Veg Salad",
      image: food3,
      price: 50,
      originalprice: 60,
      discount: 15,
      category: "salad",
    },
    {
      id: 4,
      itemname: "Chicken Salad",
      image: food4,
      price: 70,
      originalprice: 70,
      discount: 0,
      category: "salad",
    },

    // Rolls items
    {
      id: 5,
      itemname: "Spring Rolls",
      image: food5,
      price: 25,
      originalprice: 45,
      discount: 44,
      category: "rolls",
    },
    {
      id: 6,
      itemname: "Veggie Rolls",
      image: food6,
      price: 15,
      originalprice: 30,
      discount: 50,
      category: "rolls",
    },

    // Deserts items
    {
      id: 7,
      itemname: "Fruit Salad",
      image: food7,
      price: 30,
      originalprice: 40,
      discount: 25,
      category: "deserts",
    },
    {
      id: 8,
      itemname: "Ice Cream",
      image: food8,
      price: 35,
      originalprice: 55,
      discount: 36,
      category: "deserts",
    },

    // Sandwich items
    {
      id: 9,
      itemname: "Club Sandwich",
      image: food9,
      price: 20,
      originalprice: 30,
      discount: 33,
      category: "sandwich",
    },
    {
      id: 10,
      itemname: "Veggie Sandwich",
      image: food10,
      price: 15,
      originalprice: 25,
      discount: 40,
      category: "sandwich",
    },

    // Cake items
    {
      id: 11,
      itemname: "Chocolate Cake",
      image: food11,
      price: 18,
      originalprice: 28,
      discount: 36,
      category: "cake",
    },
    {
      id: 12,
      itemname: "Red Velvet",
      image: food12,
      price: 22,
      originalprice: 32,
      discount: 31,
      category: "cake",
    },

    // Pureveg items
    {
      id: 13,
      itemname: "Vegetable Curry",
      image: food13,
      price: 25,
      originalprice: 35,
      discount: 29,
      category: "pureveg",
    },
    {
      id: 14,
      itemname: "Tofu Stir Fry",
      image: food14,
      price: 28,
      originalprice: 38,
      discount: 26,
      category: "pureveg",
    },

    // Pasta items
    {
      id: 15,
      itemname: "Pasta Primavera",
      image: food15,
      price: 30,
      originalprice: 45,
      discount: 33,
      category: "pasta",
    },
    {
      id: 16,
      itemname: "Spaghetti",
      image: food16,
      price: 18,
      originalprice: 25,
      discount: 28,
      category: "pasta",
    },

    // Noodles items
    {
      id: 17,
      itemname: "Ramen",
      image: food17,
      price: 22,
      originalprice: 32,
      discount: 31,
      category: "noodles",
    },
    {
      id: 18,
      itemname: "Pad Thai",
      image: food18,
      price: 24,
      originalprice: 34,
      discount: 29,
      category: "noodles",
    },
    {
      id: 19,
      itemname: "P Thai",
      image: food19,
      price: 25,
      originalprice: 34,
      discount: 29,
      category: "noodles",
    },
    {
      id: 20,
      itemname: "cheese cake ",
      image: food20,
      price: 26,
      originalprice: 34,
      discount: 29,
      category: "cake",
    },
    {
      id: 21,
      itemname: "Egg salad ",
      image: food20,
      price: 28,
      originalprice: 35,
      discount: 29,
      category: "salad",
    },
    {
      id: 22,
      itemname: "Chicken pasta",
      image: food22,
      price: 26,
      originalprice: 34,
      discount: 29,
      category: "pasta",
    },
    {
      id: 23,
      itemname: "panner curry",
      image: food23,
      price: 26,
      originalprice: 34,
      discount: 29,
      category: "pureveg",
    },
    {
      id: 24,
      itemname: "Egg noodles",
      image: food24,
      price: 26,
      originalprice: 34,
      discount: 29,
      category: "noodles",
    },
    {
      id: 25,
      itemname: "Sweet pasta",
      image: food25,
      price: 26,
      originalprice: 34,
      discount: 29,
      category: "pasta",
    },
    {
      id: 26,
      itemname: "Chicken rolls",
      image: food26,
      price: 26,
      originalprice: 34,
      discount: 29,
      category: "rolls",
    },
    {
      id: 27,
      itemname: "Veg roll",
      image: food27,
      price: 26,
      originalprice: 34,
      discount: 29,
      category: "rolls",
    },
    {
      id: 28,
      itemname: "Special noodles",
      image: food28,
      price: 26,
      originalprice: 34,
      discount: 29,
      category: "noodles",
    },
    {
      id: 29,
      itemname: "veg noodles",
      image: food29,
      price: 26,
      originalprice: 34,
      discount: 29,
      category: "noodles",
    },
    {
      id: 30,
      itemname: "Chicken noodles",
      image: food30,
      price: 26,
      originalprice: 34,
      discount: 29,
      category: "noodles",
    },
    {
      id: 31,
      itemname: "panner noodles",
      image: food31,
      price: 26,
      originalprice: 34,
      discount: 29,
      category: "noodles",
    },
    {
      id: 32,
      itemname: "Mushroom noodles",
      image: food32,
      price: 26,
      originalprice: 34,
      discount: 29,
      category: "noodles",
    },
    

    
  ])

  // Initialize cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("carts")
    return savedCart ? JSON.parse(savedCart).filter((item) => item !== null) : []
  })

  // Initialize wishlist from localStorage
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    return savedWishlist ? JSON.parse(savedWishlist) : []
  })

  // Filtered items based on selected category
  const filteredItems = selectedCategory ? items.filter((item) => item.category === selectedCategory) : items

  // Function to add items to the cart
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    let updatedCart

    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      )
      toast.success(`${item.itemname} quantity updated in cart!`, {
        position: "top-right",
        duration: 3000,
      })
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }]
      toast.success(`${item.itemname} added to cart!`, {
        position: "top-right",
        duration: 3000,
      })
    }

    setCart(updatedCart)
    localStorage.setItem("carts", JSON.stringify(updatedCart))
  }

  // Function to add items to the wishlist
  const addToWishlist = (item) => {
    const existingItem = wishlist.find((wishItem) => wishItem.id === item.id)
    let updatedWishlist

    if (!existingItem) {
      updatedWishlist = [...wishlist, item]
      toast.success(`${item.itemname} added to wishlist!`, {
        position: "top-right",
        duration: 2000,
      })
    } else {
      updatedWishlist = wishlist.filter((wishItem) => wishItem.id !== item.id)
      toast.success(`${item.itemname} removed from wishlist!`, {
        position: "top-right",
        duration: 2000,
      })
    }

    setWishlist(updatedWishlist)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
  }

  // Function to handle quantity changes in the cart
  const handleQuantityChange = (id, change) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(item.quantity + change, 0)
          if (newQuantity > 0) {
            toast.success(`${item.itemname} quantity updated in cart!`, {
              position: "top-right",
              duration: 3000,
            })
            return { ...item, quantity: newQuantity }
          } else {
            toast.error(`${item.itemname} removed from cart!`, {
              position: "top-right",
              duration: 3000,
            })
            return null // Mark for removal
          }
        }
        return item
      })
      .filter((item) => item !== null) // Remove items marked as null

    setCart(updatedCart)
    localStorage.setItem("carts", JSON.stringify(updatedCart))
  }

  // Check if an item is in the wishlist
  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id)
  }

  // Group items by section (Today's Deals, Popular, etc.) - only for "All" view
  const sections = !selectedCategory
    ? {
        "Today's Deals": items.slice(0, 4), // Exactly 4 items
        Popular: items.slice(4, 8), // Exactly 4 items
        "New Arrivals": items.slice(8, 12), // Exactly 4 items
        "Best Sellers": items.slice(12, 16), // Exactly 4 items
      }
    : {}

  // Render item card (reused in both views)
  const renderItemCard = (item) => {
    const cartItem = cart.find((cartItem) => cartItem.id === item.id)
    return (
      <div className="item-card" key={item.id}>
        <div className="item-image-container">
          <img src={item.image || "/placeholder.svg"} alt={item.itemname} className="item-image" />
          <button
            className="wishlist-button"
            onClick={(e) => {
              e.stopPropagation()
              addToWishlist(item)
            }}
          >
            <Heart className={`wishlist-icon ${isInWishlist(item.id) ? "wishlist-active" : ""}`} />
          </button>
        </div>

        <div className="item-details">
          <h3 className="item-name">{item.itemname}</h3>
          <div className="item-price-container">
            <span className="item-original-price">${item.originalprice}</span>
            <span className="item-price">${item.price}</span>
            <span className="item-discount">-{item.discount}%</span>
          </div>

          {cartItem ? (
            <div className="quantity-controls">
              <button className="quantity-button" onClick={() => handleQuantityChange(item.id, -1)}>
                -
              </button>
              <span className="quantity-display">{cartItem.quantity}</span>
              <button className="quantity-button" onClick={() => handleQuantityChange(item.id, 1)}>
                +
              </button>
            </div>
          ) : (
            <button className="add-to-cart-button" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="items-container">
      {selectedCategory ? (
        <>
          <h1 className="category-title">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h1>

          {/* Display all items for the selected category in a single grid */}
          <div className="items-grid">{filteredItems.map(renderItemCard)}</div>
        </>
      ) : (
        <>
          <h1 className="category-title">All Items</h1>

          {/* Display sections with items for the "All" view */}
          {Object.entries(sections).map(
            ([sectionName, sectionItems]) =>
              sectionItems.length > 0 && (
                <div key={sectionName} className="section">
                  <div className="section-header">
                    <h2>{sectionName}</h2>
                    <div className="section-line"></div>
                  </div>

                  <div className="items-grid">{sectionItems.map(renderItemCard)}</div>
                </div>
              ),
          )}
        </>
      )}
      <Toaster />
    </div>
  )
}

export default Items

