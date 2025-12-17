import React, { useContext, useEffect, useState } from "react";
import "./CartItem.css";
import { shopcontext } from "../../store/context";

const CartItem = () => {
  const { cartItems, removeFromCart, getTotalCartAmount } =
    useContext(shopcontext);

  const [totalAmount, setTotalAmount] = useState(0);

  // fetch total amount once cart changes
  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const amount = await getTotalCartAmount(); // waits for axios
        setTotalAmount(amount);
      } catch (err) {
        console.error("Error fetching total:", err);
      }
    };

    fetchTotal();
  }, [cartItems, getTotalCartAmount]);

  return (
    <div className="CartItem">
      <h2 className="heading">Your Cart</h2>
      <hr />
      <div className="cartitem-format-main">
        <div>Photo</div>
        <div>Name</div>
        <div>Price</div>
        <div>Qty</div>
        <div>Total</div>
        <div>Remove</div>
      </div>

      {cartItems.map((e) => (
        <div
          key={e.productId._id} // ✅ always add key when mapping
          className="cartitem-format-main cartitem-format"
        >
          <div>
            <img
              src={e.productId.image}
              className="carticon-product-icon"
              alt={e.productId.name}
            />
          </div>
          <div>{e.productId.name}</div>
          <div>${e.productId.price}</div>
          <div>{e.quantity}</div>
          <div>${e.productId.price * e.quantity}</div>
          <div
            className="cross"
            onClick={() => removeFromCart(e.productId._id)}
          >
            X
          </div>
        </div>
      ))}

      <div className="cartitem-dowm">
        <div className="cartitem-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitem-total-item">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <hr />
            <div className="cartitem-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <div className="cartitem-total-item">
              <h3>Total</h3>
              <h3>${totalAmount}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
