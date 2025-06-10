import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Admin = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-8 md:pl-[15rem]">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Admin;
