const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
//cross origin resource sharing: security feature to control web app access
const cors = require("cors");
//load env variables
require("dotenv").config();

app.use(express.json());
//enable cors for all requests
app.use(cors());

//Image Storage Engine
const storage = multer.diskStorage({
  //multer disk storage configuration
  destination: "./upload/images", //specify directory where upload files will be stored
  filename: (req, file, cb) => {
    console.log(file);
    return cb(
      null,
      //file name will be combination of field name, current date and original file extension
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage }); //initialize multer middleware with above configuration

app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    //success status and uploaded file url
    image_url: `http://localhost:4000/images/${req.file.filename}`,
  });
});

mongoose.connect(
  `mongodb+srv://jwongsyy:${process.env.REACT_APP_MONGOOSE_PASSWORD}@cluster0.e4bvpgp.mongodb.net/e-commerce`
);

// MiddleWare
const fetchuser = async (req, res, next) => {
  //extract the jwt token from request header
  const token = req.header("auth-token");
  //check if JWT is provided
  if (!token) {
    //401 = unauthorized
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    //verify jwt using secret key
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    //call next middleware in stack
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};
// Schema for creating user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Schema for creating Product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
  },
  old_price: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});

app.get("/", (req, res) => {
  res.send("Root");
});

//Create an endpoint at ip/login for login the user and giving token
app.post("/login", async (req, res) => {
  console.log("Login");
  let success = false;
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      console.log(user.id);
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success, token });
    } else {
      return res.status(400).json({
        success: success,
        errors: "please try with correct email/password",
      });
    }
  } else {
    return res.status(400).json({
      success: success,
      errors: "please try with correct email/password",
    });
  }
});

//Create an endpoint at ip/auth for regestring the user in data base & sending token
app.post("/signup", async (req, res) => {
  console.log("Sign Up");
  let success = false;
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: success,
      errors: "existing user found with this email",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  success = true;
  res.json({ success, token });
});

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let arr = products.slice(1).slice(-8);
  console.log("New Collections");
  res.send(arr);
});

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({});
  let arr = products.splice(0, 4);
  console.log("Popular In Women");
  res.send(arr);
});

//Create an endpoint for saving the product in cart
app.post("/addtocart", fetchuser, async (req, res) => {
  console.log("Add Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});

//Create an endpoint for removing the product in cart
app.post("/removefromcart", fetchuser, async (req, res) => {
  console.log("Remove Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] != 0) {
    userData.cartData[req.body.itemId] = 0;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});

//Create an endpoint for decrease product quantity by 1 in cart
app.post("/decreaseitemquantity", fetchuser, async (req, res) => {
  console.log("Decrease Item Quantity");
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] != 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Decreased item quantity");
});

//Create an endpoint for increase product quantity by 1 in cart
app.post("/increaseitemquantity", fetchuser, async (req, res) => {
  console.log("Increase Item Quantity");
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] != 0) {
    userData.cartData[req.body.itemId] += 1;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Increased item quantity");
});

app.post("/updatecart", fetchuser, async (req, res) => {
  try {
    // Retrieve user data
    let userData = await Users.findOne({ _id: req.user.id });

    // Update the user's cart data based on the request body
    userData.cartData = req.body.updatedCartData; // Assuming the request body contains the updated cart data
    await userData.save();

    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Create an endpoint for saving the product in cart
app.post("/getcart", fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

//admin panel endpoint
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({ success: true, name: req.body.name });
});

//admin panel endpoint
app.post("/removeproduct", async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({ success: true, name: req.body.name });
});

app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});
