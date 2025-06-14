import React, { useState } from "react";
import apiClient from "../../config/api.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const user = useSelector((state) => state.user.user);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to submit a review");
      return;
    }

    try {
      const response = await apiClient.post("/api/reviews", {
        productId,
        rating,
        comment,
        email: user.email,
      });

      if (response.data.success) {
        toast.success("Review submitted successfully!");
        setRating(0);
        setComment("");
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md mt-6"
    >
      <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex items-center">
          <Rating
            name="product-rating"
            value={rating}
            onChange={handleRatingChange}
            size="large"
            precision={0.5}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Name
        </label>
        <input
          type="text"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
