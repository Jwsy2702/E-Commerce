import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Introducing our exciting Chess Course for Kids Beginners! Designed
          with colorful cartoon-themed visuals and an interactive platform,
          children embark on a captivating journey to master the game of chess.
          Through engaging lessons and fun challenges, kids learn fundamental
          chess strategies, piece movements, and tactics in a playful
          environment. Our course fosters critical thinking, problem-solving
          skills, and sportsmanship, all while having a blast! With interactive
          puzzles, quizzes, and animated characters, young learners develop a
          love for chess that lasts a lifetime. Join us on this thrilling
          adventure as we unlock the secrets of the chessboard together!
        </p>
        <p>
          E-commerce websites typically display products or services along with
          detailed descriptions, images, prices, and any available variations
          (e.g., sizes, colors). Each product usually has its own dedicated page
          with relevant information.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
