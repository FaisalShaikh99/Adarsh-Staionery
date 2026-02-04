import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-accent text-gray-200 pt-10 pb-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
        {/* Brand Info */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Adarsh{" "}
            <span className="inline-block transform -translate-y-1">📚</span>
          </h1>
          <p className="text-xl sm:text-2xl font-semibold opacity-90 mt-[-0.5rem]">
            Stationery Mart
          </p>

          <p className="text-sm mt-2 text-gray-200">
            Your one-stop destination for school, office, and premium stationery
            items.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="text-gray-200 hover:text-white hover:font-semibold capitalize"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-200 hover:text-white hover:font-semibold capitalize"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-200 hover:text-white hover:font-semibold capitalize"
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                href="#products"
                className="text-gray-200 hover:text-white hover:font-semibold capitalize"
              >
                Products
              </a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/category/bags & storage"
                className="text-gray-200 hover:text-white hover:font-semibold capitalize"
              >
                bags & storage
              </Link>
            </li>
            <li>
              <Link
                to="/category/notebooks & writing pads"
                className="text-gray-200 hover:text-white hover:font-semibold capitalize"
              >
                notebooks
              </Link>
            </li>
            <li>
              <Link
                to="/category/school essentials"
                className="text-gray-200 hover:text-white hover:font-semibold capitalize"
              >
                school essentials
              </Link>
            </li>
            <li>
              <Link
                to="/category/office supplies"
                className="text-gray-200 hover:text-white hover:font-semibold capitalize"
              >
                office supplies
              </Link>
            </li>
            <li>
              <Link
                to="/category/art & craft"
                className="text-gray-200 hover:text-white hover:font-semibold capitalize"
              >
                art & craft
              </Link>
            </li>
            <li>
              <Link
                to="/category/colors"
                className="text-gray-200 hover:text-white hover:font-semibold capitalize"
              >
                colors
              </Link>
            </li>
            <li>
              <Link
                to="/category/papers"
                className="text-gray-200 hover:text-white hover:font-semibold capitalize"
              >
                Papers
              </Link>
            </li>
          </ul>
        </div>

        {/* Social & Subscribe */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Stay Connected
          </h3>
          <div className="flex space-x-4 mb-4">
            <Link
              to="#"
              className="text-gray-200 text-sm hover:text-white hover:font-semibold hover:border border-white rounded-full p-2 transition duration-1000"
            >
              <FaFacebookF />
            </Link>
            <Link
              to="#"
              className="text-gray-200 hover:text-white hover:font-semibold hover:border border-white rounded-full p-2 transition duration-1000"
            >
              <FaInstagram />
            </Link>
            <Link
              to="#"
              className="text-gray-200 hover:text-white hover:font-semibold hover:border border-white rounded-full p-2 transition duration-1000"
            >
              <FaTwitter />
            </Link>
            <Link
              to="#"
              className="text-gray-200 hover:text-white hover:font-semibold hover:border border-white rounded-full p-2 transition duration-1000"
            >
              <FaYoutube />
            </Link>
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 rounded-md bg-gray-800 text-sm placeholder-gray-400 mb-2"
          />
          <button className="w-full bg-white text-black py-2 rounded-md text-sm font-semibold hover:bg-gray-200 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-400 mt-8">
        © {new Date().getFullYear()} Stationery Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
