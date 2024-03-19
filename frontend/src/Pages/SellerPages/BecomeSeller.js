import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../FixedUrl";
const Becomeseller = () => {
  const {isAuthenticated,user}=useSelector((state)=>state.userreducer);
  const[image,setImage]=useState("");
  const[imageUrl,setImageUrl]=useState();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    shopname: "",
    ownername: "",
    email: "",
    contactNumber: "",
    aadharCard: "",
    address: {
      state: "",
      city: "",
      district: "",
      postalCode: "",
      latitude: "",
      longitude: "",
    },
    category: "",
    location:"",
    imagefshop: null, // Additional field for shop image
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    console.log("image change");
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const uploadImage=async(e)=>{
    if(!image||image==undefined){
      toast.error("select image to upload the image");
      return;
    }
      const formdata=new FormData();
      formdata.append("file",image);
      formdata.append("upload_preset","imagepreset");
      formdata.append("cloud_name",'drt8pxy1q');
      const {data}=await axios.post("https://api.cloudinary.com/v1_1/drt8pxy1q/image/upload",formdata);
      console.log(data.secure_url);
      setImageUrl(data.secure_url);
      toast.success("Image Uploaded");
  }
  const handlelocationChange = (e) => {
    const geo = navigator.geolocation;
    if (geo) {
      geo.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prevData) => ({
          ...prevData,
          address: {
            ...prevData.address,
            latitude: latitude,
            longitude: longitude,
          },
        }));
      });
      toast.success("location Selected");
    } else {
      console.error("Geolocation is not supported by this browser.");
      toast.success("Geolocation is not supported by this browser");
    }
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formdatacurr = new FormData();
formdatacurr.append("shopname", formData.shopname);
formdatacurr.append("ownername", formData.ownername);
formdatacurr.append("email", formData.email);
console.log(formData.email);
formdatacurr.append("contactNumber", formData.contactNumber);
formdatacurr.append("aadharCard", formData.aadharCard);
formdatacurr.append("state", formData.address.state);
formdatacurr.append("city", formData.address.city);
formdatacurr.append("district", formData.address.district);
formdatacurr.append("postalCode", formData.address.postalCode);
formdatacurr.append("latitude", formData.address.latitude);
formdatacurr.append("longitude", formData.address.longitude);
formdatacurr.append("category", formData.category);
formdatacurr.append("location", formData.location);
formdatacurr.append("imagefshop", imageUrl); // Assuming imageUrl is the URL for the shop image
    const axiosConfig = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
      },
    };
    try{
      const {data}=await axios.post(`${server}/shop/create`,formdatacurr,axiosConfig);
      console.log("data",data);
      if(data.success){
        toast.success(data.message);
        
        navigate("/");
      }
      else{
        toast.error("error while creating the shop");
      }
    }
    catch(err){
      toast.error(err.message);
    }
    console.log(formData);
  };
  useEffect(()=>{
    if(!isAuthenticated){
      toast.error("You Have to Be a User First To Be a Seller");
        navigate("/");
    }
  })
  return (
    <div className="body">
      <div className="center-div">
        <div className="heading">
          <h2>Create your account</h2>
        </div>
        <div className="content" style={{position: "relative",
  top: "20rem",
  flexDirection: "column",
  justifyContent: "spaceEvenly"}}>
          <div>
            <div>
              <label>
                Shop Name:
                <input
                  className="input-field"
                  type="text"
                  name="shopname"
                  value={formData.shopname}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Owner Name:
                <input
                  className="input-field"
                  type="text"
                  name="ownername"
                  value={formData.ownername}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Email:
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Contact Number:
                <input
                  className="input-field"
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Aadhar Card:
                <input
                  className="input-field"
                  type="text"
                  name="aadharCard"
                  value={formData.aadharCard}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Address - State:
                <input
                  className="input-field"
                  type="text"
                  name="state"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                />
              </label>
            </div>
            <div>
              <label>
                Address - City:
                <input
                  className="input-field"
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                />
              </label>
            </div>
            <div>
              <label>
                Address - District:
                <input
                  className="input-field"
                  type="text"
                  name="district"
                  value={formData.address.district}
                  onChange={handleAddressChange}
                />
              </label>
            </div>
            <div>
              <label>
                Address - Postal Code:
                <input
                  className="input-field"
                  type="text"
                  name="postalCode"
                  value={formData.address.postalCode}
                  onChange={handleAddressChange}
                />
              </label>
            </div>
            <div>
              <label>
                Address - Latitude:
                <input
                  className="input-field"
                  type="text"
                  name="latitude"
                  value={formData.address.latitude}
                  onChange={handleAddressChange}
                />
              </label>
            </div>
            <div>
              <label>
                Address - Longitude:
                <input
                  className="input-field"
                  type="text"
                  name="longitude"
                  value={formData.address.longitude}
                  onChange={handleAddressChange}
                />
              </label>
            </div>
            <div onClick={handlelocationChange}>
              <button className="location-btn">Click To Add Shop Location</button>
            </div>
            <div>
              <label>
                Category:
                <input
                  className="input-field"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Location:
                <input
                  className="input-field"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Shop Image:
                <input
                  className="input-field"
                  type="file"
                  accept="image/jpeg"
                  onChange={handleImageChange}
                />
              </label>
              <div style={{marginBottom:"5rem"}}>
                <button  className="submit-btn" onClick={uploadImage}>Upload Shop image</button>
              </div>
            </div>
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Becomeseller;
