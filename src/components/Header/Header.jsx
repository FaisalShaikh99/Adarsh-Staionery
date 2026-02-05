import React, { useEffect, useState } from "react";
import { FaSearch, FaPhoneAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
import productsData from "../../APIs/homeApi/allCategories.json";
import featuredProduct from "../../APIs/homeApi/featuredProduct.json";

function Header() {
  const navigate = useNavigate();
  const cartTotalQuantity = useSelector(
    (state) => state.cart.cartTotalQuantity
  );

  const [searchTerm, setSearchTerm] = useState(""); // state for search term
  const [suggestions, setSuggestions] = useState([]); // for search time suggestions
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const [showMobileSearch, setShowMobileSearch] = useState(false); // State for mobile search

  const allProducts = []; // single array jo all products ko store karega

  // hamara data ek object me hai isliye hamne sabhi categories ko ek array(allProducts) me store kiya

  // object.values -> Kisi object ke andar jo values hain, unko ek array ki form mein nikaal leta hai.
  // .forEach()    -> Jo array mila hai (Object.values() se), us par ek-ek item ke liye loop chalega.
  // ...productArray (Spread Operator)   -> : Ek array ke andar jo elements hain, unko individual elements ki tarah "phaila" dena.
  //allProducts.push(...productArray)   ->  fir sab products ko all products array me add kar dena
  Object.values(productsData).forEach((categoryGroup) => {
    Object.values(categoryGroup).forEach((productArray) => {
      allProducts.push(...productArray);
    });
  });
  allProducts.push(...featuredProduct);

  // Filter suggestions
  useEffect(() => {
    if (searchTerm.trim() === "") {
      // jab search term khali ho
      setSuggestions([]); // to suggestions ke liye empty array set kar do
      return;
    }

    // filter karne ke liye allProducts me filter laga kar products name lower case karo aur fir search term me include karo with lowercase
    const filtered = allProducts
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) // yaha include() check karta hai ki product ka name search term me hai ya nahi
      )
      .slice(0, 5); // limit sirf 5 suggestions hi dikhane ke liye
    setSuggestions(filtered); // suggestions array me filterd products set hogi
  }, [searchTerm]);

  // Handle search
  const handleSearch = (term, id = null) => {
    const matchedProduct = id // product id se search karne ke liye
      ? allProducts.find((item) => item.id.toString() === id.toString()) // agar id diya hai to find karo aur match karo
      : allProducts.find(
          (item) => item.name.toLowerCase() === term.toLowerCase() // agar id nahi hai to name se search karo
        );

    // agar matched product milta hai to
    if (matchedProduct) {
      navigate(`/product/${matchedProduct.id}`); // product page per navigate karo by its id
      setSearchTerm(""); // search term ko khali karo
      setSuggestions([]); // suggestions array ko khali karo
      setIsMobileMenuOpen(false); // Close menu after search
    }
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false); // Close mobile menu when a NavLink is clicked
  };

  return (
    <div className="bg-secondary sticky top-0 z-50">
      <div className="py-3 px-4 md:px-6 ">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            {/* Left Text Section */}
            <div className="flex flex-col leading-tight ">
              <h1 className="text-2xl sm:text-4xl md:text-5xl text-accent font-extrabold">
                Adarsh📚
              </h1>
              <p className="text-sm sm:text-xl md:text-2xl text-white font-semibold -mt-1 sm:-mt-2">
                Stationery Mart
              </p>
            </div>
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="md:hidden flex items-center gap-x-4">
             {/* Search Icon for mobile */}
            <div
              className="flex cursor-pointer items-center gap-x-0.5 rounded-md py-2 px-2 transition duration-200 hover:bg-gray-200"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <FaSearch className="text-Text text-lg" />
            </div>

            {/* Cart Icon for mobile */}
            <div
              className="flex cursor-pointer items-center gap-x-0.5 rounded-md py-2 px-2 transition duration-200 hover:bg-gray-200"
              onClick={() => {
                const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                if (!currentUser) {
                  toast.info("Please login now");
                  navigate("/login");
                  setIsMobileMenuOpen(false); // also close menu
                  return;
                }
                navigate("/cart");
                handleNavLinkClick(); // Close menu when navigating
              }}
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-Text"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                  {cartTotalQuantity}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                )}
              </svg>
            </button>
          </div>

         
          <div className="hidden md:flex flex-1 items-center gap-x-4 ml-6">
            <select
              className="bg-accent text-white px-4 py-2 rounded-md text-sm outline-none hover:bg-[#603268] transition-all"
              onChange={(e) => navigate(`/category/${e.target.value}`)}
            >
              <option value="All Categories">☰ All Categories</option>
              <option value="bags & storage">Bags & Storage</option>
              <option value="notebooks & writing pads">
                Notebooks & Writing Pads
              </option>
              <option value="pens">Pens</option>
              <option value="pencils">Pencils</option>
              <option value="art & craft">Art and Craft</option>
              <option value="papers">Papers</option>
              <option value="colors">Colors</option>
              <option value="office supplies">Office Supplies</option>
              <option value="school essentials">School Essentials</option>
              <option value="gums collection">Gums Collection</option>
              <option value="registers">Registers</option>
              <option value="calculators">Calculators & Electronics</option>
            </select>

            {/* Search Bar */}
            <div className="relative w-full max-w-full">
              <input
                type="text"
                placeholder="Search Products..."
                className="w-full rounded-md border border-accent px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchTerm);
                  }
                }}
              />
              {/* Suggestions dropdown */}
              {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border w-full mt-1 rounded-md max-h-48 overflow-auto shadow-lg">
                  {suggestions.map((item) => (
                    <li
                      key={item.id}
                      className="px-4 py-2 cursor-pointer hover:bg-accent hover:text-white"
                      onClick={() => handleSearch(item.name)}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-accent text-lg" />
            </div>
          </div>

          {/* Desktop view: Orders, Cart, Profile */}
          <div className="hidden md:flex ml-2 items-center">
            {/* Orders */}
            <div
              className="flex cursor-pointer items-center gap-x-1 rounded-lg py-2 px-4 hover:bg-gray-200 transition duration-200"
              onClick={() => {
                const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                if (!currentUser) {
                  toast.info("Please login now");
                  navigate("/login");
                  return;
                }
                navigate("/orders");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-Text"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path
                  fillRule="evenodd"
                  d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium text-Text">Orders</span>
            </div>

            {/* cart btn */}
            <div
              className="flex cursor-pointer items-center gap-x-0.5 rounded-md py-2 px-4 transition duration-200 hover:bg-gray-200"
              onClick={() => {
                const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                if (!currentUser) {
                  toast.info("Please login now");
                  navigate("/login");
                  return;
                }
                navigate("/cart");
              }}
            >
              
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-Text"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                    {cartTotalQuantity}
                  </span>
                </div>
                <span className="text-sm font-semibold text-Text">Cart</span>
              
            </div>
            {/* profile btn or Login btn */}
            {localStorage.getItem("currentUser") ? (
              <div
                className="flex items-center gap-x-1 h-8 px-2 rounded-xl hover:bg-gray-200 hover:text-accent transition duration-200 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <span className="text-2xl text-Text">
                  <CgProfile />
                </span>
              </div>
            ) : (
                <button
                  className="bg-accent text-white px-4 py-1.5 rounded-md text-sm font-semibold hover:bg-[#603268] transition-all ml-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown (visible when isMobileMenuOpen is true) */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 right-4 z-50 w-64 bg-white rounded-lg shadow-2xl py-4 flex flex-col gap-2 md:hidden">
            
              
            {/* Search Bar removed from here as per new requirement */}

            {/* All Categories Dropdown for mobile */}
            <div className="px-4 mb-2">
              <select
                className="w-full bg-gray-100 text-text px-4 py-2 rounded-md text-sm outline-none border border-gray-200"
                onChange={(e) => {
                  navigate(`/category/${e.target.value}`);
                  handleNavLinkClick(); // Close menu after navigation
                }}
              >
                <option value="All Categories">Categories</option>
                <option value="bags & storage">Bags & Storage</option>
                <option value="notebooks & writing pads">
                  Notebooks & Pads
                </option>
                <option value="pens">Pens</option>
                <option value="pencils">Pencils</option>
                <option value="art & craft">Art and Craft</option>
                <option value="papers">Papers</option>
                <option value="colors">Colors</option>
                <option value="office supplies">Office Supplies</option>
                <option value="school essentials">School Essentials</option>
                <option value="gums collection">Gums</option>
                <option value="registers">Registers</option>
                <option value="calculators">Calculators</option>
              </select>
            </div>

          {/* Mobile Pages Navbar */}
          <div className="flex flex-col gap-y-2 px-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-2 px-2 text-lg cursor-pointer font-bold bg-gray-700"
                  : "cursor-pointer text-Text rounded-xl py-2 px-2 text-md font-semibold hover:bg-gray-200"
              }
              onClick={handleNavLinkClick}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-2 px-2 text-lg cursor-pointer font-bold bg-gray-700"
                  : "cursor-pointer text-Text rounded-xl py-2 px-2 text-md font-semibold hover:bg-gray-200"
              }
              onClick={handleNavLinkClick}
            >
              About
            </NavLink>
            <NavLink
              to="/category/bags & storage"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-2 px-2 text-lg cursor-pointer font-bold bg-gray-700"
                  : "cursor-pointer text-Text rounded-xl py-2 px-2 text-md font-semibold hover:bg-gray-200"
              }
              onClick={handleNavLinkClick}
            >
              Bags
            </NavLink>
            <NavLink
              to="/category/notebooks & writing pads"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-2 px-2 text-lg cursor-pointer font-bold bg-gray-700"
                  : "cursor-pointer text-Text rounded-xl py-2 px-2 text-md font-semibold hover:bg-gray-200"
              }
              onClick={handleNavLinkClick}
            >
              Books
            </NavLink>
            <NavLink
              to="/category/office supplies"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-2 px-2 text-lg cursor-pointer font-bold bg-gray-700"
                  : "cursor-pointer text-Text rounded-xl py-2 px-2 text-md font-semibold hover:bg-gray-200"
              }
              onClick={handleNavLinkClick}
            >
              Office Supplies
            </NavLink>
            <NavLink
              to="/category/school essentials"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-2 px-2 text-lg cursor-pointer font-bold bg-gray-700"
                  : "cursor-pointer text-Text rounded-xl py-2 px-2 text-md font-semibold hover:bg-gray-200"
              }
              onClick={handleNavLinkClick}
            >
              School Essentials
            </NavLink>
            <NavLink
              to="category/art & craft"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-2 px-2 text-lg cursor-pointer font-bold bg-gray-700"
                  : "cursor-pointer text-Text rounded-xl py-2 px-2 text-md font-semibold hover:bg-gray-200"
              }
              onClick={handleNavLinkClick}
            >
              Art and Craft
            </NavLink>
            <NavLink
              to="/category/papers"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-2 px-2 text-lg cursor-pointer font-bold bg-gray-700"
                  : "cursor-pointer text-Text rounded-xl py-2 px-2 text-md font-semibold hover:bg-gray-200"
              }
              onClick={handleNavLinkClick}
            >
              Papers
            </NavLink>
            {/* Orders for mobile */}
            <div
              className="flex cursor-pointer items-center gap-x-2 py-2 px-2 rounded-xl hover:bg-gray-200"
              onClick={() => {
                const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                if (!currentUser) {
                  toast.info("Please login now");
                  navigate("/login");
                  setIsMobileMenuOpen(false); // also close menu
                  return;
                }
                navigate("/orders");
                handleNavLinkClick(); // Close menu after navigation
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-Text"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path
                  fillRule="evenodd"
                  d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-md font-semibold text-Text">Orders</span>
            </div>
            {/* Profile or Login for mobile */}
            {localStorage.getItem("currentUser") ? (
              <div
                className="flex items-center gap-x-2 py-2 px-2 rounded-xl hover:bg-gray-200"
                onClick={() => {
                  navigate("/profile");
                  handleNavLinkClick(); // Close menu after navigation
                }}
              >
                <span className="text-2xl text-Text">
                  <CgProfile />
                </span>
                <span className="text-md font-semibold text-Text">Profile</span>
              </div>
            ) : (
              <div
                className="flex items-center gap-x-2 py-2 px-2 rounded-xl hover:bg-gray-200"
                onClick={() => {
                  navigate("/login");
                  handleNavLinkClick(); // Close menu after navigation
                }}
              >
                 <span className="text-2xl text-Text">
                  <CgProfile />
                </span>
                <span className="text-md font-semibold text-Text">Login</span>
              </div>
            )}
            {/* Location for mobile */}
            <div
              className="flex items-center gap-x-2 py-2 px-2 rounded-xl hover:bg-gray-200"
              onClick={() => {
                navigate("/location");
                handleNavLinkClick(); // Close menu after navigation
              }}
            >
              <FaLocationDot className="text-accent text-lg" />
              <span className="text-md font-semibold text-Text">Location</span>
            </div>
            {/* Contact for mobile */}
            <div
              className="flex items-center gap-x-2 py-2 px-2 rounded-xl hover:bg-gray-200"
              onClick={() => {
                navigate("/contact");
                handleNavLinkClick(); // Close menu after navigation
              }}
            >
              <FaPhoneAlt className="text-Text" />
              <span className="text-md font-semibold text-Text">
                Contact - 0123456789
              </span>
            </div>
          </div>
        </div>
      )}

        {/* Desktop view: Pages Navbar and Contact No */}
        <div className="hidden md:flex mt-4 items-center justify-between ">
          {/* Location */}
          <div className="flex gap-x-2 py-1 px-2">
            <FaLocationDot className="text-accent mt-2 text-lg " />
            <Link
              to="/location"
              className="cursor-pointer text-accent text-lg rounded-md py-1 px-2 font-medium hover:bg-gray-200"
            >
              Location
            </Link>
          </div>

          {/* Pages buttons */}
          <div className="flex gap-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-1 px-2 text-lg cursor-pointer hover:bg-gray-200 hover:text-accent font-bold"
                  : "cursor-pointer text-accent rounded-xl py-1 px-2 text-md font-semibold hover:bg-gray-200"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-1 px-2 text-lg cursor-pointer hover:bg-gray-200 hover:text-accent font-bold"
                  : "cursor-pointer text-accent rounded-xl py-1 px-2 text-md font-semibold hover:bg-gray-200"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/category/bags & storage"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-1 px-2 text-lg cursor-pointer hover:bg-gray-200 hover:text-accent font-bold"
                  : "cursor-pointer text-accent rounded-xl py-1 px-2 text-md font-semibold hover:bg-gray-200"
              }
            >
              Bags
            </NavLink>
            <NavLink
              to="/category/notebooks & writing pads"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-1 px-2 text-lg cursor-pointer hover:bg-gray-200 hover:text-accent font-bold"
                  : "cursor-pointer text-accent rounded-xl py-1 px-2 text-md font-semibold hover:bg-gray-200"
              }
            >
              Books
            </NavLink>
            <NavLink
              to="/category/office supplies"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-1 px-2 text-lg cursor-pointer hover:bg-gray-200 hover:text-accent font-bold"
                  : "cursor-pointer text-accent rounded-xl py-1 px-2 text-md font-semibold hover:bg-gray-200"
              }
            >
              Office Supplies
            </NavLink>
            <NavLink
              to="/category/school essentials"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-1 px-2 text-lg cursor-pointer hover:bg-gray-200 hover:text-accent font-bold"
                  : "cursor-pointer text-accent rounded-xl py-1 px-2 text-md font-semibold hover:bg-gray-200"
              }
            >
              School Essentials
            </NavLink>
            <NavLink
              to="category/art & craft"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-1 px-2 text-lg cursor-pointer hover:bg-gray-200 hover:text-accent font-bold"
                  : "cursor-pointer text-accent rounded-xl py-1 px-2 text-md font-semibold hover:bg-gray-200"
              }
            >
              Art and Craft
            </NavLink>
            <NavLink
              to="/category/papers"
              className={({ isActive }) =>
                isActive
                  ? "text-white underline rounded-xl py-1 px-2 text-lg cursor-pointer hover:bg-gray-200 hover:text-accent font-bold"
                  : "cursor-pointer text-accent rounded-xl py-1 px-2 text-md font-semibold hover:bg-gray-200"
              }
            >
              Papers
            </NavLink>
          </div>

          {/* Contact no */}
          <div
            className="flex hover:bg-gray-200 p-2 text-white rounded-md hover:text-Text items-center gap-2"
            onClick={() => navigate("/contact")}
          >
            <FaPhoneAlt className=" " />
            <span className=" cursor-pointer font-sans font-extrabold">
              Contact - 0123456789
            </span>
          </div>
        </div>
      </div>
      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white z-50 p-4 shadow-md border-t border-gray-200">
           <div className="relative w-full">
            <input
              type="text"
              placeholder="Search Products..."
              className="w-full rounded-md border border-accent px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchTerm);
                  setShowMobileSearch(false);
                }
              }}
              autoFocus
            />
            
            {suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full mt-1 rounded-md max-h-48 overflow-auto shadow-lg">
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    className="px-4 py-2 cursor-pointer hover:bg-accent hover:text-white"
                    onClick={() => {
                        handleSearch(item.name);
                        setShowMobileSearch(false);
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
             <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-accent text-lg" />
           </div>
        </div>
      )}
    </div>
  );
}
export default Header;