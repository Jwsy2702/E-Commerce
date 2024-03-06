import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { loadStripe } from "@stripe/stripe-js";

const CartItems = () => {
  //useContext is used to access the functions from ShopContext
  const {
    getTotalCartAmount,
    products,
    cartItems,
    removeFromCart,
    decreaseItemQuantity,
    increaseItemQuantity,
  } = useContext(ShopContext);

  const proceedToPayments = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);
    const body = {
      products: products,
      cartItems: cartItems,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:4000/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log("Error after checkout: ", result.error.message);
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e, i) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={i}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <div className="cartitems-input-quantity">
                  <button
                    className="decrease-button"
                    onClick={() => {
                      decreaseItemQuantity(e.id);
                    }}
                  >
                    -
                  </button>
                  <button className="cartitems-quantity">
                    {cartItems[e.id]}
                  </button>
                  <button
                    className="increase-button"
                    onClick={() => {
                      increaseItemQuantity(e.id);
                    }}
                  >
                    +
                  </button>
                </div>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={proceedToPayments}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
