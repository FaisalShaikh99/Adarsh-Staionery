import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ScrollToTop from "../../features/scrollToTop";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop /> {/* Feature of Scroll from top when redireact another page */}
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
