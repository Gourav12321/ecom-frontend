import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import apiClient from "../../config/api";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.email) {
        try {
          const response = await apiClient.get(`/api/order/user/${user.email}`);
          if (response.data) {
            setOrders(response.data);
          } else {
            setError("Failed to fetch orders");
          }
        } catch (err) {
          console.error("Error fetching orders:", err);
          setError("Failed to fetch orders");
        }
      }
    };

    fetchOrders();
  }, [user]);

  const formatCurrency = (amount) => `Rs.${amount.toFixed(2)}`;
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const calculatePriceAfterDiscount = (price, discountPercentage) => {
    return price * (1 - discountPercentage / 100);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 lg:pt-0 md:pt-10 pt-10">
        Order History
      </h1>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  Order Date: {formatDate(order.createdAt)}
                </p>
                <p className="text-xl font-bold mb-4 text-gray-800">
                  Total Amount:{" "}
                  <span className="">{formatCurrency(order.totalAmount)}</span>
                </p>
                <p className="text-sm  text-gray-600">
                  Shipment Status:{" "}
                  <span className="font-bold underline">
                    {order.orderStatus}
                  </span>
                </p>
                <div className="order-products">
                  {order.products && order.products.length > 0 ? (
                    order.products.map((item, idx) => (
                      <div
                        key={item.product._id + idx}
                        className="border-t border-gray-200 pt-4 mt-4"
                      >
                        <Link to={`/product/${item.product._id}`}>
                          <div className="h-[11rem]">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-[10rem] w-full object-contain"
                            />
                          </div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.product.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-gray-600">
                            Original Price: {formatCurrency(item.product.price)}
                          </p>
                          {item.product.discountPercentage > 0 && (
                            <p className="text-sm text-green-500">
                              Price After Discount:{" "}
                              {formatCurrency(
                                calculatePriceAfterDiscount(
                                  item.product.price,
                                  item.product.discountPercentage
                                )
                              )}
                            </p>
                          )}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-lg text-gray-500">
                      No products found in this order.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
