import React from "react";
import Header from "../pages/Header-Footer/Header";
import Footer from "../pages/Header-Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
