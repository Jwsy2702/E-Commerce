import React, { useContext, useState, useEffect, useRef } from "react";
import "./CSS/ChessCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ChessCategory = (props) => {
  //fake data from context
  const { all_product } = useContext(ShopContext);
  //real data from server
  const [allProducts, setAllProducts] = useState([]);
  const itemsPerPage = 6;
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);

  const showMoreItems = () => {
    setVisibleItems(visibleItems + itemsPerPage);
  };

  const fetchInfo = () => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="chess-category">
      <img className="chesscategory-banner" /*src={props.banner}*/ alt="" />
      <div className="chesscategory-indexSort">
        <p>
          <span>Showing 1-15</span> out of 36 products
        </p>
        <div className="chesscategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="chesscategory-products">
        {allProducts
          .filter((item) => props.category === item.category)
          .slice(0, visibleItems)
          .map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
      </div>
      <div>
        {visibleItems < allProducts.length && (
          <button
            className="chesscategory-loadmore"
            type="button"
            onClick={showMoreItems}
          >
            Explore More
          </button>
        )}
      </div>
    </div>
  );
};

export default ChessCategory;
