import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toast ke styles ko import karna zaroori hai!
import Privateroute from "./components/privateRoute";
import About from "./Pages/About";
import CategoryPage from "./Pages/categoryPage";
import Contact from "./Pages/Contact";
import AppLayout from "./components/appLayout/AppLayout";
import { Provider } from "react-redux";
import store from './features/store'
import ProductDetails from "./Pages/productDetails";
import Cart from './Pages/Cart'
import Checkout from './Pages/checkout'
import PaymentPage from "./Pages/paymentPage";
import OrderDetails from "./Pages/orderDetails";
import Orders from './Pages/orders'
import PaymentSuccess from "./Pages/paymentSuccess";
import Profile from "./Pages/MyProfile"
import Location from "./Pages/locations";
import SearchPage from "./Pages/searchPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/category/:categoryName",
          element: <CategoryPage />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/cart",
          element: (
            <Privateroute>
              <Cart />
            </Privateroute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <Privateroute>
              <Checkout />
            </Privateroute>
          ),
        },
        {
          path: "/paymentPage",
          element: (
            <Privateroute>
              <PaymentPage />
            </Privateroute>
          ),
        },
        {
          path: "/paymentSuccess",
          element: (
            <Privateroute>
              <PaymentSuccess />
            </Privateroute>
          ),
        },
        {
          path: "/orders",
          element: (
            <Privateroute>
              <Orders />
            </Privateroute>
          ),
        },
        {
          path: "/order/:orderId",
          element: (
            <Privateroute>
              <OrderDetails />
            </Privateroute>
          ),
        },
        {
          path: "/profile",
          element: (
            <Privateroute>
              <Profile />
            </Privateroute>
          ),
        },
        {
          path: "/location",
          element: <Location />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <Provider store={store}>
      <>
      <RouterProvider router={router} />

     
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
    </Provider>
    
  );
}

export default App;
