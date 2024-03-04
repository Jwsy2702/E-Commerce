import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ChessCourses from "./Pages/ChessCourses";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from "./Components/Footer/Footer";
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
          <Route
            path="/chess-courses"
            element={
              <ChessCourses banner={beginner_7_10} category="chessCourses" />
            }
          />
          <Route
            path="/teen-courses"
            element={
              <ChessCourses banner={women_banner} category="chessCourses" />
            }
          />
          <Route
            path="/adult-courses"
            element={
              <ChessCourses banner={kid_banner} category="chessCourses" />
            }
          />
          {/*Chess products */}
          <Route
            path="/chess-boards"
            element={<ChessCourses category="boards" />}
          />
          <Route
            path="/chess-pieces"
            element={<ChessCourses category="pieces" />}
          />
          <Route
            path="/chess-clocks"
            element={<ChessCourses category="clocks" />}
          />
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
