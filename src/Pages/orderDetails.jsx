import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const OrderDetailsPage = () => {
  const [orderInfo, setOrderInfo] = useState(null);
  const navigate = useNavigate();
  const { orderId } = useParams(); // URL se orderId milti hai

  useEffect(() => {
    // Agar URL mein koi orderId hai
    if (orderId) {
      // Saare orders ko localStorage se fetch hote hai
      const storedOrders = JSON.parse(localStorage.getItem("allUserOrders") || "[]");
      
      // URL ke orderId se matching order dhoondhe ke liye 
      const foundOrder = storedOrders.find(order => order.orderId === orderId);

      // agar jo orderId aur order list mil gaye mean founOrder mil gaya to order ki sari details mil jati hai 
      if (foundOrder) {
        setOrderInfo(foundOrder); // aur ye order details orderinfo me store hogi
      } else {
        // Agar orderId URL mein hai lekin order list mein nahi mila, toh OrdersPage par bhej redirect hoga
        toast.error("Order not found."); 
        navigate("/orders");
      }
    } else {
      // Agar URL mein koi orderId nahi hai (yaani sidhe /order par navigate kiya gaya hai)
      // Toh hum lastPlacedOrder dikhaye ge (payment confirmation ke liye)
      const storedLastOrder = localStorage.getItem("lastPlacedOrder");
      if (storedLastOrder) {
        setOrderInfo(JSON.parse(storedLastOrder));
        localStorage.removeItem("lastPlacedOrder");  // lastPlaceOrder key me jo value thi vo abb 1 hi bar dikhegi
      } else {
        
        navigate("/orders");
      }
    }
  }, [navigate, orderId]); // Dependencies mein orderId aur navigate

  if (!orderInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-background">
        <p className="text-lg text-accent dark:text-accent">
          Loading order details or no order found...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto bg-background rounded-lg shadow-lg my-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
        {orderId ? "Order Details" : "Order Placed Successfully!"}
      </h2>

      {/* Order Summary*/}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-accent">
          Order Summary
        </h3>
        <div className="border rounded-md p-4 dark:text-white dark:bg-secondary">
          <p className="mb-2">
            <strong>Order ID:</strong> {orderInfo.orderId}
          </p>
          <p className="mb-2">
            <strong>Order Date:</strong>{" "}
            {new Date(orderInfo.orderDate).toLocaleString()}
          </p>
          <p className="mb-2">
            <strong>Total Amount:</strong> ₹{orderInfo.totalAmount.toFixed(2)}
          </p>
          <p className="mb-2">
            <strong>Order Status:</strong> {orderInfo.status || "Confirmed"}
          </p>
        </div>
      </div>

      {/* Items Ordered */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-accent">
          Items Ordered
        </h3>
        <ul className="border rounded-md p-4 text-white bg-secondary">
          {orderInfo.items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-12 w-12 object-contain cursor-pointer hover:scale-105 transition"
              />
              <span>
                {item.name}   
              </span>
               <span> <strong>Quantity : ({item.quantity})</strong></span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* User details */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-accent">
          Customer Details
        </h3>
        <div className="border rounded-md p-4 text-white bg-secondary">
          <p className="mb-2">
            <strong>Full Name:</strong> {orderInfo.user.fullName}  {/* user key hai */}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {orderInfo.user.email}
          </p>
          <p className="mb-2">
            <strong>Mobile No:</strong> {orderInfo.user.mobileNo}
          </p>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-accent">
          Delivery Address
        </h3>
        <div className="border rounded-md p-4 text-white bg-secondary">
          <p className="mb-2">{orderInfo.address.address}</p>
          <p>{orderInfo.address.cityPin}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-accent">
          Payment Method
        </h3>
        <div className="border rounded-md p-4 text-white bg-secondary">
          <p>{orderInfo.payment}</p>
        </div>
      </div>

      {/* btn section */}
      <div className="flex justify-center gap-4 mt-8">
        {/* go to orders page btn */}
        <button
          onClick={() => navigate("/orders")}
          className="bg-accent text-white py-3 px-6 rounded-lg hover:bg-secondary transition duration-300 font-semibold"
        >
          Go to My Orders
        </button>

        {/* go to home btn */}
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 text-accent py-3 px-6 rounded-lg hover:bg-gray-400 transition duration-300 font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsPage;