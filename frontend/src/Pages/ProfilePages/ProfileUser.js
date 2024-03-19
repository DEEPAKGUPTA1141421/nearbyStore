import React, { useEffect, useState } from "react";
import "../styles/ProfilePage/ProfileUser.css";
import axios from "axios";
import { useSelector } from "react-redux";

const ProfileUser = () => {
  const{user}=useSelector((state)=>state.userreducer);
  console.log("user",user);
  const [userData, setUserData] = useState({
    name: user.fullname,
    phoneNumber: user.contactNumber    ,
    address1: user.address.address1,
    address2: user.address.address2,
    email:user.email,
    zipCode: "854331",
  });
  const [updated, setUpdated] = useState(false);

  const fetchUserData = async () => {
    try {
      console.log("checkid",user._id);
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/user/get/${user._id}`
      );

      if (data.success) {
        setUserData({
          name: data.user.fullname,
          email: data.user.email,
          address1: data.user.address.address1,
          address2: data.user.address.address2,
          phoneNumber: data.user.contactNumber,
          zipcode: data.user.address.postalCode,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullname", userData.name);
      formData.append("email", userData.email);
      formData.append("contactNumber", userData.phoneNumber);
      formData.append("postalCode", userData.zipCode);
      formData.append("address1", userData.address1);
      formData.append("address2", userData.address2);

      const { data } = await axios.put(
        `http://localhost:8000/api/v1/user/update/${user._id}`,
        formData
      );

      if (data.success) {
        setUpdated(true);
      }

      fetchUserData();

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-form-container">
      <div className="profile-image-container">
        <div className="profile-image"></div>
      </div>
      <div className="form-columns">
        <div className="form-column">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData!=undefined?userData.name:"no data"}
            onChange={handleChange}
          />
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={userData!=undefined?userData.phoneNumber:"no data"}
            onChange={handleChange}
          />
          <label>Address 1</label>
          <input
            type="text"
            name="address1"
            value={userData!=undefined?userData.address1:"no data"}
            onChange={handleChange}
          />
        </div>
        <div className="form-column">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData!=undefined?userData.email:"no data"}
            onChange={handleChange}
          />
          <label>Zip Code</label>
          <input
           readOnly
            type="text"
            name="zipCode"
            value={userData!=undefined?userData.zipCode:"no data"}
            onChange={handleChange}
          />
          <label>Address 2</label>
          <input
            type="text"
            name="address2"
            value={userData!=undefined?userData.address2:"no data"}
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>Update</button>
          {updated && <i>User updated successfully!!</i>}
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
