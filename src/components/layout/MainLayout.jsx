import React from "react";
import Navbar from "../common/Navbar";
import Footer from "../../pages/user/Footer";

function MainLayout({ children }) {
  return (
    <div>
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <div className="relative h-[100%] w-full pt-[4rem] lg:px-[3rem] z-0 bg-slate-100 pb-10">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
