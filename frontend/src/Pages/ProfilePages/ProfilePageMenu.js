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
import { Button } from "@chakra-ui/react";

const ProfilePageMenu = ({ active, setActive }) => {
  const {user}=useSelector((state)=>state.userreducer);
  console.log("user is test ",user);
  const[isAuthenticated,setIsAutenticated]=useState(true);
  console.log("isAutenticated",isAuthenticated);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handlelogout = async () => {
    setActive(4)
    await dispatch(logout());
    if (!user.isAuthenticated) {
      setIsAutenticated(false);
      navigate("/", { replace: true });
      window.location.reload();
    } else {
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
          <Button>
          <FaUser />
          <Button>Profile</Button>
          </Button>
        </div>

        <div onClick={(e) => setActive(2)} className="profilepagemenu">
          <Button>
          <FaShoppingCart />
          <Button>Orders</Button>
          </Button>
        </div>

        <div onClick={(e) => setActive(3)} className="profilepagemenu">
          <Button><FaInbox />
          <Button>Inbox</Button>
          </Button>
        </div>
        <div className="profilepagemenu" onClick={handlelogout}>
          <Button>
          <FaSignOutAlt />
          <Button>Logout</Button>
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfilePageMenu;
