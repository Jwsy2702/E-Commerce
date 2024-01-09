import React from "react";
import "./Navbar.css";
import navlogo from "../Assets/nav-logo.svg";
// import navprofileIcon from '../Assets/nav-profile.svg'
import userIcon from "../Assets/user-icon.jpg";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="" />
      <img src={userIcon} width={100} height={120} alt="" />
    </div>
  );
};

export default Navbar;
