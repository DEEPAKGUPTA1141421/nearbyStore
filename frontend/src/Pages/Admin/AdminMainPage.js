import React, { useState } from 'react'
import "../styles/Admin/admin.css"
import AdminMenu from './AdminMenu';
import GetAllOrderInProcessing from './GetAllOrderInProcessing';
import PayToRider from './PayToRider';
import PayToSeller from './PayToSeller';
import "../styles/sellerPage/MainSellerPage.css";
import ProfileUser from '../ProfilePages/ProfileUser';
const AdminMainPage = () => {
    const[active,setActive]=useState(1);
  return (
    <>
    <div className="sellerpage">
        <div className="div2">
        <AdminMenu active={active} setActive={setActive}/>
        </div>
        <div className="div3">
           {active==1&&<GetAllOrderInProcessing/>}
            {active==2&&<PayToSeller/>}
            {active==3&&<PayToRider/>}
            {active==4&&<ProfileUser/>}
          {}
        </div>
      </div>
    </>
  )
}

export default AdminMainPage;