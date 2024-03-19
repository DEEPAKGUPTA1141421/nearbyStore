import React, { Fragment, useEffect, useState } from "react";
import {
  FaUser,
  FaShoppingCart,
  FaInbox,
  FaTruck,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userAction";

const ProfilePageMenu = ({ active, setActive }) => {
  const {user}=useSelector((state)=>state.userreducer);
  console.log("user is test ",user);
  const[isAuthenticated,setIsAutenticated]=useState(true);
  console.log("isAutenticated",isAuthenticated);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handlelogout = async () => {
    dispatch(logout());
    if(!user.isAuthenticated){
      setIsAutenticated(false);
      window.location.reload();
      return;
    }
    else{
      setIsAutenticated(true);
    }
  };
  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/");
    }
  },[isAuthenticated,dispatch]);
  return (
    <Fragment>
      <div className="user">
        <div onClick={(e) => setActive(1)} className="profilepagemenu">
          <FaUser />
          Profile
        </div>

        <div onClick={(e) => setActive(2)} className="profilepagemenu">
          <FaShoppingCart />
          Orders
        </div>

        <div onClick={(e) => setActive(3)} className="profilepagemenu">
          <FaInbox />
          Inbox
        </div>
        <div className="profilepagemenu" onClick={handlelogout}>
          <FaSignOutAlt />
          Logout
        </div>
      </div>
    </Fragment>
  );
};

export default ProfilePageMenu;
