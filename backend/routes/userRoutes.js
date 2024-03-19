const express = require("express");
const {
  signup,
  createActualUser,
  login,
  getUser,
  updateUser,
  deleteUser,
  orders,
  addToCart,
  addToWishlist,
  wishlistToCart,
  addComment,
  createOtp,
  cartItems,
  createuserfornow,
  test,
  loaduser,
  wishlistItems,
  removeItemFromWishlist,
  removeItemFromCart,
  logout,
  clearCart
} = require("../controller/userController");
const { isAuthenticated } =require("../middleware/authorised");
const router = express.Router();
router.get("/test",test);
router.get("/loaduser",isAuthenticated,loaduser);
router.post("/signup", signup);
router.post("/createuser",createuserfornow);
router.post("/activation", createActualUser);
router.post("/login", login);
router.delete("/logout",isAuthenticated,logout);
router.get("/get/:id", getUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
// get all orders placed
router.get("/getallorders",isAuthenticated, orders);

router.get("/cartitems",isAuthenticated,cartItems);
router.get("/clearcart",isAuthenticated,clearCart);
// cart list
router.post("/cart/:user/:id", addToCart);
// wishlist
router.delete("/removefromcart/:id",isAuthenticated, removeItemFromCart);

router.post("/wishlist/:user/:id", addToWishlist);
// wishlist to cart
router.post("/wishlistToCart/:user/:id", wishlistToCart);
router.delete("/removefromwishlist/:user/:id", removeItemFromWishlist);
// add comment
router.post("/addcomment/:id", addComment);
router.get("/wishlistItems/:id",wishlistItems);
router.get("/createotp/:id", createOtp);

// processing - picked by rider - delivered by rider - completed

module.exports = router;
