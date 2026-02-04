import React from "react";
import { useNavigate } from "react-router-dom";

const ProductGrid = ({ products }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group bg-gray-100 rounded-lg p-3">
          <img
            alt={product.name}
            src={product.image}
            className="h-60 w-full object-cover rounded-lg group-hover:opacity-80"
          />
          <h3 className="mt-4 text-md font-semibold text-black">
            {product.name}
          </h3>
          <p className="mt-1 text-lg font-bold text-black">
            ₹{product.price}
          </p>
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="mt-2 w-full border-2 border-accent bg-transparent hover:bg-accent text-accent hover:text-white px-4 py-2 rounded-lg transition"
          >
            {product.btn || "Add to Cart"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
