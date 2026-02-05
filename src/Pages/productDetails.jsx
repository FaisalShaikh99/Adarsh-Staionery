import React from "react";
import productsData from "../APIs/homeApi/allCategories.json";
import featuredProduct from "../APIs/homeApi/featuredProduct.json";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { toast } from "react-toastify";
import { addToCart, increaseQty, decreaseQty } from "../features/cartSlice";
import { useState, useEffect } from "react"; // Import useState and useEffect

function ProductDetails() {
  const { id } = useParams(); // get product id from url
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); // Get the cart state
  const [currentQuantity, setCurrentQuantity] = useState(1); // Initialize quantity
  const navigate = useNavigate()

  // Flatten products
  const allProducts = [];
  Object.values(productsData).forEach((categoryGroup) => {
    Object.values(categoryGroup).forEach((productArray) => {
      allProducts.push(...productArray);
    });
  });
  allProducts.push(...featuredProduct);

  const product = allProducts.find((item) => item.id === id);
  if (!product) {
    return <p className="text-center mt-10 text-text">Product not found</p>;
  }

  useEffect(() => {
    const existingCartItem = cart.cartItems.find((item) => item.id === id);
    if (existingCartItem) {
      setCurrentQuantity(existingCartItem.quantity);
    } else {
      setCurrentQuantity(1);
    }
  }, [id, cart.cartItems]);

  const handleAddToCart = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      toast.info("Please login now");
      navigate("/login");
      return;
    }
    dispatch(addToCart({ ...product, cartQuantity: currentQuantity }));
    setCurrentQuantity((prevQty) => prevQty + 1);
  };

  const handleIncreaseQty = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      toast.info("Please login now");
      navigate("/login");
      return;
    }
    setCurrentQuantity((prevQty) => prevQty + 1);
    dispatch(increaseQty(product));
  };

  const handleDecreaseQty = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      toast.info("Please login now");
      navigate("/login");
      return;
    }
    if (currentQuantity > 1) {
      setCurrentQuantity((prevQty) => prevQty - 1);
      dispatch(decreaseQty(product));
    }
  };

   const handleBuyBtn = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      toast.info("Please login now");
      navigate("/login");
      return;
    }
    dispatch(addToCart({...product, cartQuantity : currentQuantity}));
    navigate("/checkout");
  }  
  
  return (
    <div className="bg-background min-h-screen py-8 px-2 sm:px-4">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-xl p-4 sm:p-6 md:flex md:items-start gap-8">
        {/* Left Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[300px] md:h-[400px] object-contain bg-background p-4 rounded-lg"
          />
          {product.discount && (
            <span className="inline-block mt-4 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
              {product.discount}
            </span>
          )}
        </div>

        {/* Right Info */}
        <div className="md:w-1/2 w-full space-y-4 mt-6 md:mt-0">
          <h1 className="text-2xl font-bold text-accent">{product.name}</h1>
          <p className="text-text text-sm">{product.description}</p>

          <div className="flex items-center gap-4">
            <span className="text-xl text-accent font-semibold">
              ₹{product.price}.00{" "}
            </span>
            {product.mrp && (
              <span className="text-gray-400 line-through">
                ₹{product.mrp}.00
              </span>
            )}
          </div>

          <p className="text-yellow-500 text-sm">Rating: {product.rating} ⭐</p>

          {/* Improved Quantity Controls */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleDecreaseQty}
              disabled={currentQuantity <= 1}
              className={`bg-gray-200 text-accent font-semibold text-xl rounded-md w-8 h-8 flex items-center justify-center ${
                currentQuantity <= 1
                  ? "cursor-not-allowed text-gray-400"
                  : "hover:bg-gray-300 transition"
              }`}
            >
              -
            </button>
            <span className="text-lg font-semibold">{currentQuantity}</span>
            <button
              onClick={handleIncreaseQty}
              disabled={currentQuantity >= 10}
              className="bg-gray-200 text-accent font-semibold text-xl rounded-md w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition"
            >
              +
            </button>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
            >
              Add to Cart
            </button>
            <button className="border border-accent text-accent px-4 py-2 rounded-lg hover:bg-accent hover:text-white transition"
                    onClick={handleBuyBtn}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
