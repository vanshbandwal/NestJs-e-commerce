import React from "react";
import NavHeader from "./layout/cartHeader";
import CartItem from "./CartItem/CartItem";
import Footer from "./layout/footer";

const Cartdisplay = () => {
  return (
    <div>
      <NavHeader />
      <CartItem />
      <Footer />
    </div>
  );
};

export default Cartdisplay;
