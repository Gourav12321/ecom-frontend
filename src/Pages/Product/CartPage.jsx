import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItem, setCart } from '../Redux/cartSlice';
import apiClient from '../../config/api.js';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await apiClient.get(`/api/cart/user/${user.email}`);
        const orders = response.data.orders;
        if (orders && orders.length > 0) {
          const aggregatedCart = orders.reduce((acc, order) => {
            order.products.forEach((item) => {
              const existingItem = acc.find((cartItem) => cartItem.id === item.product._id);
              if (existingItem) {
                existingItem.quantity += item.quantity;
              } else {
                acc.push({
                  id: item.product._id,
                  product: item.product,
                  quantity: item.quantity,
                });
              }
            });
            return acc;
          }, []);

          dispatch(setCart(aggregatedCart));
        } else {
          dispatch(setCart([]));
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    if (user) {
      fetchCart();
    }
  }, [user, dispatch]);

  useEffect(() => {
    const calculateTotals = () => {
      const total = cartItems.reduce((total, item) => {
        const price = item.product?.price ?? 0;
        const discountPercentage = item.product?.discountPercentage ?? 0;
        const priceAfterDiscount = discountPercentage
          ? price * (1 - discountPercentage / 100)
          : price;
        return total + priceAfterDiscount * item.quantity;
      }, 0);

      const items = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      setTotalAmount(total);
      setTotalItems(items);
    };

    calculateTotals();
  }, [cartItems]);

  const handleDecreaseQuantity = async (id, quantity) => {
    try {
      if (quantity > 1) {
        const newQuantity = quantity - 1;
        await apiClient.post('/api/cart/update-item', {
          email: user.email,
          productId: id,
          quantity: newQuantity,
        });

        dispatch(updateCartItem({ productId: id, quantity: newQuantity }));
      } else {
        alert('Quantity cannot be less than 1');
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      alert('Failed to update item quantity');
    }
  };

  const handleIncreaseQuantity = async (id, quantity, stock) => {
    try {
      if (quantity < stock) {
        const newQuantity = quantity + 1;
        await apiClient.post('/api/cart/update-item', {
          email: user.email,
          productId: id,
          quantity: newQuantity,
        });

        dispatch(updateCartItem({ productId: id, quantity: newQuantity }));
      } else {
        alert('Cannot exceed available stock.');
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      alert('Failed to update item quantity');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await apiClient.post('/api/cart/remove-item', {
        email: user.email,
        productId: id,
      });

      const updatedCart = cartItems.filter(item => item.id !== id);
      dispatch(setCart(updatedCart));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Failed to remove item');
    }
  };

  return (
    <>
      <div className='w-full h-screen -z-10 absolute left-0 right-0 bg-gray-100 '></div>
      <div className="container mx-auto p-4 pt-20 h-full">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/4 w-full">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item , index) => (
                <div key={item.id} className="relative flex flex-col md:flex-row items-center border-b py-4 group">
                  <div className="md:w-3/4 w-full flex items-center">
                    <img
                      src={item.product?.thumbnail || 'default-thumbnail.jpg'}
                      alt={item.product?.title || 'Product Image'}
                      className="w-24 h-24 object-contain mr-4 mb-4 md:mb-0"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.product?.title || 'Untitled'}</h2>
                      <p>{item.product?.category?.name || 'No Category'}</p>
                      <p>Brand: {item.product?.brand || 'No Brand'}</p>
                      {item.product?.discountPercentage && item.product.discountPercentage > 0 ? (
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-red-500 line-through">Rs. {item.product.price.toFixed(2)}</p>
                          <p className="text-sm text-green-500 font-semibold">
                          Rs. {((item.product.price * (1 - item.product.discountPercentage / 100)).toFixed(2))}
                          </p>
                          <span className="text-green-600 text-sm font-bold">{item.product.discountPercentage}% OFF</span>
                        </div>
                      ) : (
                        <p className="font-bold">${item.product?.price?.toFixed(2) || '0.00'}</p>
                      )}
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                          className="px-2 py-1 bg-red-500 text-white rounded"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="mx-2 p-1 border border-gray-300 rounded text-center w-12"
                        />
                        <button
                          onClick={() => handleIncreaseQuantity(item.id, item.quantity, item.product?.stock || 0)}
                          className="px-2 py-1 bg-green-500 text-white rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="lg:w-1/3 w-full bg-gray-100 p-4 rounded-lg mt-4 lg:mt-0">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="border-b pb-2 mb-2">
              {cartItems.map((item, index) => (
                <div key={item.id} className="flex justify-between py-2">
                  <p>{item.product?.title || 'Untitled'} (x{item.quantity})</p>
                  <p>Rs. {((item.product?.price || 0) * (1 - (item.product?.discountPercentage || 0) / 100) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <p className="text-lg font-semibold">Total Items: {totalItems}</p>
            <p className="text-xl font-bold mt-2">Total Amount: Rs.{totalAmount.toFixed(2)}</p>
            <Link to="/orders" className="block mt-4 bg-blue-500 text-white py-2 rounded text-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
