import { Navigate, createBrowserRouter, useRouteError } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import ChessCourses from "./ChessCourses";
import Product from "./Product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/" /> },
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
            path: "*",
            element: (
              <h1 style={{ textAlign: "center" }}>404 - Page Not Found</h1>
            ),
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
