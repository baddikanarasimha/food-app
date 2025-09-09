
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// Address Schema
const AddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNo: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  locality: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  addressType: {
    type: String,
    enum: ["Home", "Work", "Other"],
    default: "Home",
  },
  defaultAddress: {
    type: Boolean,
    default: false,
  },
})

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  phone: {
    type: String,
    trim: true,
  },
  // Replace simple address with addresses array
  addresses: [AddressSchema],
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", UserSchema)

