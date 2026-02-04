import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartTotal } from "../features/cartSlice"; // clearCart will now be on the payment page
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setUserDetails, setDeliveryAddress } from "../features/checkoutSlice"; // setPaymentMethod is now only for default/selection

function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartAmount = useSelector((state) => state.cart.cartTotalAmount);

  const { userDetails, deliveryAddress } = useSelector(
    (state) => state.checkout
  );

  const { fullName, email, mobileNo } = userDetails;
  const { address, cityPin } = deliveryAddress;

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    dispatch(cartTotal());
  }, [cartItems, dispatch]);

  const handleProceedToPayment = (e) => {
    e.preventDefault();

    // Checkout page par sirf user details aur delivery address ki validation
    if (!fullName || !email || !mobileNo || !address || !cityPin) {
      toast.error("Please fill in all your details and delivery address.");
      return;
    }


    const orderSummary = {
      items: cartItems,
      totalAmount: cartAmount,
      user: userDetails,
      address: deliveryAddress,
      orderDate: new Date().toISOString(),
      orderId: `ORD-${Date.now()}`,
      status: "Payment Pending" // New status
    };

    localStorage.setItem('currentOrderPendingPayment', JSON.stringify(orderSummary));
    console.log('Order Summary saved to Local Storage (Payment Pending):', orderSummary);

    setIsProcessing(true);
    toast.info("Proceeding to payment options...");
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/paymentPage");
    }, 500); 
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-4xl md:text-5xl font-bold text-accent py-6">
        Checkout
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Order Summary */}
        <div className="md:w-1/3 bg-background shadow p-5 rounded-xl border border-muted">
          <h2 className="text-accent text-xl font-bold text-center mb-4">
            Order Summary
          </h2>
          <div className="grid grid-cols-5 text-xs md:text-sm font-semibold border-b pb-2 mb-2">
            <span className="col-span-1 text-center">Image</span>
            <span className="col-span-2">Name</span>
            <span className="text-center">Price</span>
            <span className="text-center">Total</span>
          </div>
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-5 items-center py-3 text-xs md:text-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 mx-auto object-contain cursor-pointer hover:scale-105 transition"
                  onClick={() => navigate(`/product/${item.id}`)}
                />
                <span className="col-span-2">
                  {item.name}
                  <br />
                  <span className="text-xs text-muted">
                    Qty: {item.quantity}
                  </span>
                </span>
                <span className="text-center">₹{item.price}</span>
                <span className="text-center">
                  ₹{item.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t mt-4 pt-4 flex justify-between text-base font-semibold">
            <span>Subtotal:</span>
            <span>₹{cartAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form className="md:w-2/3 space-y-6" onSubmit={handleProceedToPayment}>
          {/* User Details */}
          <div className="bg-background shadow p-5 rounded-xl border border-muted space-y-4">
            <h2 className="text-lg font-semibold text-accent">Your Details</h2>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded focus:outline-accent"
              value={fullName}
              onChange={(e) =>
                dispatch(setUserDetails({ fullName: e.target.value }))
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded focus:outline-accent"
              value={email}
              onChange={(e) =>
                dispatch(setUserDetails({ email: e.target.value }))
              }
              required
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full p-3 border rounded focus:outline-accent"
              // max={10} // HTML attribute should be maxLength
              maxLength={10}
              value={mobileNo}
              onChange={(e) =>
                dispatch(setUserDetails({ mobileNo: e.target.value }))
              }
              required
            />
          </div>

          {/* Address */}
          <div className="bg-background shadow p-5 rounded-xl border border-muted space-y-4">
            <h2 className="text-lg font-semibold text-accent">
              Delivery Address
            </h2>
            <input
              type="text"
              placeholder="Address Line 1"
              className="w-full p-3 border rounded focus:outline-accent"
              value={address}
              onChange={(e) =>
                dispatch(setDeliveryAddress({ address: e.target.value }))
              }
              required
            />
            <input
              type="text"
              placeholder="City, State, Pincode"
              className="w-full p-3 border rounded focus:outline-accent"
              value={cityPin}
              onChange={(e) =>
                dispatch(setDeliveryAddress({ cityPin: e.target.value }))
              }
              required
            />
          </div>

          {/* Proceed to Payment Button */}
          <button
            type="submit"
            className="w-full bg-secondary hover:bg-accent text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-60"
            disabled={isProcessing}
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
                Redirecting...
              </>
            ) : (
              <>Proceed to Payment</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;