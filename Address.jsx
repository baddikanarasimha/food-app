"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Check,
  MapPin,
  Home,
  Briefcase,
  Edit,
  Trash,
} from "lucide-react";
import axios from "axios";
import "./Address.css";

// Backend API URL - change this to your actual backend URL
const API_URL = "https://backend.sealpnut.com/api";

const Address = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    pinCode: "",
    address: "",
    locality: "",
    state: "",
    addressType: "Home",
    defaultAddress: false,
  });

  // Check if user is logged in and fetch addresses
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchAddresses(token);
    } else {
      setIsLoading(false);
      setShowAddForm(true); // Show form for non-logged in users
    }
  }, []);

  const fetchAddresses = async (token) => {
    try {
      setIsLoading(true);
      // Use the dedicated address API endpoint
      const response = await axios.get(`${API_URL}/address`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check if user has addresses
      if (response.data.data && response.data.data.length > 0) {
        setAddresses(response.data.data);

        // Set default address as selected
        const defaultAddress = response.data.data.find(
          (addr) => addr.defaultAddress
        );
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress._id);
          localStorage.setItem("selectedAddressId", defaultAddress._id);
        } else {
          setSelectedAddressId(response.data.data[0]._id);
          localStorage.setItem("selectedAddressId", response.data.data[0]._id);
        }
        setShowAddForm(false);
      } else {
        // No addresses found, show form
        setShowAddForm(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setIsLoading(false);
      setShowAddForm(true);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchLocation = async (pinCode) => {
    if (pinCode.length !== 6) return;

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pinCode}`
      );
      const data = await response.json();

      if (data[0].Status === "Success") {
        const { District, State } = data[0].PostOffice[0];
        setFormData((prevData) => ({
          ...prevData,
          locality: District,
          state: State,
        }));
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      try {
        const token = localStorage.getItem("token");

        if (formData._id) {
          // Update existing address
          await axios.put(
            `${API_URL}/address/${formData._id}`,
            {
              name: formData.name,
              mobileNo: formData.mobileNo,
              pinCode: formData.pinCode,
              address: formData.address,
              locality: formData.locality,
              state: formData.state,
              addressType: formData.addressType,
              defaultAddress: formData.defaultAddress,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } else {
          // Add new address
          await axios.post(
            `${API_URL}/address`,
            {
              name: formData.name,
              mobileNo: formData.mobileNo,
              pinCode: formData.pinCode,
              address: formData.address,
              locality: formData.locality,
              state: formData.state,
              addressType: formData.addressType,
              defaultAddress: formData.defaultAddress,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }

        // Refresh addresses
        fetchAddresses(token);
        setShowAddForm(false);
      } catch (error) {
        console.error("Error saving address:", error);
        alert("Failed to save address. Please try again.");
      }
    } else {
      // For non-logged in users, just store in local state
      const newAddress = {
        _id: Date.now().toString(),
        ...formData,
      };
      setAddresses([newAddress]);
      setSelectedAddressId(newAddress._id);
      setShowAddForm(false);

      // Store in localStorage for guest users
      localStorage.setItem("guestAddress", JSON.stringify(newAddress));
    }
  };

  const handleAddNewAddress = () => {
    setFormData({
      name: "",
      mobileNo: "",
      pinCode: "",
      address: "",
      locality: "",
      state: "",
      addressType: "Home",
      defaultAddress: false,
    });
    setShowAddForm(true);
  };

  const handleEditAddress = (address) => {
    setFormData({
      ...address,
    });
    setShowAddForm(true);
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        if (isLoggedIn) {
          const token = localStorage.getItem("token");

          // Use the dedicated address API endpoint
          await axios.delete(`${API_URL}/address/${addressId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Refresh addresses
          fetchAddresses(token);
        } else {
          // For non-logged in users
          setAddresses([]);
          setSelectedAddressId(null);
          setShowAddForm(true);
          localStorage.removeItem("guestAddress");
        }
      } catch (error) {
        console.error("Error deleting address:", error);
        alert("Failed to delete address. Please try again.");
      }
    }
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);

    // Save selected address ID to localStorage
    localStorage.setItem("selectedAddressId", addressId);

    // If logged in, update default address in database
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      const address = addresses.find((addr) => addr._id === addressId);

      if (address && !address.defaultAddress) {
        // Make this the default address
        axios
          .put(
            `${API_URL}/address/${addressId}`,
            { ...address, defaultAddress: true },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            // Refresh addresses
            fetchAddresses(token);
          })
          .catch((error) => {
            console.error("Error updating default address:", error);
          });
      }
    }
  };

  const getSelectedAddress = () => {
    return addresses.find((addr) => addr._id === selectedAddressId);
  };

  if (isLoading) {
    return (
      <div className="address-loading">
        <div className="loading-spinner"></div>
        <p>Loading addresses...</p>
      </div>
    );
  }

  return (
    <div className="address-container">
      {/* Header */}
      <header className="address-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="address-title">Delivery Address</h1>
      </header>

      {showAddForm ? (
        // Form to add/edit address
        <div className="address-form">
          <h2>{formData._id ? "EDIT ADDRESS" : "ADD NEW ADDRESS"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="section">
              <h3>Contact Details</h3>
              <div className="form-group">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                />
              </div>
              <div className="form-group">
                <label>Mobile No*</label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                />
              </div>
            </div>

            <div className="section">
              <h3>Address</h3>
              <div className="form-group">
                <label>Pin Code*</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={(e) => {
                    handleChange(e);
                    fetchLocation(e.target.value);
                  }}
                  required
                  placeholder="6-digit PIN code"
                  pattern="[0-9]{6}"
                />
              </div>
              <div className="form-group">
                <label>Address (House No, Building, Street, Area)*</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="House No, Building, Street, Area"
                />
              </div>
              <div className="form-group">
                <label>Locality / Town*</label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  required
                  placeholder="Locality or Town"
                />
              </div>
              <div className="form-group">
                <label>State*</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="State"
                />
              </div>
            </div>

            <div className="section">
              <h3>Save Address As</h3>
              <div className="address-type-selector">
                <div
                  className={`address-type-option ${
                    formData.addressType === "Home" ? "selected" : ""
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, addressType: "Home" })
                  }
                >
                  <Home size={18} />
                  <span>Home</span>
                </div>
                <div
                  className={`address-type-option ${
                    formData.addressType === "Work" ? "selected" : ""
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, addressType: "Work" })
                  }
                >
                  <Briefcase size={18} />
                  <span>Work</span>
                </div>
                <div
                  className={`address-type-option ${
                    formData.addressType !== "Home" &&
                    formData.addressType !== "Work"
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, addressType: "Other" })
                  }
                >
                  <MapPin size={18} />
                  <span>Other</span>
                </div>
              </div>
            </div>

            {isLoggedIn && (
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  name="defaultAddress"
                  checked={formData.defaultAddress}
                  onChange={handleChange}
                  id="defaultAddress"
                />
                <label htmlFor="defaultAddress">
                  Make this my default address
                </label>
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  if (addresses.length > 0) {
                    setShowAddForm(false);
                  }
                }}
              >
                CANCEL
              </button>
              <button type="submit" className="save-address-btn">
                SAVE ADDRESS
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Display saved addresses
        <div className="saved-addresses">
          <div className="addresses-header">
            <h2>SELECT DELIVERY ADDRESS</h2>
            <button className="add-address-btn" onClick={handleAddNewAddress}>
              <Plus size={16} /> ADD NEW ADDRESS
            </button>
          </div>

          <div className="address-list">
            {addresses.map((address) => (
              <div
                key={address._id}
                className={`address-card ${
                  selectedAddressId === address._id ? "selected" : ""
                }`}
                onClick={() => handleSelectAddress(address._id)}
              >
                <div className="address-card-header">
                  <div className="address-type-badge">
                    {address.addressType}
                  </div>
                  {address.defaultAddress && (
                    <div className="default-badge">DEFAULT</div>
                  )}
                  {selectedAddressId === address._id && (
                    <div className="selected-indicator">
                      <Check size={16} />
                    </div>
                  )}
                </div>

                <div className="address-card-content">
                  <h3>{address.name}</h3>
                  <p>{address.address}</p>
                  <p>
                    {address.locality}, {address.state} - {address.pinCode}
                  </p>
                  <p>Mobile: {address.mobileNo}</p>
                </div>

                <div className="address-card-actions">
                  <button
                    className="edit-address-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAddress(address);
                    }}
                  >
                    <Edit size={16} /> EDIT
                  </button>
                  <button
                    className="delete-address-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(address._id);
                    }}
                  >
                    <Trash size={16} /> DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedAddressId && (
            <div className="delivery-section">
              <div className="delivery-estimates">
                <h3>DELIVERY ESTIMATES</h3>
                <p>
                  Estimated delivery by <strong>{getDeliveryDate()}</strong>
                </p>
              </div>
              <Link to="/payment">
                <button className="continue-btn">CONTINUE TO PAYMENT</button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

function getDeliveryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default Address;
