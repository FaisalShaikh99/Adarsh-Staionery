import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  increaseQty,
  decreaseQty,
  clearCart,
  cartTotal,
} from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartAmount = useSelector((state) => state.cart.cartTotalAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartTotal());
  }, [cartItems]);

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleIncreaseQty = (item) => {
    dispatch(increaseQty(item));
  };

  const handleDecreaseQty = (item) => {
    dispatch(decreaseQty(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-3xl font-bold text-accent mb-3">
          Your Cart is Empty
        </h2>
        <p className="text-secondary">
          Add some items to your cart and come back.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-accent hover:bg-secondary text-white px-6 py-3 rounded-full font-semibold transition"
        >
          ← Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container  mx-auto py-8">
      <h2 className="text-center text-4xl font-bold text-accent mb-8">
        🛒 Shopping Cart
      </h2>

      <div className="space-y-6 m-3">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-background p-4 rounded-lg shadow flex flex-col md:flex-row items-center gap-4 hover:shadow-md transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-contain rounded border"
              onClick={() => navigate(`/product/${item.id}`)}
            />
            <div className="flex-1 text-accent">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-secondary text-sm mb-2">₹{item.price}.00</p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecreaseQty(item)}
                  className="bg-secondary text-white px-3 py-1 rounded-full hover:bg-accent transition"
                >
                  −
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => handleIncreaseQty(item)}
                  className="bg-secondary text-white px-3 py-1 rounded-full hover:bg-accent transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right m-3 space-y-2">
              <button
                onClick={() => handleRemoveItem(item)}
                className="text-red-600 hover:text-red-800 text-2xl"
                title="Remove Item"
              >
                <RiDeleteBin6Line />
              </button>
              <div className="text-green-700 font-bold">
                ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                .00
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row m-3 justify-between items-center mt-10 gap-4">
        <button
          onClick={handleClearCart}
          className="bg-red-600 hover:bg-red-800 text-white font-bold px-6 py-3 rounded-full transition"
        >
          🧹 Clear Cart
        </button>

        <div className="text-xl font-bold text-green-700">
          Total: ₹{cartAmount.toFixed(2)}
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="bg-secondary hover:bg-accent text-white font-bold px-6 py-3  rounded-full transition"
        >
          Proceed to Checkout →
        </button>
      </div>
    </div>
  );
};

export default CartPage;
