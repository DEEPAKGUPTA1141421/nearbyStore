import React, { Fragment, useEffect, useState } from 'react'
import {
  FaCamera,
  FaUser,
  FaShoppingCart,
  FaMoneyCheck,
  FaInbox,
  FaTruck,
  FaCreditCard,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userAction';
import "../styles/sellerPage/SellerMenu.css";
const AdminMenu = ({active,setActive}) => {
  const { user } = useSelector((state) => state.userreducer);
  console.log("user is test ", user);
  const [isAuthenticated, setIsAutenticated] = useState(true);
  console.log("isAutenticated", isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlelogout = async () => {
    dispatch(logout());
    if (!user.isAuthenticated) {
      navigate("/");
      window.location.reload();
      setIsAutenticated(false);
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
        <div className='adminleftmenucontainer'>
        <div onClick={(e)=>setActive(1)} className="sellerpagemenu"><FaUser/>getAllProductsInProcessing</div>
        <div onClick={(e)=>setActive(2)} className="sellerpagemenu"><FaUser/>paySeller</div>
        <div onClick={(e)=>setActive(3)} className="sellerpagemenu"><FaMapMarkerAlt/>payRider</div>
        <div onClick={(e) => setActive(4)} className="sellerpagemenu"><FaUser />Profile</div>
        <div  className="sellerpagemenu" onClick={handlelogout}><FaSignOutAlt />Logout</div>
        </div>
    </Fragment>
  )
}

export default AdminMenu;