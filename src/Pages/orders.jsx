// OrdersPage.jsx (Corrected part)
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = localStorage.getItem("allUserOrders");  // get data of all orders of user from local storage 
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));   // and store data in the orders  
    }
  }, []);

  // Is function ko use karein
  const viewOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`);    // navigation to Order Details page wiht its Id
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-accent">
        <p className="text-lg text-white mb-4">
          You haven't placed any orders yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-white text-accent py-2 px-4 rounded-lg hover:bg-secondary transition duration-300 font-semibold"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto bg-background rounded-lg shadow-lg my-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-accent">
        Your Orders
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="border rounded-md p-4 text-white dark:bg-accent shadow-sm cursor-pointer hover:shadow-md transition duration-200"
        
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg font-semibold text-primary">Order ID: {order.orderId}</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}>
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-300 ">
              Order Date: {new Date(order.orderDate).toLocaleString()}
            </p>
            <p className="text-lg font-bold text-white mt-2">
              Total: ₹{order.totalAmount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Items: {order.items.length}
            </p>
            <div>
              <button
                className="bg-white text-accent mt-3 font-bold items-end p-2 rounded-full"
                onClick={() => viewOrderDetails(order.orderId)} 
              >
                View Order Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 text-accent hover:text-white py-3 px-6 rounded-lg hover:bg-accent transition duration-300 font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrdersPage;