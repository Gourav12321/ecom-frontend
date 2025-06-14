import React, { useEffect, useState } from 'react';
import apiClient from '../../config/api.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Rating, CircularProgress } from '@mui/material';
import { FiHeart } from 'react-icons/fi';
import { IoIosHeart } from 'react-icons/io';
import { useSelector } from 'react-redux';
import {  toast } from 'react-toastify';
const VerticalCardProduct = ({ heading, categoryName }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/api/products/category/${categoryName}`);
        setProducts(response.data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user && user.email) {
        try {
          const response = await apiClient.get(`/api/wishlist/${user.email}`);
          setWishlist(response.data.wishlist.products.map((p) => p._id));
        } catch (err) {
          console.error('Error fetching wishlist:', err);
        }
      }
    };

    fetchWishlist();
  }, [user]);

  const handleWishlistToggle = async (productId) => {
    if (!user || !user.email) return;

    try {
      if (wishlist.includes(productId)) {
        await apiClient.delete('/api/wishlist', { data: { email: user.email, productId } });
        setWishlist(wishlist.filter((id) => id !== productId));
        toast.success('Product Remove from wishlist')
      } else {
        await apiClient.post('/api/wishlist', { email: user.email, productId });
        
        setWishlist([...wishlist, productId]);
        toast.success('Product Added to wishlist')
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err);
    }
  };

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">{heading}</h2>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <CircularProgress />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className='h-[20rem] md:h-[20rem]'
          >
            {products.length > 0 ? (
              products.map((product) => (
                <SwiperSlide key={product._id}>
                  <div className="relative flex flex-col p-4 bg-gray-100 rounded-lg  transition-transform transform hover:scale-105">
                    {user && user.email && (
                      <button
                        onClick={() => handleWishlistToggle(product._id)}
                        className="absolute top-2 right-2 p-2 z-10 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
                        title={wishlist.includes(product._id) ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        {wishlist.includes(product._id) ? (
                          <IoIosHeart className="w-6 h-6 text-red-500" />
                        ) : (
                          <FiHeart className="w-6 h-6 text-gray-500" />
                        )}
                      </button>
                    )}
                    <Link to={`/product/${product._id}`} className="block">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-32 object-contain rounded mix-blend-multiply"
                      />
                      <h3 className="text-lg font-medium mt-2 truncate">{product.title}</h3>
                      <h3 className="font-medium truncate">{product.brand}</h3>
                      <p className="text-sm text-gray-600 pb-2">
                        {product.category && product.category.name ? product.category.name : ''}
                      </p>
                      <div className="flex items-center space-x-2">
                        {product.discountPercentage && product.discountPercentage > 0 ? (
                          <>
                            <p className="text-sm text-red-500 line-through">Rs. {product.price.toFixed(2)}</p>
                            <p className="text-sm text-green-500 font-semibold">
                            Rs. {((product.price * (1 - product.discountPercentage / 100)).toFixed(2))}
                            </p>
                            <span className="text-green-600 text-sm font-bold">{product.discountPercentage}% OFF</span>
                          </>
                        ) : (
                          <p className="text-sm text-gray-600">Rs. {product.price.toFixed(2)}</p>
                        )}
                      </div>
                      <Rating
                        value={product.rating}
                        readOnly
                        precision={0.5}
                        size="small"
                      />
                    </Link>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p className="text-center text-gray-500">No products found.</p>
            )}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
