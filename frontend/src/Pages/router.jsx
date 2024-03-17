import { Navigate, createBrowserRouter, useRouteError } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import ChessCourses from "./ChessCourses";
import Product from "./Product";
import Shop from "./Shop";
import Footer from "../Components/Footer/Footer";
import Cart from "./Cart";
import LoginSignup from "./LoginSignup";
//for custom checkout form
//import CheckoutForm from "../Components/CheckoutForm/CheckoutForm";
import Stripe from "./Stripe";
import { Success, Cancel, PageNotFound } from "./TinyPages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Footer />
      </>
    ),
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/shop" /> },
          {
            path: "/shop",
            element: <Shop />,
          },
          {
            path: "chess-courses",
            children: [
              {
                index: true,
                element: <ChessCourses category="chessCourses" />,
              },
              //can name productId or anything, useParams() in Product component to access dynamically assigned value. TODO: could remove loader and implement useLoaderData() hook to asynchronously fetch data for a route
              { path: ":productId", element: <Product /> },
            ],
          },
          {
            path: "chess-merchandise",
            children: [
              {
                index: true,
                element: <ChessCourses category="chessMerchandise" />,
              },
              { path: ":productId", element: <Product /> },
            ],
          },
          {
            path: "chess-coaching",
            children: [
              {
                index: true,
                element: <ChessCourses category="chessCoaching" />,
              },
              { path: ":productId", element: <Product /> },
            ],
          },
          {
            path: "chess-software",
            children: [
              {
                index: true,
                element: <ChessCourses category="chessSoftware" />,
              },
              { path: ":productId", element: <Product /> },
            ],
          },
          {
            path: "accessories",
            children: [
              { index: true, element: <ChessCourses category="accessories" /> },
              { path: ":productId", element: <Product /> },
            ],
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "login",
            element: <LoginSignup />,
          },
          {
            path: "checkout",
            element: <Stripe />,
          },
          {
            path: "success",
            element: <Success />,
          },
          { path: "cancel", element: <Cancel /> },
          {
            path: "*",
            element: <PageNotFound />,
          },
        ],
      },
    ],
  },
]);

function ErrorPage() {
  const error = useRouteError(); //custom hook that allows to get error that caused errorElement to render in router

  return (
    <>
      <h1>Error - Someting went wrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}{" "}
      {/*if in environment of development */}
    </>
  );
}
