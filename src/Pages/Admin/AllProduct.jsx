import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const calculateDiscountPrice = (price, discountPercentage) => {
    if (!discountPercentage) return price;
    return (price - (price * discountPercentage) / 100).toFixed(2);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      toast.success('Product has been deleted')
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      discountPercentage: product.discountPercentage || 0,
      rating: product.rating,
      brand: product.brand,
      stock: product.stock,
      sku: product.sku,
      weight: product.weight,
      dimensions: product.dimensions || { width: '', height: '', depth: '' },
      warrantyInformation: product.warrantyInformation || '',
      shippingInformation: product.shippingInformation || '',
      availabilityStatus: product.availabilityStatus || 'In stock',
      returnPolicy: product.returnPolicy || '',
      minimumOrderQuantity: product.minimumOrderQuantity || 1,
      tags: product.tags || [],
      thumbnail: product.thumbnail,
      images: product.images || [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('dimensions.')) {
      const [_, key] = name.split('.');
      setFormData({
        ...formData,
        dimensions: {
          ...formData.dimensions,
          [key]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSave = async (id) => {
    try {
      const updatedProduct = await axios.put(`/api/products/${id}`, formData);
      setProducts(products.map(product => product._id === id ? updatedProduct.data : product));
      setIsEditing(false);
      setSelectedProduct(null);
      toast.success('Product is updated ')
      fetchProducts
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:pt-0 pt-10">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer transition transform hover:scale-105"
            onClick={() => handleCardClick(product)}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-contain"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <div className="text-gray-600">
                <p className={`${product.discountPercentage ? 'line-through' : ''}`}> Rs.{product.price}</p>
                {product.discountPercentage && (
                  <p className="text-green-500 font-bold">
                   Rs. {calculateDiscountPrice(product.price, product.discountPercentage)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] relative overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            {!isEditing ? (
              <>
                <h2 className="text-2xl font-bold mb-4 text-center">{selectedProduct.title}</h2>
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  className="w-full h-64 object-contain mb-4"
                />
                <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
                <p className="mb-2">
                  <strong>Price:</strong>Rs. {selectedProduct.price}
                </p>
                {selectedProduct.discountPercentage && (
                  <p className="mb-2 text-green-500">
                    <strong>Discounted Price:</strong>Rs. {calculateDiscountPrice(selectedProduct.price, selectedProduct.discountPercentage)}
                  </p>
                )}
                <p className="mb-2">
                  <strong>Rating:</strong> {selectedProduct.rating} / 5
                </p>
                <p className="mb-2">
                  <strong>Brand:</strong> {selectedProduct.brand}
                </p>
                <p className="mb-2">
                  <strong>Stock:</strong> {selectedProduct.stock}
                </p>
                <p className="mb-2">
                  <strong>Tags:</strong> {selectedProduct.tags.join(', ')}
                </p>
                <p className="mb-2">
                  <strong>SKU:</strong> {selectedProduct.sku}
                </p>
                <p className="mb-2">
                  <strong>Weight:</strong> {selectedProduct.weight} gm
                </p>
                <p className="mb-2">
                  <strong>Dimensions:</strong> {selectedProduct.dimensions.width} x {selectedProduct.dimensions.height} x {selectedProduct.dimensions.depth} mm
                </p>
                <p className="mb-2">
                  <strong>Warranty:</strong> {selectedProduct.warrantyInformation}
                </p>
                <p className="mb-2">
                  <strong>Shipping Information:</strong> {selectedProduct.shippingInformation}
                </p>
                <p className="mb-2">
                  <strong>Availability Status:</strong> {selectedProduct.availabilityStatus}
                </p>
                <p className="mb-2">
                  <strong>Return Policy:</strong> {selectedProduct.returnPolicy}
                </p>
                <p className="mb-2">
                  <strong>Minimum Order Quantity:</strong> {selectedProduct.minimumOrderQuantity}
                </p>
                <div className="flex space-x-2 mt-4 justify-center">
                  <button
                    onClick={() => handleEdit(selectedProduct)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(selectedProduct._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4 text-center">Edit Product</h2>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(selectedProduct._id);
                }}>
                  {/* Repeat this pattern for all fields */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Discount Percentage</label>
                    <input
                      type="number"
                      name="discountPercentage"
                      value={formData.discountPercentage}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Rating</label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  {/* Add more fields similarly */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">SKU</label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Weight (gm)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Dimensions (mm)</label>
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="number"
                        name="dimensions.width"
                        value={formData.dimensions.width}
                        onChange={handleInputChange}
                        placeholder="Width"
                        className="p-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="number"
                        name="dimensions.height"
                        value={formData.dimensions.height}
                        onChange={handleInputChange}
                        placeholder="Height"
                        className="p-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="number"
                        name="dimensions.depth"
                        value={formData.dimensions.depth}
                        onChange={handleInputChange}
                        placeholder="Depth"
                        className="p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Warranty Information</label>
                    <input
                      type="text"
                      name="warrantyInformation"
                      value={formData.warrantyInformation}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Shipping Information</label>
                    <input
                      type="text"
                      name="shippingInformation"
                      value={formData.shippingInformation}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Availability Status</label>
                    <select
                      name="availabilityStatus"
                      value={formData.availabilityStatus}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="In stock">In stock</option>
                      <option value="Out of stock">Out of stock</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Return Policy</label>
                    <textarea
                      name="returnPolicy"
                      value={formData.returnPolicy}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Minimum Order Quantity</label>
                    <input
                      type="number"
                      name="minimumOrderQuantity"
                      value={formData.minimumOrderQuantity}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags.join(', ')}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tags: e.target.value.split(',').map((tag) => tag.trim()),
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
