import React, { useEffect, useState } from "react";
import allCategories from "../APIs/homeApi/allCategories.json";
import { useParams } from "react-router-dom";
import { GrRadialSelected } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setTotalItems, setCurrentPage } from "../features/paginationSlice";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams(); // get cat name from url
  const [selectedSub, setSelectedSub] = useState("All"); // state for sub cate
  const dispatch = useDispatch();
  const { currentPage, pageSize } = useSelector((state) => state.pagination); // for pagination
  const navigate = useNavigate();
  const categoryData = allCategories[categoryName] || {}; // allCategories is product data
  const subCategories = ["All", ...Object.keys(categoryData)]; // all is default value of sub cat

  const products =
    selectedSub === "All" // Agar user ne "All" sub-category select ki hai
      ? Object.values(categoryData).flat() // categoryData ke andar jitne bhi sub-category arrays hain unko nikalta hai
      : // yaha flat() ka matlab hai ki fir Un sab arrays ko ek hi array bana deta hai
        categoryData[selectedSub] || []; // nahi to selected sub category ka data

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const currentProducts = products.slice(start, end);

  useEffect(() => {
    dispatch(setTotalItems(products.length));
    dispatch(setCurrentPage(1)); // Reset to the first page when the category or sub-category changes
  }, [dispatch, products.length]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const totalPages = Math.ceil(products.length / pageSize);

  return (
    <div className="bg-background min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="bg-white shadow-md rounded-lg p-6 w-full lg:w-64">
          <h3 className="font-semibold text-xl mb-4 text-text border-b-2 border-secondary pb-2">
            Filter by Type
          </h3>
          <div className="space-y-3">
            {subCategories.map((sub_cat, i) => (
              <button
                key={i}
                onClick={() => setSelectedSub(sub_cat)}
                className={`flex items-center gap-3 w-full rounded-md px-4 py-2 text-left transition-colors duration-200 ${
                  selectedSub === sub_cat
                    ? "bg-accent text-white font-semibold"
                    : "text-text hover:bg-secondary/10"
                }`}
              >
                <GrRadialSelected
                  className={`text-lg ${
                    selectedSub === sub_cat ? "opacity-100" : "opacity-50"
                  }`}
                />
                <span className="text-sm">{sub_cat}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Product List */}
        <main className="flex-1">
          <h2 className="text-3xl font-bold mb-8 text-accent capitalize">
            {categoryName} -{" "}
            <span className="text-secondary">{selectedSub}</span>
          </h2>

          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* <NavLink to={`/product/${product.id}`}> */}
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-60 object-contain p-4"
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold rounded-full px-2 py-1">
                        {product.discount}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-text mb-2 truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-accent font-bold text-xl">
                        ₹{product.price}.00
                      </span>
                      {product.mrp && (
                        <span className="text-gray-500 line-through ml-2 text-sm">
                          ₹{product.mrp}.00
                        </span>
                      )}
                    </div>
                    {product.rating !== undefined && (
                      <p className="text-yellow-500 text-sm mt-1">
                        Rating: {product.rating}
                      </p>
                    )}

                    <p className="text-gray-600 text-sm mt-2 truncate">
                      {product.description?.substring(0, 60)}...
                    </p>
                    {product.btn && (
                      <button
                        className="mt-3 bg-accent text-white font-semibold py-2 px-4 rounded-md hover:bg-secondary transition-colors duration-200 w-full text-center"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        {product.btn}
                      </button>
                    )}
                  </div>
                  {/* </NavLink> */}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-md shadow p-6 text-center">
              <p className="text-gray-500 font-semibold">
                No products found in this category and type.
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`py-2 px-4 rounded-l-md font-semibold transition-colors duration-200 ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-secondary/20 text-text"
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`py-2 px-4 font-semibold transition-colors duration-200 ${
                      currentPage === page
                        ? "bg-accent text-white"
                        : "bg-white hover:bg-secondary/20 text-text"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`py-2 px-4 rounded-r-md font-semibold transition-colors duration-200 ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-secondary/20 text-text"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
