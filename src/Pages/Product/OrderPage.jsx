import React, { useState, useEffect } from "react";
import apiClient from "../../config/api.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BouncingDots from "../BouncingDots";
const OrderPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      const fetchData = async () => {
        try {
          const addressResponse = await apiClient.get(
            `/api/user/getaddressbyemail/${user.email}`
          );
          setAddresses(addressResponse.data.addresses);

          const summaryResponse = await apiClient.get(
            `/api/cart/summary/${user.email}`
          );
          setOrderSummary(summaryResponse.data);

          const discountPercentage =
            summaryResponse.data.discountPercentage || 0;
          const discountedAmount =
            summaryResponse.data.totalAmount * (discountPercentage / 100);
          const totalAfterDiscount =
            summaryResponse.data.totalAmount - discountedAmount;
          setDiscountedTotal(totalAfterDiscount);

          if (summaryResponse.data.products.length === 0) {
            navigate("/");
          }
        } catch (error) {
          console.error("Error fetching data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [user, navigate]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      return toast.error("Please select a shipping address.");
    }

    navigate("/payment", { state: { selectedAddress, orderSummary } });
  };

  return (
    <div className="relative min-h-screen">
      <div className="w-full h-screen -z-10 absolute left-0 right-0 bg-gray-100"></div>
      <div className="order-page container mx-auto p-4 md:p-8 h-full">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 lg:pt-4 pt-16">
          Select Address for Delivery
        </h1>
        {loading ? (
          <BouncingDots />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="address-list grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.length > 0 ? (
              addresses.map((address, idx) => (
                <div
                  key={idx}
                  onClick={() => handleAddressSelect(address)}
                  className={`address-item p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAddress === address
                      ? "bg-blue-100 border-blue-500"
                      : "bg-white"
                  }`}
                >
                  <p className="font-semibold">{address.phoneNumber}</p>
                  <p className="font-semibold">
                    {address.houseNo}, {address.street}, {address.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    {address.district}, {address.state}, {address.pincode}
                  </p>
                  <p className="text-sm text-gray-600">{address.country}</p>
                </div>
              ))
            ) : (
              <div className="text-blue-500 text-xl underline">
                <Link to="/address">
                  No addresses available. Please add an address first. Click
                  Here
                </Link>
              </div>
            )}
          </div>
        )}

        <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4">
          Order Summary
        </h2>
        {orderSummary ? (
          <div className="order-summary bg-gray-100 p-4 rounded-lg">
            {orderSummary.products.map((item, idx) => (
              <div
                key={idx}
                className="order-item flex justify-between py-2 border-b last:border-b-0"
              >
                <p className="font-semibold">
                  {item.product.title} (x{item.quantity})
                </p>
                <p className="font-bold">Rs. {item.price.toFixed(2)}</p>
              </div>
            ))}
            <p className="text-xl font-bold mt-4">
              Discounted Total: Rs. {discountedTotal.toFixed(2)}{" "}
              {orderSummary.discountPercentage > 0 && (
                <span className="text-sm text-gray-600">
                  ({orderSummary.discountPercentage}% off)
                </span>
              )}
            </p>
          </div>
        ) : (
          <p>Loading order summary...</p>
        )}

        <button
          onClick={handleProceedToPayment}
          className="checkout-button mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors w-full md:w-auto"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
