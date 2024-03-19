import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import ActivateAccount from "./Pages/ActivateAccount";
import ProductPage from "./Pages/ProductPage/ProductPage";
import MainSellerPage from "./Pages/SellerPages/MainSellerPage";
import ProfilePage from "./Pages/SellerPages/Profile";
import ProductDetails from "./Pages/ProductPage/ProductDetails";
import OrderPage from "./Pages/PlaceOrder/PlaceOrder";
import Cart from "./Pages/Cart";
import CategoryWiseProduct from "./CategoryWiseProduct.js";
import Wishlist from "./Pages/Wishlist";
import ShopMessage from "./Pages/ProductPage/ShopMessage.js";
import AdminMainPage from "./Pages/Admin/AdminMainPage.js";
//import ProfilePageMenu from "./Pages/ProfilePages/ProfilePageMenu.js";
import ProfileMainPage from "./Pages/ProfilePages/ProfileMainPage.js";
import SuccessSection from "./Pages/PlaceOrder/SuccessSection.js";
import SearchedProduct from "./Pages/ProductPage/SearchedProducts.js";
import MainRiderPage from "./Pages/riderPage/MainRiderPage.js";
import Lobby from "./Pages/screens/Lobby.js";
import Room from "./Pages/screens/Room.js";
import CreateRider from "./Pages/riderPage/CreateRider.js";
import Becomeseller from "./Pages/SellerPages/BecomeSeller.js";
import InboxUser from "./Pages/ProfilePages/InboxUser.js";
import ShopPages from "./Pages/SellerPages/ShopPages.js";
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route
        path="/activation/:activationToken"
        element={<ActivateAccount />}
      ></Route>
      <Route path="/productPage" element={<ProductPage />}></Route>
      <Route path="/mainsellerpage" element={<MainSellerPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/product/:productid" element={<ProductDetails />}></Route>
      <Route path="/placeOrder" element={<OrderPage />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/wishlist" element={<Wishlist />}></Route>
      <Route path="/search-products" element={<SearchedProduct />}></Route>
      <Route
        path="/product/search/:category"
        element={<CategoryWiseProduct />}
      ></Route>
      <Route path="/messageseller/:shopId" element={<ShopMessage />}></Route>
      <Route path="/admin" element={<AdminMainPage />}></Route>
      <Route path="becomeRider" element={<CreateRider/>}></Route>
      <Route path="becomeSeller" element={<Becomeseller/>}></Route>
      <Route path="/userprofile" element={<ProfileMainPage />}></Route>
      <Route path="/paymentsuccess" element={<SuccessSection />}></Route>
      <Route path="/room" element={<Lobby/>}></Route>
      <Route path="/room/:roomId" element={<Room/>}></Route>
      <Route path="/rider" element={<MainRiderPage/>}></Route>
      <Route path="/inbox" element={<InboxUser/>}></Route>
      <Route path="/shoppage/:shopId" element={<ShopPages/>}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;
