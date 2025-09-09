// "use client"

// import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { CheckCircle, Package, Truck, Home, ShoppingBag } from "lucide-react"
// import "./Orderconfim.css"
// // Import toast at the top of the file
// import { Toaster, toast } from "react-hot-toast"

// const OrderConfirmation = () => {
//   const navigate = useNavigate()
//   const [orderDetails, setOrderDetails] = useState(null)
//   const [animationComplete, setAnimationComplete] = useState(false)

//   useEffect(() => {
//     // Check if user is logged in
//     const token = localStorage.getItem("token")
//     if (!token) {
//       navigate("/login")
//       return
//     }

//     // Get order details from localStorage
//     const lastOrder = localStorage.getItem("lastOrder")

//     if (!lastOrder) {
//       // Redirect if no order details found
//       navigate("/")
//       return
//     }

//     setOrderDetails(JSON.parse(lastOrder))

//     // Start animation sequence
//     const timer = setTimeout(() => {
//       setAnimationComplete(true)
//       // Show success toast when animation completes
//       toast.success("Order confirmed! Thank you for your purchase.", {
//         position: "top-center",
//         duration: 4000,
//       })
//     }, 2000)

//     return () => clearTimeout(timer)
//   }, [navigate])

//   if (!orderDetails) {
//     return (
//       <div className="order-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading order details...</p>
//       </div>
//     )
//   }

//   return (
//     <div className="order-confirmation">
//       <div className="confirmation-animation">
//         {!animationComplete ? (
//           <div className="processing-animation">
//             <div className="circle-animation"></div>
//             <p>Processing your order...</p>
//           </div>
//         ) : (
//           <div className="success-animation">
//             <CheckCircle className="success-icon" size={80} />
//             <h1>Order Placed Successfully!</h1>
//             <p>Thank you for your order</p>
//           </div>
//         )}
//       </div>

//       {animationComplete && (
//         <>
//           <div className="order-details-card">
//             <div className="order-id">
//               <h2>Order ID: #{orderDetails.orderId}</h2>
//               <p>We've sent the order confirmation to your email</p>
//             </div>

//             <div className="order-status">
//               <div className="status-step completed">
//                 <CheckCircle className="status-icon" />
//                 <div className="status-text">
//                   <h3>Order Confirmed</h3>
//                   <p>{new Date(orderDetails.orderDate).toLocaleDateString()}</p>
//                 </div>
//               </div>
//               <div className="status-step">
//                 <Package className="status-icon" />
//                 <div className="status-text">
//                   <h3>Processing</h3>
//                   <p>Your order is being prepared</p>
//                 </div>
//               </div>
//               <div className="status-step">
//                 <Truck className="status-icon" />
//                 <div className="status-text">
//                   <h3>Shipping</h3>
//                   <p>Estimated: {getDeliveryDate(orderDetails.orderDate)}</p>
//                 </div>
//               </div>
//               <div className="status-step">
//                 <Home className="status-icon" />
//                 <div className="status-text">
//                   <h3>Delivery</h3>
//                   <p>Estimated: {getDeliveryDate(orderDetails.orderDate, 3)}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="delivery-address">
//               <h3>Delivery Address</h3>
//               <p>{orderDetails.shippingAddress.name}</p>
//               <p>{orderDetails.shippingAddress.address}</p>
//               <p>
//                 {orderDetails.shippingAddress.locality}, {orderDetails.shippingAddress.state} -{" "}
//                 {orderDetails.shippingAddress.pinCode}
//               </p>
//               <p>Mobile: {orderDetails.shippingAddress.mobileNo}</p>
//             </div>

//             <div className="payment-info">
//               <h3>Payment Information</h3>
//               <p>
//                 <strong>Method:</strong> {getPaymentMethodName(orderDetails.paymentMethod)}
//               </p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 {orderDetails.paymentMethod === "cash_on_delivery" ? "Pay on delivery" : "Paid"}
//               </p>
//             </div>
//           </div>

