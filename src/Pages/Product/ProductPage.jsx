import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../config/api.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewForm from "./ReviewForm";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Rating } from "@mui/material";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";
import VerticalCardProduct from "./VerticalCardProduct";
import { useSelector } from "react-redux";
import BouncingDots from "../BouncingDots";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const user = useSelector((state) => state.user.user);

  // Fetch product data
  const fetchProduct = async () => {
    try {
      const response = await apiClient.get(`/api/products/${id}`);
      setProduct(response.data.product);
      setSelectedImage(response.data.product.images[0]);
    } catch (err) {
      setError("Failed to load product.");
      toast.error("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  // Call fetchProduct when id changes
  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Handle image zoom

  if (loading)
    return (
      <div>
        <BouncingDots />
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-10 text-red-500 text-xl font-semibold">
        {error}
      </div>
    );

  const discountPercentage = product.discountPercentage || 0;
  const discountedPrice =
    product.price - (product.price * discountPercentage) / 100;

  return (
    <div className="container mx-auto p-6 lg:pt-10 md:pt-20 pt-20 md:p-8">
      <div className="flex flex-col md:flex-row">
        {/* Main Image and Zoom Preview */}
        <div className="w-full md:w-1/3 flex flex-col items-start relative">
          <div className="w-full mb-4 relative">
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg relative">
              <div className="relative h-[25rem]">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-contain mix-blend-multiply"
                  style={{ maxHeight: "550px" }}
                />
              </div>
            </div>
            {/* Thumbnail Images */}
            <div className="w-full flex gap-6 mt-4">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="cursor-pointer border border-gray-300 rounded-lg overflow-hidden bg-white w-[4rem]"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-24 object-contain transition-transform duration-300 transform hover:scale-105 mix-blend-multiply"
                    onError={(e) =>
                      (e.target.src = "/path/to/placeholder-image.jpg")
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Zoom Preview */}
        </div>

        {/* Product Details */}
        <div className="w-full md:w-2/3 md:pl-8 mt-6 md:mt-0">
          <h1 className="lg:text-4xl md:text-2xl text-xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="md:text-xl text-[14px] text-gray-600 mb-6 ">
            {product.description}
          </p>

          {discountPercentage > 0 ? (
            <div className="mb-4">
              <p className="lg:text-2xl text-xl font-semibold text-green-500">
                Rs.{discountedPrice.toFixed(2)}
                <span className="line-through text-gray-500 ml-2">
                  Rs.{product.price.toFixed(2)}
                </span>
              </p>
              <p className="text-lg font-medium text-green-500">
                Save {discountPercentage}%
              </p>
            </div>
          ) : (
            <p className="lg:text-2xl text-xl font-semibold text-gray-900 mb-4">
              Rs.{product.price}
            </p>
          )}

          <p className="md:text-lg text-[14px] font-medium text-gray-700 mb-4">
            Brand: <span className="font-normal">{product.brand}</span>
          </p>
          <p className="md:text-lg text-[14px]  font-medium text-gray-700 mb-4">
            SKU: <span className="font-normal">{product.sku}</span>
          </p>
          <p className="md:text-lg text-[14px]  font-medium text-gray-700 mb-4">
            Stock: <span className="font-normal">{product.stock}</span>
          </p>
          <div className="flex gap-4 mb-6">
            <button className="bg-[#FF9F00] text-white md:py-3 py-4  text-[12px]  md:text-xl px-6 rounded-lg shadow-lg hover:bg-[#eca128] transition duration-300">
              <AddToCartButton product={product} />
            </button>
            <button className="bg-[#FB641B] font-semibold text-white md:py-3 py-4 px-6 text-[12px] md:text-xl rounded-lg shadow-lg hover:bg-[#dd520d] transition duration-300">
              <WishlistButton product={id} />
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 text-[14px]">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Product Details:
            </h2>
            <p className="text-gray-700 mb-1">
              Weight: <span className="font-normal">{product.weight} gm</span>
            </p>
            <p className="text-gray-700 mb-1">
              Dimensions:{" "}
              <span className="font-normal">
                {product.dimensions.width}x{product.dimensions.height}x
                {product.dimensions.depth} mm
              </span>
            </p>
            <p className="text-gray-700 mb-1">
              Warranty:{" "}
              <span className="font-normal">{product.warrantyInformation}</span>
            </p>
            <p className="text-gray-700 mb-1">
              Shipping Info:{" "}
              <span className="font-normal">{product.shippingInformation}</span>
            </p>
            <p className="text-gray-700">
              Return Policy:{" "}
              <span className="font-normal">{product.returnPolicy}</span>
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md text-[14px]">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Tags:</h2>
            <ul className="list-disc list-inside text-gray-700">
              {product.tags.map((tag) => (
                <li key={tag} className="mb-1">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <p className="md:text-2xl text-[18px]  font-semibold my-4">
          Recommended Products
        </p>
        <VerticalCardProduct
          categoryName={
            Array.isArray(product.category)
              ? product.category.map((en) => en.name).join(", ")
              : product.category?.name || "Unknown Category"
          }
          heading={
            Array.isArray(product.category)
              ? product.category.map((en) => en.name).join(", ")
              : product.category?.name || "Unknown Category"
          }
        />
      </div>
      {/* Customer Reviews Section */}
      <div className="mt-10 w-full lg:px-10 md:px-1 overflow-hidden">
        <h2 className="md:text-2xl text-xl font-semibold mb-4">
          Customer Reviews
        </h2>
        {product.reviews.length > 0 ? (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            modules={[Autoplay, Pagination]}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {product.reviews.map((review, index) => (
              <SwiperSlide key={index} className="p-2 rounded-lg bg-gray-100">
                <div className="p-4 shadow-md">
                  <Rating
                    value={review.rating}
                    precision={0.5}
                    readOnly
                    className="mb-2"
                  />
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <p className="text-sm text-gray-500">
                    {" "}
                    {review.reviewerName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {" "}
                    {review.reviewerEmail}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-lg font-semibold text-gray-700">No reviews yet.</p>
        )}
        {user && <ReviewForm productId={id} onReviewSubmitted={fetchProduct} />}
      </div>
    </div>
  );
};

export default ProductPage;
