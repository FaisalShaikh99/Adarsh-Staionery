// PaymentPage.jsx (Corrected Code)
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../features/cartSlice";
import { clearCheckoutPage, setPaymentMethod } from "../features/checkoutSlice";
import QR from "../image/QR.jpeg";

function PaymentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderToPay, setOrderToPay] = useState(null);

  const selectedPaymentMethod = useSelector(
    (state) => state.checkout.paymentMethod
  );

  useEffect(() => {
    const storedOrder = localStorage.getItem("currentOrderPendingPayment"); // yaha ham order summary ka data fetch kar rahe vo bhi currentOrderPendingPayment key ke vajese
    if (storedOrder) {
      setOrderToPay(JSON.parse(storedOrder)); // jab data mil jata hai to ham use orderToPay array state me store karte hai
    } else {
      toast.error("No pending order found. Please start checkout again.");
      navigate("/cart");
    }
  }, [navigate]);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const paymentSuccessful = true; 

      // agar payment succesfull hua to
      if (paymentSuccessful) {
        toast.success(`Payment Successful via ${selectedPaymentMethod}!`);

        const updatedOrder = {
          ...orderToPay,
          payment: selectedPaymentMethod,
          status: "Paid",
          orderDate: new Date().toISOString(),
        }; // Add orderDate here

        // Existing orders ko localStorage se fetch karne ke liye
        const existingOrders = JSON.parse(
          localStorage.getItem("allUserOrders") || "[]"
        );
        // Naye order ko array ke shuruat mein add karne ke liye unshift method use ki hai (taki latest order top par dikhe)
        existingOrders.unshift(updatedOrder);
        // Updated array ko localStorage mein save karein
        localStorage.setItem("allUserOrders", JSON.stringify(existingOrders));

        // lastPlacedOrder ko bhi update karein (OrderDetailsPage ke liye)
        localStorage.setItem("lastPlacedOrder", JSON.stringify(updatedOrder));

        // currentOrderPendingPayment ko remove karein
        localStorage.removeItem("currentOrderPendingPayment");

        // Redux state ko clear karein
        dispatch(clearCart({ showToast: false }));
        dispatch(clearCheckoutPage());
        dispatch(setPaymentMethod(""));
        setIsProcessing(false);

        // User ko OrderDetailsPage par redirect karein (jahan lastPlacedOrder dikhega)
        navigate("/paymentSuccess"); // Pehle "/paymentSuccess" tha, ab "/order" karein
      } else {
        toast.error("Payment Failed. Please try again.");
        setIsProcessing(false);
      }
    }, 2000);
  };

  if (!orderToPay) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-accent">
          Loading order details or no order found...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-4xl md:text-5xl font-bold text-accent py-6">
        Payment Now
      </h1>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {/* Order Summary Preview on Payment Page */}
        <div className="md:w-1/3 bg-background shadow p-5 rounded-xl border border-muted">
          <h2 className="text-accent text-xl font-bold text-center mb-4">
            Order Summary
          </h2>
          <p className="text-sm">
            Order ID:{" "}
            <span className="font-semibold">{orderToPay.orderId}</span>
          </p>
          <p className="text-sm">
            Total Amount:{" "}
            <span className="font-semibold">
              ₹{orderToPay.totalAmount.toFixed(2)}
            </span>
          </p>
          <p className="text-sm mb-4">Items: {orderToPay.items.length}</p>

          <h3 className="text-lg font-semibold text-accent mb-2">
            Delivery Address:
          </h3>
          <p className="text-sm">{orderToPay.address.address}</p>
          <p className="text-sm">{orderToPay.address.cityPin}</p>
          <div className="mt-6 flex items-center justify-center gap-8">
            <img
              className="h-8 w-auto "
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg"
              alt=""
            />
            <img
              className="hidden h-8 w-auto "
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
              alt=""
            />
            <img
              className="h-8 w-auto "
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
              alt=""
            />
            <img
              className="hidden h-8 w-auto "
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
              alt=""
            />
            <img
              className="h-8 w-auto "
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
              alt=""
            />
            <img
              className="hidden h-8 w-auto "
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
              alt=""
            />
          </div>
          <p class="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
            Payment processed by{" "}
            <a
              href="#"
              title=""
              class="font-medium text-blue-700 underline hover:no-underline dark:text-blue-500"
            >
              Paddle
            </a>{" "}
            for{" "}
            <a
              href="#"
              title=""
              class="font-medium text-blue-700 underline hover:no-underline dark:text-primary-500"
            >
              Flowbite LLC
            </a>
            - United States Of America
          </p>
        </div>

        {/* Payment Method Form */}
        <form className="md:w-1/2 space-y-6" onSubmit={handlePaymentSubmit}>
          <div className="bg-background shadow p-5 rounded-xl border border-muted space-y-3">
            <h2 className="text-lg font-semibold text-accent mb-2">
              Select Payment Method
            </h2>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={selectedPaymentMethod === "Cash on Delivery"}
                onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
              />
              Cash on Delivery (COD)
            </label>

            {/* UPI */}
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="UPI"
                checked={selectedPaymentMethod === "UPI"}
                onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
              />
              UPI
            </label>

            {selectedPaymentMethod === "UPI" && (
              <div className="mt-2 space-y-2 p-3 border rounded-lg bg-gray-50 dark:bg-accent">
                <p className="text-sm text-white font-semibold">
                  Scan QR or Enter UPI ID
                </p>
                <input
                  type="text"
                  placeholder="Enter your UPI ID (e.g., name@bankname)"
                  name="upiId"
                  className="w-full p-2 border rounded focus:outline-accent"
                  required={selectedPaymentMethod === "UPI"}
                />
                <div className="flex justify-center">
                  <img
                    src={QR}
                    alt="UPI QR Code"
                    className="w-40 mt-2 object-contain"
                  />
                </div>
                <p className="text-white text-center text-muted-foreground">
                  Open your UPI app and approve payment.
                </p>
              </div>
            )}

            {/* Card / Net Banking */}
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={selectedPaymentMethod === "card"}
                onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
              />
              Credit/Debit Card
            </label>

            {selectedPaymentMethod === "card" && (
              <div className="mt-2 space-y-2 p-3 border rounded-lg bg-gray-50 dark:bg-accent">
                <input
                  type="text"
                  placeholder="Card Number"
                  name="cardNumber"
                  className="w-full p-2 border rounded focus:outline-accent"
                  maxLength="16"
                  required={selectedPaymentMethod === "card"}
                />
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  name="cardHolderName"
                  className="w-full p-2 border rounded focus:outline-accent"
                  required={selectedPaymentMethod === "card"}
                />
                <div className="flex gap-2">
                  <input
                    type="month"
                    placeholder="DD/MM/YY"
                    name="cardExpiry"
                    className="w-1/2 p-2 border rounded focus:outline-accent"
                    required={selectedPaymentMethod === "card"}
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    name="cardCvv"
                    maxLength="4"
                    className="w-1/2 p-2 border rounded focus:outline-accent"
                    required={selectedPaymentMethod === "card"}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            className="w-full bg-accent hover:bg-secondary text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-60"
            disabled={
              isProcessing || !selectedPaymentMethod || orderToPay === null
            }
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Processing Payment...
              </>
            ) : (
              <>Pay ₹{orderToPay?.totalAmount?.toFixed(2) || "0.00"}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
