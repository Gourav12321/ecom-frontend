import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineDotsVertical, HiMenu } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";

function Navbar() {
  const [icon, setIcon] = useState(false);
  const inputRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarOpen1, setSidebarOpen1] = useState(false);
  const sidebarRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Calculate total quantity of items in the cart
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(totalQuantity);
  }, [cart]);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIcon(false);
      setSearch("");
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [icon, dropdownOpen, cart]);

  const handleLogout = () => {
    toast.success("You are Logged Out from This device");
    setTimeout(() => {
      dispatch(logout());
    }, 1500);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSidebar1 = () => {
    setSidebarOpen1(!sidebarOpen1);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <div className="bg-gray-50 shadow-md flex items-center justify-between lg:pl-12 pl-4 z-50 relative">
        <div className="lg:h-[60px] flex justify-start items-center">
          <Link to="/">
            <div className="flex justify-center items-center gap-4 shadow-lg lg:mr-10 mr-2 lg:px-3 px-6 my-2 py-2 bg-white rounded-full">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/e-com-ff1ce.appspot.com/o/logo.png?alt=media&token=ae807b0a-857b-45bd-8c4a-b895607b07bb"
                className="object-cover h-[30px] shadow-md rounded-full p-1 bg-black"
                alt="logo"
              />
              <div className="text-[10px] font-bold text-gray-800">
                <p>E-Commerce</p>
                <p>Website</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex">
          <SearchBar />
        </div>

        <div className="flex justify-evenly lg:w-[30%] w-[50%] items-center lg:pr-10">
          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown}>
                <img
                  src={user.profile}
                  alt="profile"
                  className="w-8 h-8 rounded-full mt-2"
                />
              </button>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-48"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-bold"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders-history"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-bold"
                  >
                    Orders History
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-bold"
                  >
                    Wishlist
                  </Link>
                  {user && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-bold"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to="/address"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 font-bold"
                  >
                    Address
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-800 font-bold hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="mr-4 text-gray-800 hover:text-gray-900"
            >
              Sign-in
            </Link>
          )}
          {user && (
            <Link to="/cart" className="relative">
              <span className="absolute bg-red-500 text-white rounded-lg -bottom-2 w-5 h-5 text-center text-[13px] -right-2 font-extrabold">
                {cartCount}
              </span>
              <MdOutlineShoppingCart className="text-2xl text-gray-800" />
            </Link>
          )}
          <div className="relative cursor-pointer" ref={dropdownRef}>
            <HiOutlineDotsVertical
              onClick={toggleSidebar1}
              className="text-2xl text-gray-800"
            />
            {sidebarOpen1 && (
              <div className="absolute right-0 mt-5 bg-white border border-gray-200 shadow-lg rounded-lg">
                <button
                  className="text-2xl font-bold text-end w-full pr-5"
                  onClick={toggleSidebar1}
                >
                  ×
                </button>
                <div className="flex justify-center mt-5">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/e-com-ff1ce.appspot.com/o/gm7274697%40gmail.com%2Fgourav-removebg-preview.png?alt=media&token=850c99b1-846a-46a3-a91f-47876c9e03f4"
                    alt="Creator Photo"
                    className="w-20 h-20 rounded-full border-2 border-blue-400 shadow-md"
                  />
                </div>
                <div className="text-center mt-4">
                  <h1 className="text-xl font-bold text-gray-800">
                    Gourav Maurya
                  </h1>
                  <p className="text-gray-600 mt-2 px-4">
                    I am a passionate MERN stack developer with expertise in
                    building dynamic and responsive web applications. Skilled in
                    MongoDB, Express.js, React, and Node.js, I create seamless
                    user experiences and efficient backend solutions.
                  </p>
                </div>
                <div className="mt-5 px-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-semibold">
                      Contact Info:
                    </span>
                    <span className="text-gray-800">+91 9354291197</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-600 font-semibold">Email:</span>
                    <a
                      href="mailto:mauryagourav82@gmail.com"
                      className="text-blue-500 hover:underline"
                    >
                      mauryagourav82@gmail.com
                    </a>
                  </div>
                  <div className="flex justify-center mt-4">
                    <a
                      href="https://advance-portfolio-web-app.onrender.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full transition duration-300"
                    >
                      View My Portfolio
                    </a>
                  </div>
                </div>
                <div className="bg-blue-100 text-center py-4 mt-6">
                  <p className="text-blue-700 text-sm">
                    Let's create something amazing together!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full pb-4 pt-2 lg:hidden flex gap-3 bg-gray-100">
        <div className="lg:hidden block relative items-center w-full px-5">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
