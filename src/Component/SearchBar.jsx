import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import debounce from "lodash.debounce";
import apiClient from "../config/api";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [icon, setIcon] = useState(false);
  const inputRef = useRef(null);
  const location = useLocation();

  // Debounced search function
  const debouncedSearch = useRef(
    debounce(async (query) => {
      if (query.trim()) {
        try {
          const response = await apiClient.get(
            `/api/search?query=${encodeURIComponent(query.trim())}`
          );
          const data = await response.data;
          if (data.success) {
            setSearchResults(data.products);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    }, 300)
  ).current;

  const handleChange = (e) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleClick = () => {
    setIcon(!icon);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIcon(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIcon(false);
    setSearch("");
  }, [location]);
  const test = () => {
    alert("hello");
  };
  return (
    <div className="relative w-full lg:w-[45vw] h-[40px] items-center">
      <input
        type="text"
        className="text-black h-[40px] w-full lg:w-[45vw] rounded-full text-center border border-gray-300"
        value={search}
        placeholder="Search"
        onChange={handleChange}
        ref={inputRef}
        onClick={handleClick}
      />
      {icon && (
        <div
          className={`absolute w-full bg-white border border-gray-300 shadow-lg mt-2 overflow-y-auto h-[20rem] ${
            search === "" ? "hidden" : "block"
          }`}
          ref={inputRef}
          onClick={handleClick}
        >
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((product) => (
                <li
                  key={product._id}
                  className="p-2 border-b hover:bg-gray-100"
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="flex items-center"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-12 h-12 object-cover mr-2"
                    />
                    <div className="text-sm">
                      <p className="font-semibold">{product.title}</p>
                      <p>{product.description.slice(0, 50)}...</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
