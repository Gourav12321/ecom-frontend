import React, { useState, useEffect } from "react";
import apiClient from "../../config/api.js";
import { storage } from "../../Firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

const UploadProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    tags: "",
    brand: "",
    sku: "",
    weight: "",
    dimensions: {
      width: "",
      height: "",
      depth: "",
    },
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    returnPolicy: "",
    minimumOrderQuantity: "",
    thumbnail: "",
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [imageLinks, setImageLinks] = useState([]);
  const [imageLink, setImageLink] = useState("");
  const [isImageUpload, setIsImageUpload] = useState(true);
  const [thumbnailUpload, setThumbnailUpload] = useState(true);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await apiClient.get("/api/categories");
        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setProduct((prevProduct) => ({ ...prevProduct, category: categoryId }));

    try {
      const { data } = await apiClient.get(
        `/api/categories/${categoryId}/subcategories`
      );
      setSubcategories(data.subcategories);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };

  const handleSubcategoryChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      subcategory: e.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [key, nestedKey] = name.split(".");
      setProduct((prevProduct) => ({
        ...prevProduct,
        [key]: {
          ...prevProduct[key],
          [nestedKey]: value,
        },
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = [];

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onloadend = () => {
          urls.push(reader.result);
          setImageURLs(urls);
        };

        reader.readAsDataURL(file);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          images: "Please select valid image files.",
        }));
      }
    });
    toast.success("Photo Uploaded!");
    setSelectedImages(files);
  };

  const handleImageLinkChange = (e) => {
    setImageLink(e.target.value);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setThumbnailURL(reader.result);
      };

      reader.readAsDataURL(file);
      setThumbnailImage(file);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        thumbnail: "Please select a valid image file.",
      }));
    }
    toast.success("Photo Uploaded!");
  };

  const handleThumbnailLinkChange = (e) => {
    setThumbnailURL(e.target.value);
  };

  const handleUpload = async () => {
    setLoading(true);
    setErrors({});

    try {
      let thumbnailUrl = thumbnailURL;

      if (thumbnailUpload && thumbnailImage) {
        const storageRef = ref(storage, `thumbnails/${thumbnailImage.name}`);
        await uploadBytes(storageRef, thumbnailImage);
        thumbnailUrl = await getDownloadURL(storageRef);
      }

      let imageUrls = [];

      if (isImageUpload) {
        imageUrls = await Promise.all(
          selectedImages.map(async (file) => {
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            return getDownloadURL(storageRef);
          })
        );
      } else if (imageLinks.length > 0) {
        imageUrls = imageLinks;
      }

      if (!thumbnailUrl) {
        throw new Error("Thumbnail image is required.");
      }

      if (imageUrls.length === 0) {
        throw new Error("At least one product image is required.");
      }

      const productData = {
        ...product,
        thumbnail: thumbnailUrl,
        images: imageUrls,
      };

      await apiClient.post("/api/products", productData);
      toast.success("Product uploaded successfully!");
      // Reset form or redirect after successful upload if needed
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error(
        `Failed to upload product: ${error.message || "Unknown error occurred"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:pt-0 pt-10  sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Upload Product</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Form Fields */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
          {/* Example Field */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={product.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Product Title"
            />
          </div>
          {/* Add similar inputs for other fields */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Product Description"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Product Price"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-2"
              htmlFor="discountPercentage"
            >
              Discount Percentage
            </label>
            <input
              id="discountPercentage"
              name="discountPercentage"
              type="number"
              value={product.discountPercentage}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Discount Percentage"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="rating">
              Rating
            </label>
            <input
              id="rating"
              name="rating"
              type="number"
              step="0.1"
              max="5"
              value={product.rating}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Product Rating"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="stock">
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Stock Quantity"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="tags">
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={product.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Product Tags"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="brand">
              Brand
            </label>
            <input
              id="brand"
              name="brand"
              type="text"
              value={product.brand}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Product Brand"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="sku">
              SKU
            </label>
            <input
              id="sku"
              name="sku"
              type="text"
              value={product.sku}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Product SKU"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="weight">
              Weight
            </label>
            <input
              id="weight"
              name="weight"
              type="text"
              value={product.weight}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Product Weight"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-2"
              htmlFor="dimensions.width"
            >
              Width
            </label>
            <input
              id="dimensions.width"
              name="dimensions.width"
              type="text"
              value={product.dimensions.width}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Width"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-2"
              htmlFor="dimensions.height"
            >
              Height
            </label>
            <input
              id="dimensions.height"
              name="dimensions.height"
              type="text"
              value={product.dimensions.height}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Height"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-2"
              htmlFor="dimensions.depth"
            >
              Depth
            </label>
            <input
              id="dimensions.depth"
              name="dimensions.depth"
              type="text"
              value={product.dimensions.depth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Depth"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-2"
              htmlFor="warrantyInformation"
            >
              Warranty Information
            </label>
            <textarea
              id="warrantyInformation"
              name="warrantyInformation"
              value={product.warrantyInformation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Warranty Information"
              rows="3"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-2"
              htmlFor="shippingInformation"
            >
              Shipping Information
            </label>
            <textarea
              id="shippingInformation"
              name="shippingInformation"
              value={product.shippingInformation}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Shipping Information"
              rows="3"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-2"
              htmlFor="availabilityStatus"
            >
              Availability Status
            </label>
            <input
              id="availabilityStatus"
              name="availabilityStatus"
              type="text"
              value={product.availabilityStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Availability Status"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="returnPolicy">
              Return Policy
            </label>
            <textarea
              id="returnPolicy"
              name="returnPolicy"
              value={product.returnPolicy}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Return Policy"
              rows="3"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 mb-2"
              htmlFor="minimumOrderQuantity"
            >
              Minimum Order Quantity
            </label>
            <input
              id="minimumOrderQuantity"
              name="minimumOrderQuantity"
              type="number"
              value={product.minimumOrderQuantity}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Minimum Order Quantity"
            />
          </div>
        </div>

        {/* Category and Subcategory */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="subcategory">
            Subcategory
          </label>
          <select
            id="subcategory"
            name="subcategory"
            value={product.subcategory}
            onChange={handleSubcategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Thumbnail Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="thumbnail">
            Thumbnail
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={thumbnailURL}
                onChange={handleThumbnailLinkChange}
                placeholder="Enter image URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
          {thumbnailImage && (
            <img
              src={thumbnailURL}
              alt="Thumbnail Preview"
              className="mt-4 w-32 h-32 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Images Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Product Images</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              {errors.images && (
                <p className="text-red-500 text-sm">{errors.images}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-4">
                {imageURLs.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Product Image ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={imageLink}
                onChange={handleImageLinkChange}
                placeholder="Enter image URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={() => setImageLinks([...imageLinks, imageLink])}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add URL
              </button>
              <div className="mt-4 flex flex-wrap gap-4">
                {imageLinks.map((link, index) => (
                  <img
                    key={index}
                    src={link}
                    alt={`Product Image ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleUpload}
            className={`px-6 py-3 bg-green-500 text-white rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadProduct;
