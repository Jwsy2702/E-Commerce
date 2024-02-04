import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import ChessCategory from "./Pages/ChessCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import beginner_7_10 from "./Components/Assets/beginner-age-7-10.png";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          {/*<Route
            path="/mens"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={women_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kid_banner} category="kid" />}
          /> */}
          {/*TODO: Chess Courses for different age groups*/}
          <Route
            path="/chess-courses"
            element={
              <ChessCategory banner={beginner_7_10} category="chessCourses" />
            }
          />
          <Route
            path="/teen-courses"
            element={
              <ChessCategory banner={women_banner} category="chessCourses" />
            }
          />
          <Route
            path="/adult-courses"
            element={
              <ChessCategory banner={kid_banner} category="chessCourses" />
            }
          />
          {/*Chess products */}
          <Route
            path="/chess-boards"
            element={<ChessCategory category="boards" />}
          />
          <Route
            path="/chess-pieces"
            element={<ChessCategory category="pieces" />}
          />
          <Route
            path="/chess-clocks"
            element={<ChessCategory category="clocks" />}
          />
          {/* remaining part that works, TODO: fix above */}
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
