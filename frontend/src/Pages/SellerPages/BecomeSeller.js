import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../FixedUrl";
import BackIcon from "../../BackIcon";
const Becomeseller = () => {
  const { isAuthenticated, user } = useSelector((state) => state.userreducer);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopname: "",
    ownername: "",
    email: user.email,
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
    location: "",
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
  const uploadImage = async (e) => {
    if (!image || image == undefined) {
      toast.error("select image to upload the image");
      return;
    }
    const formdata = new FormData();
    formdata.append("file", image);
    formdata.append("upload_preset", "imagepreset");
    formdata.append("cloud_name", "drt8pxy1q");
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/drt8pxy1q/image/upload",
      formdata
    );
    console.log(data.secure_url);
    setImageUrl(data.secure_url);
    toast.success("Image Uploaded");
    return data.success;
  };
  const handlelocationChange = (e) => {
    const geo = navigator.geolocation;
    console.log("handlelocationchange");
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
  const isFormValid = () =>{
    for (const key in formData) {
      if(key==="address")continue;
      if (formData[key]===undefined) {
        return false; // Return false if any property is empty
      }
    }
    return true; // Return true if all properties are non-empty
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isFormValid()===false){
      toast.error("Enter The Data");
      return;
    }
    const userdata=new FormData();
    userdata.append("role","seller");
    let {data}=await axios.put(`${server}/user/update/${user._id}`,userdata);
    if(data.success===false){
      toast.error("user can't be seller")
      return;
    }
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
    try {
      if (uploadImage()) {
        const { data } = await axios.post(
          `${server}/shop/create`,
          formdatacurr,
          axiosConfig
        );
        console.log("data", data);
        if (data.success) {
          toast.success(data.message);

          navigate("/");
        } else {
          toast.error("error while creating the shop");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
    console.log(formData);
  };
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You Have to Be a User First To Be a Seller");
      navigate("/");
    }
  });

  return (
    <>
      <BackIcon />
      <Flex direction="column" align="center" justify="center" minH="100vh">
        <Flex direction="column" maxW="500px" p="4">
          <Heading as="h2" mb="4">
            Create your account
          </Heading>
          <FormControl>
            <FormLabel>Shop Name:</FormLabel>
            <Input
              type="text"
              name="shopname"
              value={formData.shopname}
              onChange={handleChange}
            />
            <FormLabel>Owner Name:</FormLabel>
            <Input
              type="text"
              name="ownername"
              value={formData.ownername}
              onChange={handleChange}
            />
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              name="email"
              readOnly
              value={formData.email}
              onChange={handleChange}
            />
            <FormLabel>Contact Number:</FormLabel>
            <Input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
            />
            <FormLabel>Aadhar Card:</FormLabel>
            <Input
              type="text"
              name="aadharCard"
              value={formData.aadharCard}
              onChange={handleChange}
            />
            <FormLabel>Location:</FormLabel>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <FormLabel>Category:</FormLabel>
            <Input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            <FormLabel>Address - State:</FormLabel>
            <Input
              type="text"
              name="state"
              value={formData.address.state}
              onChange={handleAddressChange}
            />
            <FormLabel>Address - City:</FormLabel>
            <Input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
            />
            <FormLabel>Address - District:</FormLabel>
            <Input
              type="text"
              name="district"
              value={formData.address.district}
              onChange={handleAddressChange}
            />
            <FormLabel>Address - Postal Code:</FormLabel>
            <Input
              type="text"
              name="postalCode"
              value={formData.address.postalCode}
              onChange={handleAddressChange}
            />
            <FormLabel>Address - Latitude:</FormLabel>
            <Input
              type="text"
              name="latitude"
              value={formData.address.latitude}
              onChange={handleAddressChange}
            />
            <FormLabel>Address - Longitude:</FormLabel>
            <Input
              type="text"
              name="longitude"
              value={formData.address.longitude}
              onChange={handleAddressChange}
            />
            <Button colorScheme="whatsapp" onClick={handlelocationChange}>
              Click To Set Loaction
            </Button>
            <Input type="file" onChange={handleImageChange} />
            <Button mt="4" colorScheme="red" onClick={handleSubmit}>
              Submit
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </>
  );
};
export default Becomeseller;
