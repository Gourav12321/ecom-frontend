import React from "react";

const CategoryFilter = ({
  categories,
  selectedCategories,
  handleCategoryChange,
}) => {
  if (!Array.isArray(categories)) {
    return <div>Error: Invalid categories data</div>;
  }
  return (
    <div className="mb-4 lg:pt-5 md:pt-10 pt-[10rem]">
      <h2 className="text-lg  font-semibold mb-2">Filter by Category</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={category._id}
              checked={selectedCategories.includes(category._id)}
              onChange={() => handleCategoryChange(category._id)}
              className="mr-2"
            />
            <label htmlFor={category._id} className="cursor-pointer">
              {category.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
