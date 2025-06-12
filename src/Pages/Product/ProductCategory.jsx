import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom'; 
import CategoryFilter from './CategoryFilter';
import SortingOptions from './SortingOptions';
import ProductList from './ProductList';
import { fetchCategories, fetchProductsByCategory } from './ApiService.js';
import BouncingDots from '../BouncingDots.jsx';

function ProductCategory() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const location = useLocation(); 
  const searchParams = new URLSearchParams(location.search); 
  const categoryQuery = searchParams.get('category'); 

  // Fetch categories on initial load
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  // Update the selected categories from URL
  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategories(categoryQuery.split(','));
      fetchProductsByCategoryData(categoryQuery.split(','));
    }
  }, [categoryQuery]);

  // Fetch products for selected categories
  const fetchProductsByCategoryData = async (categories) => {
    try {
      setLoading(true);
      const products = await fetchProductsByCategory(categories.join(','));
      setSortedProducts(Array.isArray(products) ? products : []);
    } catch (error) {
      console.error('Failed to fetch products', error);
      setSortedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle category selection and fetching products by category
  const handleCategoryChange = (categoryId) => {
    let updatedCategories;
    
    if (selectedCategories.includes(categoryId)) {
      updatedCategories = selectedCategories.filter((id) => id !== categoryId);
    } else {
      updatedCategories = [...selectedCategories, categoryId];
    }

    setSelectedCategories(updatedCategories);
    fetchProductsByCategoryData(updatedCategories);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  // Sorting logic
  const sortedProductsList = useMemo(() => {
    let productsArray = Array.isArray(sortedProducts) ? [...sortedProducts] : [];

    switch (sortOption) {
      case 'priceLowToHigh':
        productsArray.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'priceHighToLow':
        productsArray.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'nameAToZ':
        productsArray.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      case 'nameZToA':
        productsArray.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
        break;
      case 'ratingHighToLow':
        productsArray.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'ratingLowToHigh':
        productsArray.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
      default:
        break;
    }

    return productsArray;
  }, [sortedProducts, sortOption]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (loading) {
    return <div><BouncingDots /></div>;
  }

  return (
    <>
      <div className='w-full h-screen -z-10 absolute left-0 right-0 bg-gray-100'></div>
      <div className="flex flex-row gap-4 md:p-4 md:pt-[5rem] lg:pt-4 pt-[5rem] pl-0 lg:h-full ">
        <aside
          className={`md:w-1/4 fixed md:m-4 lg:pt-16 md:pt-[10rem] top-0 left-0 h-full bg-white shadow-md p-4 rounded-lg transform ${
            isFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } transition-transform duration-300 ease-in-out z-50 md:z-0`}
        >
          <button
            className="md:hidden block absolute top-4 right-4 bg-red-500 w-8 h-8 text-white rounded-full lg:pt-5 md:pt-10 mt-[8rem]"
            onClick={toggleFilter}
          >
            X
          </button>
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            handleCategoryChange={handleCategoryChange}
          />
        </aside>
        <main className="w-full px-4 md:w-3/4 ml-auto">
          <div className="flex justify-between items-center ">
            <button
              className="md:hidden block font-semibold text-start top-0 bg-slate-300 p-2 mr-10 w-1/3  rounded-xl"
              onClick={toggleFilter}
            >
              Filter By Category
            </button>
            <SortingOptions handleSortChange={handleSortChange} className="w-1/2" />
          </div>
          <p className='font-bold py-3'>Total Result : {sortedProductsList.length}</p>
          <ProductList products={sortedProductsList} />
        </main>
      </div>
    </>
  );
}

export default ProductCategory;
