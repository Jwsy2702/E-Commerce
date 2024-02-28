import React from "react";
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";
import { Link } from "react-router-dom";

const Breadcrum = (props) => {
  const { product } = props;
  function convertToSlug(Text) {
    return Text.replace(/([a-z])([A-Z])/g, "$1-$2") // Add hyphen between lowercase and uppercase letters
      .replace(/[\s_]+/g, "-") // Replace spaces with hyphens
      .toLowerCase(); // Convert the entire string to lowercase
  }
  function convertToTitleCase(Text) {
    return Text.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
  }

  const slug = convertToSlug(product.category);
  const title = convertToTitleCase(product.category);

  return (
    <div className="breadcrum">
      {/*Could use Link or onClick, Link for more straightforward and consistent navigation. Onclick for custom logic, program navigation to conditions, states, etc */}
      <Link to="/">HOME</Link> <img src={arrow_icon} alt="" />
      <Link to="/shop">SHOP</Link> <img src={arrow_icon} alt="" />
      <Link to={`/${slug}`}>{title}</Link>
      <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
};

export default Breadcrum;