//           <div className="order-items-card">
//             <h2>Order Summary</h2>
//             <div className="order-items-list">
//               {orderDetails.items.map((item, index) => (
//                 <div key={index} className="order-item">
//                   <div className="item-image-container">
//                     <img src={item.image || "/placeholder.svg"} alt={item.itemname} className="item-image" />
//                   </div>
//                   <div className="item-details">
//                     <h3>{item.itemname}</h3>
//                     <p>Qty: {item.quantity || 1}</p>
//                     <p className="item-price">₹{item.price.toFixed(2)}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="order-total">
//               <div className="price-row">
//                 <span>Subtotal</span>
//                 <span>₹{orderDetails.totalAmount.toFixed(2)}</span>
//               </div>
//               <div className="price-row">
//                 <span>Shipping</span>
//                 <span>Free</span>
//               </div>
//               <div className="price-row total">
//                 <span>Total</span>
//                 <span>₹{orderDetails.totalAmount.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="action-buttons">
//             <Link to="/" className="continue-shopping-btn">
//               <ShoppingBag size={18} />
//               Continue Shopping
//             </Link>
//             <Link to="/profile" className="view-orders-btn">
//               View My Orders
//             </Link>
//           </div>
//         </>
//       )}
//       {/* Add Toaster component at the bottom of the return statement, just before the closing div */}
//       <Toaster />
//     </div>
//   )
// }

// // Helper function to calculate delivery date (days from order date)
// function getDeliveryDate(orderDate, additionalDays = 0) {
//   const date = new Date(orderDate)
//   date.setDate(date.getDate() + 3 + additionalDays)
//   return date.toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   })
// }

// // Helper function to get payment method display name
// function getPaymentMethodName(method) {
//   switch (method) {
//     case "cash_on_delivery":
//       return "Cash on Delivery"
//     case "upi":
//       return "UPI"
//     case "credit_card":
//       return "Credit/Debit Card"
//     case "paypal":
//       return "Wallet"
//     case "emi":
//       return "EMI"
//     default:
//       return method
//   }
// }

// export default OrderConfirmation




// "use client";

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { CheckCircle, Package, Truck, Home, ShoppingBag } from "lucide-react";
// import "./Orderconfim.css";
// import { Toaster, toast } from "react-hot-toast";

// const OrderConfirmation = () => {
//   const navigate = useNavigate();
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [animationComplete, setAnimationComplete] = useState(false);

//   useEffect(() => {
//     // Check if user is logged in
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     // Get order details from localStorage
//     const lastOrder = localStorage.getItem("lastOrder");

//     if (!lastOrder) {
//       // Redirect if no order details found
//       navigate("/");
//       return;
//     }

//     setOrderDetails(JSON.parse(lastOrder));

