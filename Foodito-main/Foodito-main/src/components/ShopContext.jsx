// import React, { createContext, useState } from "react";
// import Listitems from './Listitems'; // Ensure this imports a valid array

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//     let cart = {};
//     if (Array.isArray(Listitems)) {
//         Listitems.forEach(item => {
//             cart[item.id] = 0; // Use item ID as the key
//         });
//     }
//     return cart;
// };

// const ShopContextProvider = (props) => {
//     const [cartItems, setCartItems] = useState(getDefaultCart());

//     // Function to remove an item from the cart
//     const removeFromCart = (id) => {
//         setCartItems(prevCartItems => {
//             const updatedCart = { ...prevCartItems };
//             if (updatedCart[id] > 0) {
//                 updatedCart[id] -= 1;
//             }
//             return updatedCart;
//         });
//     };

//     const contextValue = {
//         Listitems,
//         cartItems,
//         removeFromCart // Include removeFromCart function
//     };

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     );
// };

// export default ShopContextProvider;


import React, { createContext, useState } from "react";
import Listitems from './Listitems'; // Import the Listitems array

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    Listitems.forEach(item => {
        cart[item.id] = 0; // Initialize each item's quantity to 0
    });
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    // Function to add an item to the cart
    const addToCart = (id) => {
        setCartItems(prevCartItems => ({
            ...prevCartItems,
            [id]: prevCartItems[id] + 1
        }));
    };

    // Function to remove an item from the cart
    const removeFromCart = (id) => {
        setCartItems(prevCartItems => {
            const updatedCart = { ...prevCartItems };
            if (updatedCart[id] > 0) {
                updatedCart[id] -= 1;
            }
            return updatedCart;
        });
    };

    const contextValue = {
        Listitems,
        cartItems,
        addToCart,
        removeFromCart,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
