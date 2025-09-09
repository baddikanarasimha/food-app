// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")
// const dotenv = require("dotenv")
// const authRoutes = require("./routes/auth")
// const userRoutes = require("./routes/users")
// const orderRoutes = require("./routes/orders")

// // Load environment variables
// dotenv.config()

// // Initialize Express app
// const app = express()

// // Middleware
// app.use(cors())
// app.use(express.json())

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err))

// // Routes
// app.use("/api/auth", authRoutes)
// app.use("/api/users", userRoutes)
// app.use("/api/orders", orderRoutes)

// // Default route
// app.get("/", (req, res) => {
//   res.send("Food Ordering API is running")
// })

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).send({ message: "Something went wrong!" })
// })

// // Start server
// const PORT = process.env.PORT || 5000
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const orderRoutes = require("./routes/orders")
const addressRoutes = require("./routes/address") // Add address routes

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/address", addressRoutes) // Register address routes

// Default route
app.get("/", (req, res) => {
  res.send("Food Ordering API is running")
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ message: "Something went wrong!" })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

