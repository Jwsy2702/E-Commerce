import React, { useContext, useState } from "react";
import "./Navbar.css";

import logo from "../Assets/logo.png";
import chess_logo from "../Assets/chess-logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={chess_logo} alt="" style={{ maxWidth: "60%" }} />
        <p>Jon Chess</p>
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("chess-courses");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/chess-courses">
            Courses
          </Link>
          {menu === "chess-courses" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("chess-equipment");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/chess-equipment">
            Chess Equipment
          </Link>
          {menu === "chess-equipment" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("coaching");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/coaching">
            Coaching
          </Link>
          {menu === "coaching" ? <hr /> : <></>}
        </li>

        <li
          onClick={() => {
            setMenu("chess-software");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/chess-software">
            Chess Software
          </Link>
          {menu === "chess-software" ? <hr /> : <></>}
        </li>

        <li
          onClick={() => {
            setMenu("chess-accessories");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/chess-accessories">
            Accessories
          </Link>
          {menu === "chess-accessories" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
