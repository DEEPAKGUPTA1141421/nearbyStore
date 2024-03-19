import React, { useEffect, useState } from 'react'
import CreateRider from './CreateRider';
import NeedToPickOrder from './NeedToPickOrder';
import AllReceivedOrderRider from './AllReceivedOrderRider';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import "../styles/Admin/admin.css"
import RiderProfile from './RiderProfile';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userAction';
const MainRiderPage = () =>{
    const[active,setActive]=useState(1);
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
    <>
    <div className='admingrid'>
        <div className='admingridleft'>
        <div className='adminleftmenucontainer'>
        <div onClick={(e)=>setActive(1)}className='adminmenu'><CgProfile/>RiderProfile</div>
        <div onClick={(e)=>setActive(2)}className='adminmenu'><FaUser/>NeedToPickOrder</div>
        <div onClick={(e)=>setActive(3)}className='adminmenu'><FaMapMarkerAlt/>AllReceivedOrderRider</div>
        <div onClick={(e)=>setActive(3)}className='adminmenu'><FaMapMarkerAlt/><span onClick={handlelogout}>LogOut</span></div>
        </div>
            </div>
        <div className='admingridright'>
          {active===1&&<RiderProfile/>}
         {active==2&&<NeedToPickOrder/>}
         {active===3&&<AllReceivedOrderRider/>}
        </div>   
    </div>
    </>
  )
}

export default MainRiderPage;