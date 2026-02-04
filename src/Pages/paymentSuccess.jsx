import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cartSlice";
import { clearCheckoutPage } from "../features/checkoutSlice";
import { toast } from "react-toastify";
import paySuccess from "../image/paySucs.jpg"; 

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart({ showToast: false }));
    dispatch(clearCheckoutPage());

    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 px-6 text-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full border border-gray-100">
        <img
          src={paySuccess}
          alt="Payment Successful"
          className="w-36 h-36 mx-auto mb-6 rounded-full shadow-lg object-cover"
        />
        <h2 className="text-4xl font-extrabold text-green-700 mb-3">
          Payment Successful!
        </h2>
        <p className="text-gray-700 text-base mb-6 leading-relaxed">
          Thank you for your order. Your payment has been processed
          successfully. <br />
        </p>

          {/* order btn */}
        <button
          onClick={() => navigate("/orders")}
          className="bg-accent hover:bg-secondary transition duration-300 text-white px-7 py-3 rounded-lg font-medium text-base w-full mb-3 shadow-md"
        >
          View your order
        </button>
        {/* home btn */}
        <button
          onClick={() => navigate("/")}
          className="bg-background hover:bg-gray-300 transition duration-300 text-accent px-7 py-3 rounded-lg font-medium text-base w-full shadow-md"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
