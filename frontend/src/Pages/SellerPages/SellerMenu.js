import React, { Fragment, useEffect, useState } from "react";
import {
  FaCamera,
  FaUser,
  FaShoppingCart,
  FaTachometerAlt,
  FaInbox,
  FaTruck,
  FaCreditCard,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "../styles/sellerPage/SellerMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";

const SellerMenu = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.userreducer);
  console.log("user is test ", user);
  const [isAuthenticated, setIsAutenticated] = useState(true);
  console.log("isAutenticated", isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlelogout = async () => {
    dispatch(logout());
    if (!user.isAuthenticated) {
      setIsAutenticated(false);
      window.location.reload();
      return;
    } else {
      setIsAutenticated(true);
    }
  };
  useEffect(() => {
    if (!isAuthenticated){
      navigate("/");
    }
  }, [isAuthenticated, dispatch]);
  return (
    <Fragment>
      <div className="sell">
        <div onClick={(e) => setActive(1)} className="sellerpagemenu">
          <FaTachometerAlt />
          Dashboard
        </div>
        <div onClick={(e) => setActive(2)} className="sellerpagemenu">
          <FaUser />
          Profile
        </div>
        <div onClick={(e) => setActive(3)} className="sellerpagemenu">
          <FaMapMarkerAlt />
          Create Product
        </div>
        <div onClick={(e) => setActive(4)} className="sellerpagemenu">
          <FaShoppingCart />
          Orders
        </div>
        <div onClick={(e) => setActive(5)} className="sellerpagemenu">
          <FaTruck />
          Track Order
        </div>
        <div onClick={(e) => setActive(6)} className="sellerpagemenu">
          <FaCreditCard />
          Shop Feedback
        </div>
        <div onClick={(e) => setActive(7)} className="sellerpagemenu">
          <FaInbox />
          Inbox
        </div>
        <div  className="sellerpagemenu" onClick={handlelogout}>
          <FaSignOutAlt />
          Logout
        </div>
      </div>
    </Fragment>
  );
};

export default SellerMenu;
