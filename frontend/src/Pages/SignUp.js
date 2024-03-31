import React, { useEffect, useState } from "react";
import "./styles/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import hidepng from "../images/hide.png";
import showpng from "../images/show.png";
import { server } from "../FixedUrl";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
function SignUp() {
  const [isloading, setIsLoading] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [country, setCountry] = useState("India");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [user, setUser] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const u = useSelector((state) => state.userreducer);
  const { isAuthenticated } = u;
  console.log(u);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
    }
    if (u.user != undefined) {
      setUser(u.user);
      navigate("/");
    }
  }, [isAuthenticated, user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          setAvatar(reader.result);
          console.log("image uploaded");
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.log("file uploaded failed");
    }
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "country":
        setCountry(value);
        break;
      case "city":
        setCity(value);
        break;
      case "address1":
        setAddress1(value);
        break;
      case "address2":
        setAddress2(value);
        break;
      case "postalCode":
        setPostalCode(value);
        break;
      case "addressType":
        setAddressType(value);
        break;
      default:
        break;
    }
  };
  const handlePaswordVisible = () => {
    setShowPassword(!showPassword);
  };

  const handlePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
    setPasswordLength(val.length < 8);
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
    setAvatar(data.secure_url);
    toast.success("Image Uploaded");
    if (data.success) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !avatar) return;
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("image", avatar);
    formdata.append("fullname", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("country", country);
    formdata.append("city", city);
    formdata.append("address1", address1);
    formdata.append("address2", address2);
    formdata.append("postalCode", postalCode);
    formdata.append("addressType", addressType);
    const axiosConfig = {
      withCredentials: true, // Store cookies
      // ContentType: 'application/data' // Handle application/data responses
    };

    try {
      if (uploadImage()) {
        const { data } = await axios.post(
          `${server}/user/createuser`,
          formdata,
          axiosConfig
        );
        console.log(data);
        setUser(data.user);
        setIsLoading(false);
        console.log("user", data.user);
        toast.success(data.message);
        setName("");
        setEmail("");
        setAvatar("");
        setPassword("");
        setCity("");
        setCountry("");
        setPostalCode("");
        setAddress1("");
        setAddress2("");
        setAddressType("");
        navigate("/");
      }
    } catch (err) {
      console.log("err", err);
      toast(err.message);
    }
  };

  return (
    <Box textAlign="center">
      <Box maxWidth="500px" margin="auto">
        <Box>
          <Heading size="lg">Register as a new user</Heading>
        </Box>
        <Box>
          <Box>
            <label>Full name</label>
            <br />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              type="text"
              required
            />
            <br />
          </Box>

          <Box>
            <label>Email address</label>
            <br />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
            />
            <br />
          </Box>

          <Box>
            <label>Password</label>
            <br />
            <Input
              width={"100%"}
              style={{ width: "100%" }}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => handlePassword(e)}
              required
            />
            {passwordLength && <Text>Minimum 8 characters allowed</Text>}
          </Box>
          <Box>
            <label>Country</label>
            <Input
              name="country"
              value={country}
              onChange={handleAddressChange}
              placeholder="Country"
            />
          </Box>
          <Box>
            <label>City</label>
            <Input
              name="city"
              value={city}
              onChange={handleAddressChange}
              placeholder="City"
            />
          </Box>
          <Box>
            <label>Address1</label>
            <Input
              name="address1"
              value={address1}
              onChange={handleAddressChange}
              placeholder="Address Line 1"
            />
          </Box>
          <Box>
            <label>Address2</label>
            <Input
              name="address2"
              value={address2}
              onChange={handleAddressChange}
              placeholder="Address Line 2"
            />
          </Box>
          <Box>
            <label>Postal Address</label>
            <Input
              name="postalCode"
              value={postalCode}
              onChange={handleAddressChange}
              placeholder="Postal Code"
            />
          </Box>
          <Box>
            <label>Address-Type</label>
            <Input
              name="addressType"
              value={addressType}
              onChange={handleAddressChange}
              placeholder="Address Type"
            />
          </Box>
          <Box>
            {avatar !== null ? (
              <Image src={avatar} alt="User Avatar" />
            ) : (
              <>
                <label>Upload Image</label>
                <br />
                <Input type="file" name="file" onChange={handleAvatarChange} />
              </>
            )}
          </Box>

          <Button
            isLoading={isloading}
            onClick={handleSubmit}
            colorScheme="blue"
            mt={4}
          >
            Submit
          </Button>
          <Text>
            Already have an account?
            <Link to="/login" color="blue.500" ml={1}>
              Sign in
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default SignUp;
