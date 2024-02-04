import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo_big.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pintester_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";
import user_icon from "../Assets/user_icon.jpg";

const Footer = () => {
  const handleSocialMediaClick = (type) => {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    let url = "";
    if (type === "instagram") {
      url = "https://www.instagram.com/jonathanwsy/";
    } else if (type === "twitter") {
      url = "https://twitter.com/YourTwitterUsername";
    } else if (type === "whatsapp") {
      url = "https://web.whatsapp.com/send?phone=88640387";
    }
    window.open(
      url,
      "popUpWindow",
      `height=${height},width=${width},left=${left},top=${top},scrollbars=yes,menubar=no`,
      "false"
    );
  };

  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={user_icon} alt="" />
        <p>CHESS SHOP</p>
      </div>
      <ul className="footer-links">
        <li>Company</li> {/*Add company details */}
        <li>Products</li> {/*Add product categories */}
        <li>Locations</li> {/*Add map location for each store */}
        <li>About</li> {/*Share history and background of ecommerce business */}
        <li>Contact</li> {/*Possibly add qr code for app download in future */}
      </ul>
      <div className="footer-social-icon">
        <div
          className="footer-icons-container"
          onClick={() => handleSocialMediaClick("instagram")}
        >
          <img src={instagram_icon} alt="" />
        </div>
        <div
          className="footer-icons-container"
          onClick={() => handleSocialMediaClick("twitter")}
        >
          <img src={pintester_icon} alt="" />
        </div>
        <div
          className="footer-icons-container"
          onClick={() => handleSocialMediaClick("whatsapp")}
        >
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>© 2024 Jon Chess - All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
