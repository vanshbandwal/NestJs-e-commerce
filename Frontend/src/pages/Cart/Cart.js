import React from "react";
import "./Cart.css"; // Make sure this path matches your folder structure


import Cartdisplay from "../../components/cartdisplay";
import NullMessage from "../../components/NullMessage";

const Cart = () => {
  const token = localStorage.getItem("auth-token");
  return <>
  {token ? <Cartdisplay /> : <NullMessage/>}
  </>;
};

export default Cart;
