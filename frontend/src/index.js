import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import ShopContextProvider from "./Context/ShopContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./Pages/router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ShopContextProvider>
    {/* <App /> */}
    <RouterProvider router={router} />
  </ShopContextProvider>
);
