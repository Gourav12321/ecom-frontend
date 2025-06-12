
import React from "react";

const SortingOptions = ({ handleSortChange }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Sort by</h2>
      <select
        onChange={(e) => handleSortChange(e.target.value)}
        className="w-full p-2 border rounded-lg"
      >
        <option value="priceLowToHigh">Price: Low to High</option>
        <option value="priceHighToLow">Price: High to Low</option>
        <option value="nameAToZ">Name: A to Z</option>
        <option value="nameZToA">Name: Z to A</option>
        <option value="ratingHighToLow">Rating: High to Low</option>
        <option value="ratingLowToHigh">Rating: Low to High</option>
      </select>
    </div>
  );
};

export default SortingOptions;
