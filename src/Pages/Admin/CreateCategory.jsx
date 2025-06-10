import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../Firebase';
import {  toast } from 'react-toastify';
const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error(error);
        setMessage('Failed to fetch categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubCategoryChange = (e) => {
    setSubCategoryName(e.target.value);
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `categories/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        console.error(error);
        setMessage('Failed to upload image.');
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (type === 'photo') {
            setImageUrl(downloadURL);
          }
          setUploading(false);
        });
      }
    );
    toast.success('Photo is uploaded')
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/categories', {
        name: categoryName,
        photo: imageUrl,
      });
      if (response.data.success) {
        setMessage('Category created successfully!');
        setCategoryName('');
        setImageUrl('');
        setCategories([...categories, response.data.category]);
        toast.success('Category is Added');
      } else {
        setMessage('Failed to create category.');
        
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred.');
    }
  };

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/subcategories', {
        name: subCategoryName,
        categoryId: selectedCategory,
      });
      if (response.data.success) {
        setMessage('Subcategory created successfully!');
        setSubCategoryName('');
        toast.success('Subcategory is Added');
      } else {
        setMessage('Failed to create subcategory.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred.');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await axios.delete(`/api/categories/${categoryId}`);
        if (response.data.success) {
          setMessage("Category deleted successfully!");
          toast.success('Category has been deleted')
          setCategories(categories.filter((cat) => cat._id !== categoryId));
        } else {
          setMessage("Failed to delete category.");
        }
      } catch (error) {
        console.error(error);
        setMessage("An error occurred.");
      }
    }
  };

  const handleDeleteSubCategory = async (subCategoryId) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        const response = await axios.delete(`/api/subcategories/${subCategoryId}`);
        if (response.data.success) {
          setMessage("Subcategory deleted successfully!");
          toast.success('Subcategory deleted successfully!')
          setCategories(
            categories.map((cat) => ({
              ...cat,
              subcategories: cat.subcategories.filter((sub) => sub._id !== subCategoryId),
            }))
          );
        } else {
          setMessage("Failed to delete subcategory.");
        }
      } catch (error) {
        console.error(error);
        setMessage("An error occurred.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:pt-0 pt-10 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Category and Subcategory</h1>

      <div className="space-y-6">
        {/* Create Category Form */}
        <form onSubmit={handleCategorySubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create Category</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">Category Name</label>
            <input
              type="text"
              id="category"
              value={categoryName}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter category name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter image URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="uploadImage">Or Upload Image</label>
            <input
              type="file"
              id="uploadImage"
              onChange={(e) => handleFileUpload(e, 'photo')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Create Category'}
          </button>
        </form>

        {/* Create Subcategory Form */}
        <form onSubmit={handleSubCategorySubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create Subcategory</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">Select Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="subcategory">Subcategory Name</label>
            <input
              type="text"
              id="subcategory"
              value={subCategoryName}
              onChange={handleSubCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter subcategory name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Create Subcategory
          </button>
        </form>
      </div>

      {message && <p className="mt-6 text-gray-700 text-center">{message}</p>}

      {/* Display Categories and Subcategories */}
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Manage Categories and Subcategories</h2>

        {categories.length === 0 ? (
          <p className="text-center text-gray-500">No categories available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category._id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold">{category.name}</h3>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {category.photo && (
                  <div className="mb-4">
                    <img
                      src={category.photo}
                      alt={category.name}
                      className="w-full h-40 object-contain rounded-md"
                    />
                  </div>
                )}

                {category.subcategories.length === 0 ? (
                  <p className="text-center text-gray-500">No subcategories available.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {category.subcategories.map((sub) => (
                      <div key={sub._id} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                        <span>{sub.name}</span>
                        <button
                          onClick={() => handleDeleteSubCategory(sub._id)}
                          className="text-red-500 hover:text-red-700 transition duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCategory;
