import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed min-h-screen md:flex md:mt-0 mt-[4rem] z-20">
      <div className="bg-white shadow-md  md:hidden fixed">
        <button
          onClick={toggleSidebar}
          className="text-gray-800 focus:outline-none"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      <div
        className={` inset-y-0 left-0 transform lg:mt-0 md:mt-14 mt-[2rem] absolute ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out min-h-screen w-48 bg-white shadow-md border-r border-gray-200 p-4 z-20`}
      >
        <div className='mb-6'>
        <Link to='/admin/dashboard' className="text-2xl font-bold text-gray-800 ">Admin Panel</Link>
        </div>
        <nav className="space-y-4">
          <NavLink
            to="all-users"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-colors duration-300 ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-blue-100'
              }`
            }
            onClick={toggleSidebar} 
          >
            All Users
          </NavLink>
          <NavLink
            to="all-products"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-colors duration-300 ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-blue-100'
              }`
            }
            onClick={toggleSidebar} 
          >
            All Products
          </NavLink>
          <NavLink
            to="upload-product"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-colors duration-300 ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-blue-100'
              }`
            }
            onClick={toggleSidebar} 
          >
            Upload Product
          </NavLink>
          <NavLink
            to="create-category"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-colors duration-300 ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-blue-100'
              }`
            }
            onClick={toggleSidebar}
          >
            Category
          </NavLink>
          <NavLink
            to="banner-product"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-colors duration-300 ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-blue-100'
              }`
            }
            onClick={toggleSidebar} 
          >
            Banner Product
          </NavLink>
          <NavLink
            to="admin-order"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md transition-colors duration-300 ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-blue-100'
              }`
            }
            onClick={toggleSidebar}
          >
            All Orders
          </NavLink>
        </nav>
      </div>

    </div>
  );
};

export default Sidebar;
