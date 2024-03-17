import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { convertCategory } from "../../Data/constants";

const Item = (props) => {
  //this <Link will be accessed when item is clicked
  return (
    <div className="item-container">
      <div className="item">
        <Link to={`/${convertCategory[props.type]}/${props.id}`}>
          <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
        </Link>
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">${props.new_price}</div>
          <div className="item-price-old">${props.old_price}</div>
        </div>
      </div>
    </div>
  );
};

export default Item;
