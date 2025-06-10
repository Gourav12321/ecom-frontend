import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/order/admin/orders`, {
        params: { searchQuery },
      });

      if (response.data.success) {
        const { orders } = response.data;
        if (Array.isArray(orders)) {
          setOrders(orders);
        } else {
          setError('Unexpected response format');
        }
      } else {
        setError('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [searchQuery]);

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.post(`/api/order/admin/orders/update-status`, { orderId, status });
      fetchOrders();
      toast.success('Status has been updated');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`/api/order/admin/orders/delete`, { data: { orderId } });
      fetchOrders();
      toast.success('Order has been deleted');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    }
  };

  return (
    <div className="admin-order-page pt-10 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Manage Orders</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Products</th>
                <th className="px-4 py-2 text-left">Total Amount</th>
                <th className="px-4 py-2 text-left">Order Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{order._id}</td>
                    <td className="px-4 py-2">{order.user ? order.user.email : 'Unknown User'}</td>
                    <td className="px-4 py-2">{order.products.map(p => p.product.title).join(', ')}</td>
                    <td className="px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <select
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        value={order.orderStatus}
                        className="p-2 border border-gray-300 rounded w-full"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleDeleteOrder(order._id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <FaTrashAlt size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-600">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrderPage;
