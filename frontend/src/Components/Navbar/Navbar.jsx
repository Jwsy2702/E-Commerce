import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";

import chess_logo from "../Assets/chess-logo.png";
import cart_icon from "../Assets/cart_icon.png";
import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const { state } = useNavigation();
  const isLoading = state === "loading";
  //to keep underline on selected menu
  const [menu, setMenu] = useState(
    localStorage.getItem("selectedMenu") || "shop"
  );
  const { getTotalCartItems } = useContext(ShopContext);

  useEffect(() => {
    localStorage.setItem("selectedMenu", menu);
  }, [menu]);

  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          <img src={chess_logo} alt="" style={{ maxWidth: "60%" }} />
          <p>Jon Chess</p>
        </div>
        <nav className="nav-menu">
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
              setMenu("chess-merchandise");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/chess-merchandise">
              Chess Merchandise
            </Link>
            {menu === "chess-merchandise" ? <hr /> : <></>}
          </li>

          <li
            onClick={() => {
              setMenu("coaching");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/chess-coaching">
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
            <Link style={{ textDecoration: "none" }} to="/accessories">
              Accessories
            </Link>
            {menu === "chess-accessories" ? <hr /> : <></>}
          </li>
        </nav>
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
      <ScrollRestoration />
      {isLoading && <div className="loading-spinner" />}
      <div className={`container ${isLoading ? "loading" : ""}`}>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
