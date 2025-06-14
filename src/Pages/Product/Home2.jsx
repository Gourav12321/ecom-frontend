import apiClient from '../../config/api.js';
import React, { useEffect, useState } from 'react';
import VerticalCardProduct from './VerticalCardProduct';

const Home2= () => {
  const [categoryProduct, setCategoryProduct] = useState([]);


  const fetchCategoryProduct = async () => {
    try {
      const response = await apiClient.get('/api/categories');
    
      setCategoryProduct(response.data.categories);
    } catch (error) {
      console.error('Error fetching category products:', error);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);


  return (
   
          categoryProduct.map((product, index) => (
            <div key={index}>
            <VerticalCardProduct heading={product.name} categoryName={product.name}/>
            </div>
          ))
     
  );
};

export default Home2;
