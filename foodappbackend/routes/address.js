const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { protect } = require("../middleware/auth")
const mongoose = require("mongoose") // Import mongoose


router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      data: user.addresses || [],
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
})

// @route   POST /api/address
// @desc    Add a new address
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    const { name, mobileNo, pinCode, address, locality, state, addressType, defaultAddress } = req.body

    // Create new address object
    const newAddress = {
      _id: new mongoose.Types.ObjectId(),
      name,
      mobileNo,
      pinCode,
      address,
      locality,
      state,
      addressType,
      defaultAddress,
    }

    // If this is set as default, update other addresses
    if (defaultAddress && user.addresses) {
      user.addresses = user.addresses.map((addr) => ({
        ...addr,
        defaultAddress: false,
      }))
    }

    // Add new address
    if (!user.addresses) {
      user.addresses = [newAddress]
    } else {
      user.addresses.push(newAddress)
    }

    await user.save()

    res.status(201).json({
      success: true,
      data: newAddress,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
})

// @route   PUT /api/address/:id
// @desc    Update an address
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Find address index
    const addressIndex = user.addresses.findIndex((addr) => addr._id.toString() === req.params.id)

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      })
    }

    const { name, mobileNo, pinCode, address, locality, state, addressType, defaultAddress } = req.body

    // If this is set as default, update other addresses
    if (defaultAddress && !user.addresses[addressIndex].defaultAddress) {
      user.addresses = user.addresses.map((addr) => ({
        ...addr,
        defaultAddress: false,
      }))
    }

    // Update address
    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex],
      name: name || user.addresses[addressIndex].name,
      mobileNo: mobileNo || user.addresses[addressIndex].mobileNo,
      pinCode: pinCode || user.addresses[addressIndex].pinCode,
      address: address || user.addresses[addressIndex].address,
      locality: locality || user.addresses[addressIndex].locality,
      state: state || user.addresses[addressIndex].state,
      addressType: addressType || user.addresses[addressIndex].addressType,
      defaultAddress: defaultAddress !== undefined ? defaultAddress : user.addresses[addressIndex].defaultAddress,
    }

    await user.save()

    res.status(200).json({
      success: true,
      data: user.addresses[addressIndex],
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
})

// @route   DELETE /api/address/:id
// @desc    Delete an address
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Check if address exists
    const addressIndex = user.addresses.findIndex((addr) => addr._id.toString() === req.params.id)

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      })
    }

    // Remove address
    user.addresses.splice(addressIndex, 1)

    // If deleted address was default and there are other addresses, make the first one default
    if (user.addresses.length > 0 && !user.addresses.some((addr) => addr.defaultAddress)) {
      user.addresses[0].defaultAddress = true
    }

    await user.save()

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
})

module.exports = router

