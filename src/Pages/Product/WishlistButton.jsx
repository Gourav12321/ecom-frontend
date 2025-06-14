import React from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../config/api.js";
import { MdFavoriteBorder } from "react-icons/md";
import { toast } from "react-toastify";
const WishlistButton = ({ product }) => {
  const user = useSelector((state) => state.user.user);

  const handleAddToWishlist = async () => {
    try {
      if (!user) {
        return toast.error("Please Sign In First");
      }
      await apiClient.post("/api/wishlist", {
        email: user.email,
        productId: product,
      });
      toast.success("Added to Wishlist!");
    } catch (error) {
      toast.error("Error adding to wishlist:", error);
    }
  };

  return (
    <div className="relative ">
      <button onClick={handleAddToWishlist} className="">
        <MdFavoriteBorder className="inline-block mr-2 " />
        Add to Wishlist
      </button>
    </div>
  );
};

export default WishlistButton;
