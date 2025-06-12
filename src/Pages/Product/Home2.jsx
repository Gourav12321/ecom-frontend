import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import VerticalCardProduct from './VerticalCardProduct';

const Home2= () => {
  const [categoryProduct, setCategoryProduct] = useState([]);


  const fetchCategoryProduct = async () => {
    try {
      const response = await axios.get('/api/categories');
    
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
