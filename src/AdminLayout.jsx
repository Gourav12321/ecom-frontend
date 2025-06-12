import React from 'react';
import Navbar from './Component/Navbar';

function AdminLayout({ children }) {
  return (
    <div>
      <div className='fixed w-full z-50'>
        <Navbar />
      </div>
      <div className='h-screen lg:h-[100%]  w-full pt-[4rem] lg:px-[1rem] px-4 z-0'>
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
