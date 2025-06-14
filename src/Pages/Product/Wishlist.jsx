import React, { useEffect, useState } from "react";
import apiClient from "../../config/api.js";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import BouncingDots from "../BouncingDots";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await apiClient.get(`/api/wishlist/${user.email}`);
        setWishlist(response.data.wishlist.products);
      } catch (error) {
        setError("Error fetching wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user.email]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await apiClient.delete("/api/wishlist", {
        data: { email: user.email, productId },
      });

      const response = await apiClient.get(`/api/wishlist/${user.email}`);
      setWishlist(response.data.wishlist.products);
      toast.success("Removed from Wishlist");
    } catch (error) {
      setError("Error removing from wishlist");
    }
  };

  if (loading)
    return (
      <div className="w-full h-full">
        <BouncingDots />
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <div className="w-full h-screen -z-10 absolute left-0 right-0 bg-gray-100"></div>
      <div className="container mx-auto p-4 h-full">
        <h2 className="text-3xl font-bold mb-6 text-center lg:pt-0 pt-20">
          My Wishlist
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.length === 0 ? (
            <p className="text-center col-span-full text-gray-600">
              Your wishlist is empty.
            </p>
          ) : (
            wishlist.map((product) => (
              <div
                key={product._id}
                className="relative bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <button
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  title="Remove from wishlist"
                >
                  <MdDelete className="w-5 h-5" />
                </button>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-contain"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 truncate">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {product.description.length > 100
                        ? `${product.description.substring(0, 100)}...`
                        : product.description}
                    </p>
                    <div className="flex flex-col items-center justify-between">
                      {product.discountPercentage ? (
                        <div className="flex justify-center items-center gap-3">
                          <span className="line-through text-gray-500 text-sm">
                            Rs.{product.price.toFixed(2)}
                          </span>
                          <span className="text-green-500 font-bold text-lg">
                            Rs.
                            {(
                              product.price *
                              (1 - product.discountPercentage / 100)
                            ).toFixed(2)}
                          </span>
                          <span className="text-green-600 text-sm font-bold">
                            {product.discountPercentage}% OFF
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-800 font-bold text-lg">
                          Rs.{product.price.toFixed(2)}
                        </span>
                      )}
                      <Rating
                        value={product.rating}
                        readOnly
                        precision={0.5}
                        size="small"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
