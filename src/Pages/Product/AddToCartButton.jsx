import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiClient from '../../config/api.js';
import { addToCart } from '../Redux/cartSlice';
import { toast } from 'react-toastify';

const AddToCartButton = ({ product, quantity = 1 }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleAddToCart = async () => {
    if (!user) {
      toast.warn('Please sign in to add items to your cart.');
      return;
    }

    try {
      const response = await apiClient.post('/api/cart/add', {
        email: user.email,
        cart: [{ productId: product._id, quantity }],
      });

      if (response.status === 201) {
        dispatch(addToCart({ productId: product._id, quantity }));
        toast.success('Product Added to Cart')
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <>
      <button onClick={handleAddToCart} >
        Add to Cart
      </button>
    </>
  );
};

export default AddToCartButton;
