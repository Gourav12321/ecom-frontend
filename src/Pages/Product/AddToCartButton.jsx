import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../store/slices/cartSlice";
import axios from "axios";

const AddToCartButton = ({ product, quantity = 1 }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleAddToCart = async () => {
    if (!user) {
      toast.warn("Please sign in to add items to your cart.");
      return;
    }

    try {
      const response = await axios.post("/api/cart/add", {
        email: user.email,
        cart: [{ productId: product._id, quantity }],
      });

      if (response.status === 201) {
        dispatch(addToCart({ productId: product._id, quantity }));
        toast.success("Product Added to Cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </>
  );
};

export default AddToCartButton;
