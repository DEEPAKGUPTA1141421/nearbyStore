import React, { useEffect, useState } from "react";
import "../styles/ProfilePage/ProfileUser.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button, Image } from "@chakra-ui/react";
import { server } from "../../FixedUrl";
import { toast } from "react-toastify";
import { loaduser } from "../../actions/userAction";
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
  const dispatch=useDispatch();
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("1");
    e.preventDefault();
    try {
    console.log("1");
      const formData = new FormData();
      formData.append("fullname", userData.name);
      formData.append("email", userData.email);
      formData.append("contactNumber", userData.phoneNumber);
      formData.append("postalCode", userData.zipCode);
      formData.append("address1", userData.address1);
      formData.append("address2", userData.address2);

      const { data } = await axios.put(
        `${server}/user/update/${user._id}`,formData
      );
    console.log("1");
      console.log("updated user",data);
      if (data.success) {
        toast.success("User Update Succesfully");
        setUpdated(true);
      }
      else{
        toast.error("User Update Succesfully");
      }
      dispatch(loaduser());
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-form-container">
      <div className="profile-image-container">
        <div className="profile-image">
        <Image
  borderRadius='full'
  boxSize='150px'
  src='https://bit.ly/dan-abramov'
  alt='Dan Abramov'
/>
        </div>
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

          <Button colorScheme="whatsapp" onClick={handleSubmit}>Update</Button>
          {updated && <i>User updated successfully!!</i>}
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
