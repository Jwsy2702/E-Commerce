import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assets/all_product";
import { useFetch } from "../Hooks/useFetch";
import { compareObjects } from "../Utils/compareObjects";

//share state and functions between components without needing to pass props
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  //default cart object
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  //state of cart and products
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const url = "http://localhost:4000/allproducts";
  //essentially same thing as getcart but this doesnt require auth since fetching all products from database
  const { data: products, isError, isLoading } = useFetch(url);

  useEffect(() => {
    if (!isLoading && products) {
      //when user logs in and receives auth token. if it exists in local storage means user is logged in
      console.log("productssss: ", products);
      console.log("cartItems: ", cartItems);

      if (localStorage.getItem("auth-token")) {
        fetch("http://localhost:4000/getcart", {
          method: "POST",
          headers: {
            Accept: "application/form-data", //specify accepted response media type
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        })
          .then((res) => res.json())
          .then((data) => {
            // Check if each item in cart still exists in the fetched products
            console.log("enter data setting part");
            const updatedCartItems = {};
            Object.entries(data).forEach(([productId, quantity]) => {
              // Assuming products is an array of product objects with an id field
              if (
                products.some((product) => product.id === parseInt(productId))
              ) {
                updatedCartItems[productId] = quantity;
              }
            });
            console.log("updatedCartItems: ", updatedCartItems);
            console.log("data: ", data);
            // if (!compareObjects(updatedCartItems, data)) {
            setCartItems(updatedCartItems);
            // }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [isLoading, products]);

  const updateCartInDatabase = (updatedCartItems) => {
    fetch("http://localhost:4000/updatecart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartData: updatedCartItems }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        // Assuming data contains success message or relevant information
      })
      .catch((err) => {
        console.error("Error updating cart in database:", err);
        // Handle error
      });
  };

  const addToCart = (itemId) => {
    //itemId = "123";
    //[itemId] allows to dynamically set property name, i.e. the value stored in itemId. { "123": 10 }
    //itemId results in property name as a string literal, i.e. { itemId: 10 }
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log("cartItems: ", cartItems);
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error("Error adding to cart:", err);
        });
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error("Error removing from cart:", err);
        });
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        //use products for real data
        let itemInfo = products.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo?.new_price || 0;
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  //to be shared with consumer components
  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    products,
    cartItems,
    addToCart,
    removeFromCart,
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (isError) {
    return <h1>Error...</h1>;
  }

  return (
    //useContext is used to pass the context value to all the components
    //can be used in any component, like a global state.
    //see CartItems.jsx as example, where we are using the context value
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
