import React, { useEffect, useState } from "react";
import "../styles/sellerPage/Profile.css";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { server } from "../../FixedUrl";
import { CgAbstract } from "react-icons/cg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loadShop } from "../../actions/sellerAction";

const Profile = () => {
  const {shop}=useSelector((state)=>state.sellerreducer);
  console.log("shop",shop);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    shopname: shop[0].shopname,
    ownername: shop[0].ownername,
    contactNumber: shop[0].contactNumber,
    aadharCard: shop[0].aadharCard,
    email: shop[0].email,
    postalCode: shop[0].address.postalCode,
    state: shop[0].address.state,
    city: shop[0].address.city,
    district: shop[0].address.district,
  });

  const handleChange = async (e) => {
    console.log(e.target.value);
    console.log("called");
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    console.log(userDetails);
  };

  const updateProfile = async () => {
    try {
      const {
        shopname,
        ownername,
        contactNumber,
        email,
        postalCode,
        state,
        city,
        district,
        aadharCard,
      } = userDetails;
      const address = { postalCode, state, city, district };
      console.log(state);

      const formdata = new FormData();
      formdata.append("postalCode", postalCode);
      formdata.append("state", state);
      formdata.append("city", city);
      formdata.append("district", district);
      formdata.append("shopname", shopname);
      formdata.append("ownername", ownername);
      formdata.append("contactNumber", contactNumber);
      formdata.append("aadharCard", aadharCard);
      formdata.append("email", email);
      const config = {
        headers: {
          "Content-Type": "application/data",
        },
      };
      const { data } = await axios.put(
        `${server}/shop/updateshop/${shop[0]._id}`,
        formdata,
        config
      );
      setUserDetails({ ...data.shop, ...data.shop.address });
      console.log("Profile updated successfully:", data.shop);
      toast.success("Updated Successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Unable to update shop info.");
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile();
  };

  return (
    <>
    {!loading&&
    <div className="div3">
    <div className="container">
      <div className="profile-image">
        <div className="camera-icon">
          <FaCamera />
        </div>
      </div>

      <div className="form-container">
        <form action="#" method="put" onSubmit={handleUpdate}>
          {/* <div className="row"> */}
          <div className="column">
            <label htmlFor="fullName">Shop Name</label>
            <input
              type="text"
              id="fullName"
              name="shopname"
              value={userDetails.shopname}
              onChange={handleChange}
            />
            <label htmlFor="fullName">Owner Name</label>
            <input
              type="text"
              id="fullName"
              name="ownername"
              value={userDetails.ownername}
              onChange={handleChange}
            />
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="contactNumber"
              value={userDetails.contactNumber}
              onChange={handleChange}
            />
            <label htmlFor="address1">State</label>
            <input
              type="text"
              id="address1"
              name="state"
              value={userDetails.state}
              onChange={handleChange}
            />
            <label htmlFor="address2">Aadhar Number</label>
            <input
              type="text"
              id="address2"
              name="aadharCard"
              value={userDetails.aadharCard}
              onChange={handleChange}
            />
          </div>

          <div className="column">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
            />
            <label htmlFor="email">District</label>
            <input
              type="text"
              id="email"
              name="district"
              value={userDetails.district}
              onChange={handleChange}
            />

            <label htmlFor="zipCode">Postal Code</label>
            <input
              type="text"
              id="zipCode"
              name="postalCode"
              value={userDetails.postalCode}
              onChange={handleChange}
            />

            <label htmlFor="address2">City</label>
            <input
              type="text"
              id="address2"
              name="city"
              value={userDetails.city}
              onChange={handleChange}
            />
          </div>
          {/* </div> */}
          <button className="update-btn" type="submit">
            UPDATE
          </button>
        </form>
      </div>
    </div>
  </div>
    }
    </>
  );
};

export default Profile;
