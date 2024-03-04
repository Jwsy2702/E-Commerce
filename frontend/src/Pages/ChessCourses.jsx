import React, { useContext, useState } from "react";
import "./CSS/ChessCourses.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import arrow_left_circle from "../Components/Assets/arrow-left-circle.svg";
import arrow_right_circle from "../Components/Assets/arrow-right-circle.svg";

//this will eventually be Products, where props contains the type of product, chess course, merchandise, etc
const ChessCourses = (props) => {
  const { products } = useContext(ShopContext);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(
    products.filter((item) => props.category === item.category).length /
      itemsPerPage || 1
  );

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, products.length);

  const sliced = products
    .filter((item) => props.category === item.category)
    .slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="chess-category">
      <img className="chesscategory-banner" /*src={props.banner}*/ alt="" />
      <div className="chesscategory-indexSort">
        <p>
          <span>
            Showing {startIndex + 1}-{endIndex}
          </span>{" "}
          out of {products.length} products
        </p>
        <div className="chesscategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="chesscategory-products">
        {/*Actual link gets entered in url when this item component renders, but definition of url done in router */}
        {sliced.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
            type={item.category}
          />
        ))}
      </div>
      <div className="next-prev-button">
        <button
          className="chesscategory-loadmore"
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <img src={arrow_left_circle} alt="" />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="chesscategory-loadmore"
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <img src={arrow_right_circle} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ChessCourses;