//     // Start animation sequence
//     const timer = setTimeout(() => {
//       setAnimationComplete(true);
//       // Show success toast when animation completes
//       toast.success("Order confirmed! Thank you for your purchase.", {
//         position: "top-center",
//         duration: 4000,
//       });
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   if (!orderDetails) {
//     return (
//       <div className="order-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading order details...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="order-confirmation">
//       <div className="confirmation-animation">
//         {!animationComplete ? (
//           <div className="processing-animation">
//             <div className="circle-animation"></div>
//             <p>Processing your order...</p>
//           </div>
//         ) : (
//           <div className="success-animation">
//             <CheckCircle className="success-icon" size={80} />
//             <h1>Order Placed Successfully!</h1>
//             <p>Thank you for your order</p>
//           </div>
//         )}
//       </div>

//       {animationComplete && (
//         <>
//           <div className="order-details-card">
//             <div className="order-id">
//               <h2>Order ID: #{orderDetails.orderId}</h2>
//               <p>We've sent the order confirmation to your email</p>
//             </div>

//             <div className="order-status">
//               <div className="status-step completed">
//                 <CheckCircle className="status-icon" />
//                 <div className="status-text">
//                   <h3>Order Confirmed</h3>
//                   <p>{new Date(orderDetails.orderDate).toLocaleDateString()}</p>
//                 </div>
//               </div>
//               <div className="status-step">
//                 <Package className="status-icon" />
//                 <div className="status-text">
//                   <h3>Processing</h3>
//                   <p>Your order is being prepared</p>
//                 </div>
//               </div>
//               <div className="status-step">
//                 <Truck className="status-icon" />
//                 <div className="status-text">
//                   <h3>Shipping</h3>
//                   <p>Estimated: {getDeliveryDate(orderDetails.orderDate)}</p>
//                 </div>
//               </div>
//               <div className="status-step">
//                 <Home className="status-icon" />
//                 <div className="status-text">
//                   <h3>Delivery</h3>
//                   <p>Estimated: {getDeliveryDate(orderDetails.orderDate, 3)}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="delivery-address">
//               <h3>Delivery Address</h3>
//               <p>{orderDetails.shippingAddress.name}</p>
//               <p>{orderDetails.shippingAddress.address}</p>
//               <p>
//                 {orderDetails.shippingAddress.locality}, {orderDetails.shippingAddress.state} -{" "}
//                 {orderDetails.shippingAddress.pinCode}
//               </p>
//               <p>Mobile: {orderDetails.shippingAddress.mobileNo}</p>
//             </div>

//             <div className="payment-info">
//               <h3>Payment Information</h3>
//               <p>
//                 <strong>Method:</strong> {getPaymentMethodName(orderDetails.paymentMethod)}
//               </p>
//               <p>
//                 <strong>Status:</strong>{" "}
//                 {orderDetails.paymentMethod === "cash_on_delivery" ? "Pay on delivery" : "Paid"}
//               </p>
//             </div>
//           </div>

//           <div className="order-items-card">
//             <h2>Order Summary</h2>
//             <div className="order-items-list">
//               {orderDetails.items.map((item, index) => (
//                 <div key={index} className="order-item">
//                   <div className="item-image-container">
//                     <img src={item.image || "/placeholder.svg"} alt={item.itemname} className="item-image" />
//                   </div>
//                   <div className="item-details">
//                     <h3>{item.itemname}</h3>
//                     <p>Qty: {item.quantity || 1}</p>
//                     <p className="item-price">₹{item.price.toFixed(2)}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="order-total">
//               <div className="price-row">
//                 <span>Subtotal</span>
//                 <span>₹{orderDetails.totalAmount.toFixed(2)}</span>
//               </div>
//               <div className="price-row">
//                 <span>Shipping</span>
//                 <span>Free</span>
//               </div>
//               <div className="price-row total">
//                 <span>Total</span>
//                 <span>₹{orderDetails.totalAmount.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="action-buttons">
//             <Link to="/" className="continue-shopping-btn">
//               <ShoppingBag size={18} />
//               Continue Shopping
//             </Link>
//             <Link to="/profile" className="view-orders-btn">
//               View My Orders
//             </Link>
//           </div>
//         </>
//       )}
//       {/* Add Toaster component at the bottom of the return statement, just before the closing div */}
//       <Toaster />
//     </div>
//   );
// };

// // Helper function to calculate delivery date (days from order date)
// function getDeliveryDate(orderDate, additionalDays = 0) {
//   const date = new Date(orderDate);
//   date.setDate(date.getDate() + 3 + additionalDays);
//   return date.toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// }

// // Helper function to get payment method display name
// function getPaymentMethodName(method) {
//   switch (method) {
//     case "cash_on_delivery":
//       return "Cash on Delivery";
//     case "upi":
//       return "UPI";
//     case "credit_card":
//       return "Credit/Debit Card";
//     case "paypal":
//       return "Wallet";
//     case "emi":
//       return "EMI";
//     default:
//       return method;
//   }
// }

// export default OrderConfirmation;










"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Truck, Home, ShoppingBag } from "lucide-react";
import "./Orderconfim.css";
import { Toaster, toast } from "react-hot-toast";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Get order details from localStorage
    const lastOrder = localStorage.getItem("lastOrder");

    if (!lastOrder) {
      // Redirect if no order details found
      navigate("/");
      return;
    }

    setOrderDetails(JSON.parse(lastOrder));

    // Start animation sequence
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      // Show success toast when animation completes
      toast.success("Order confirmed! Thank you for your purchase.", {
        position: "top-center",
        duration: 4000,
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!orderDetails) {
    return (
      <div className="order-loading">
        <div className="loading-spinner"></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <div className="confirmation-animation">
        {!animationComplete ? (
          <div className="processing-animation">
            <div className="circle-animation"></div>
            <p>Processing your order...</p>
          </div>
        ) : (
          <div className="success-animation">
            <CheckCircle className="success-icon" size={80} />
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your order</p>
          </div>
        )}
      </div>

      {animationComplete && (
        <>
          <div className="order-details-card">
            <div className="order-id">
              <h2>Order ID: #{orderDetails.orderId}</h2>
              <p>We've sent the order confirmation to your email</p>
            </div>

            <div className="order-status">
              <div className="status-step completed">
                <CheckCircle className="status-icon" />
                <div className="status-text">
                  <h3>Order Confirmed</h3>
                  <p>{new Date(orderDetails.orderDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="status-step">
                <Package className="status-icon" />
                <div className="status-text">
                  <h3>Processing</h3>
                  <p>Your order is being prepared</p>
                </div>
              </div>
              <div className="status-step">
                <Truck className="status-icon" />
                <div className="status-text">
                  <h3>Shipping</h3>
                  <p>Estimated: {getDeliveryDate(orderDetails.orderDate)}</p>
                </div>
              </div>
              <div className="status-step">
                <Home className="status-icon" />
                <div className="status-text">
                  <h3>Delivery</h3>
                  <p>Estimated: {getDeliveryDate(orderDetails.orderDate, 3)}</p>
                </div>
              </div>
            </div>

            <div className="delivery-address">
              <h3>Delivery Address</h3>
              <p>{orderDetails.shippingAddress.name}</p>
              <p>{orderDetails.shippingAddress.address}</p>
              <p>
                {orderDetails.shippingAddress.locality}, {orderDetails.shippingAddress.state} -{" "}
                {orderDetails.shippingAddress.pinCode}
              </p>
              <p>Mobile: {orderDetails.shippingAddress.mobileNo}</p>
            </div>

            <div className="payment-info">
              <h3>Payment Information</h3>
              <p>
                <strong>Method:</strong> {getPaymentMethodName(orderDetails.paymentMethod)}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {orderDetails.paymentMethod === "cash_on_delivery" ? "Pay on delivery" : "Paid"}
              </p>
            </div>
          </div>

          <div className="order-items-card">
            <h2>Order Summary</h2>
            <div className="order-items-list">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-image-container">
                    <img src={item.image || "/placeholder.svg"} alt={item.itemname} className="item-image" />
                  </div>
                  <div className="item-details">
                    <h3>{item.itemname}</h3>
                    <p>Qty: {item.quantity || 1}</p>
                    <p className="item-price">₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{orderDetails.totalAmount.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="price-row total">
                <span>Total</span>
                <span>₹{orderDetails.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/" className="continue-shopping-btn">
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>
            <Link to="/profile" className="view-orders-btn">
              View My Orders
            </Link>
          </div>
        </>
      )}
      <Toaster />
    </div>
  );
};

// Helper function to calculate delivery date (days from order date)
function getDeliveryDate(orderDate, additionalDays = 0) {
  const date = new Date(orderDate);
  date.setDate(date.getDate() + 3 + additionalDays);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Helper function to get payment method display name
function getPaymentMethodName(method) {
  switch (method) {
    case "cash_on_delivery":
      return "Cash on Delivery";
    case "upi":
      return "UPI";
    case "credit_card":
      return "Credit/Debit Card";
    case "paypal":
      return "Wallet";
    case "emi":
      return "EMI";
    default:
      return method;
  }
}

export default OrderConfirmation;