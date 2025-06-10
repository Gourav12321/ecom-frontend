import React from 'react'
import CategoryList from '../Product/CategoryList'
import Home2 from '../Product/Home2';
import BannerProduct from '../Product/BannerProduct';
import Footer from './Footer';
function Home() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='w-full'>
      <CategoryList/>
      </div>
      <BannerProduct/>
      <div className='w-full flex flex-col gap-5'>
        <Home2/>
      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default Home