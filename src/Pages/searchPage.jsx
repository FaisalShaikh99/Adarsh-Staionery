import React from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import allCategories from "../APIs/homeApi/allCategories.json";
import featuredProduct from "../APIs/homeApi/featuredProduct.json";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query")?.toLowerCase() || "";

  // Use imported data
  const productsData = allCategories;

  // Category match check
  const matchedCategoryKey = Object.keys(productsData).find((category) =>
    category.toLowerCase().includes(query)
  );

  if (matchedCategoryKey) {
    // Extract products from category
    // productsData[key] is an object of subcategories, so values are arrays of products
    const categoryProducts = Object.values(productsData[matchedCategoryKey]).flat();

    return (
      <div className="p-4 bg-white min-h-screen">
        <h2 className="text-2xl font-bold capitalize mb-4 text-accent">Category: {matchedCategoryKey}</h2>
        <ProductGrid products={categoryProducts} />
      </div>
    );
  }

  // Product level search
  const allProducts = [];
  // Flatten allCategories
  Object.values(productsData).forEach(categoryGroup => {
    Object.values(categoryGroup).forEach(productArray => {
      allProducts.push(...productArray);
    });
  });
  // Add featured products
  allProducts.push(...featuredProduct);

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div className="p-4 bg-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-accent">
        Search results for "{query}"
      </h2>
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No products found matching "{query}".</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
