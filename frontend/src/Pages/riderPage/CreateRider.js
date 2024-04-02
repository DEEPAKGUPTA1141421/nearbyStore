import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createRider } from "../../actions/riderActions";
import BackIcon from "../../BackIcon";
import {
  Box,
  Center,
  Heading,
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { server } from "../../FixedUrl";
const CreateRider = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.userreducer);
  const [imageUrl, SetImageUrl] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("First Become User Then be Rider");
      navigate("/");
    }
  }, []);
  const initialState = {
    name: "",
    email: user.email,
    phoneNumber: "",
    city: "",
    adhaharNumber: "",
    panNumber: "",
    age: "",
    gender: "",
    policeCase: "",
    password: "",
    imageofrider: "",
    typeOfVan: "",
    nameOfVan: "",
  };
  const validateForm = () => {
    let errors = {};
    let isValid = true;
    for (const key in formData) {
      if (formData[key] === "" || formData[key] === undefined) {
        return false;
      }
    }
    return isValid;
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    SetImageUrl(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userdata = new FormData();
    userdata.append("role", "rider");
    let { data } = await axios.put(
      `${server}/user/update/${user._id}`,
      userdata
    );
    if (data.success === false) {
      toast.error("user can't be rider");
      return;
    }
      if(uploadImage()) {
        console.log(formData);
        dispatch(createRider(formData));
        toast.success("You Can Now Acceess Your Profile");
        navigate("/");
      }
  };
  const uploadImage = async (e) => {
    if (!imageUrl) {
      toast.error("select image to upload the image");
      return false;
    }
    const formdata = new FormData();
    formdata.append("file", imageUrl);
    formdata.append("upload_preset", "imagepreset");
    formdata.append("cloud_name", "drt8pxy1q");
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/drt8pxy1q/image/upload",
      formdata
    );
    console.log(data.secure_url);
    setUrl(data.secure_url);
    setFormData({ ...formData, imageofrider: data.secure_url });
    return data.success;
  };
  return (
    <>
      <BackIcon />
      {/* <div className="body">
        <div className="center-div">
          <div className="heading">
            <h2>Create your account</h2>
          </div>
          <div className="content">
            <div>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Phone Number:
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Aadhaar Number:
                <input
                  type="text"
                  name="adhaharNumber"
                  value={formData.adhaharNumber}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                PAN Number:
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Gender:
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Police Case:
                <select
                  name="policeCase"
                  value={formData.policeCase}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Type of Van:
                <select
                  name="typeOfVan"
                  value={formData.typeOfVan}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="2 Wheeler">2 Wheeler</option>
                  <option value="3 Wheeler">3 Wheeler</option>
                  <option value="4 Wheeler">4 Wheeler</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                Name of Van:
                <input
                  type="text"
                  name="nameOfVan"
                  value={formData.nameOfVan}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Upload Image:
                <input
                  type="file"
                  name="imageofrider"
                  onChange={handleImageChange}
                  required
                />
              </label>
            </div>
            <button className="submit-btn" onClick={uploadImage}>Upload Image</button>
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div> */}
      <Center minH="100vh">
        <Box w="400px">
          <Box>
            <Box textAlign="center">
              <Heading as="h2">Register As a Rider</Heading>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Name:</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email:</FormLabel>
                <Input
                  type="email"
                  name="email"
                  readOnly
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password:</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone Number:</FormLabel>
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>City:</FormLabel>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Aadhaar Number:</FormLabel>
                <Input
                  type="text"
                  name="adhaharNumber"
                  value={formData.adhaharNumber}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>PAN Number:</FormLabel>
                <Input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Age:</FormLabel>
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Gender:</FormLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Police Case:</FormLabel>
                <Select
                  name="policeCase"
                  value={formData.policeCase}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Type of Van:</FormLabel>
                <Select
                  name="typeOfVan"
                  value={formData.typeOfVan}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="2 Wheeler">2 Wheeler</option>
                  <option value="3 Wheeler">3 Wheeler</option>
                  <option value="4 Wheeler">4 Wheeler</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Name of Van:</FormLabel>
                <Input
                  type="text"
                  name="nameOfVan"
                  value={formData.nameOfVan}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Upload Image:</FormLabel>
                <Input
                  type="file"
                  name="imageofrider"
                  onChange={handleImageChange}
                />
              </FormControl>
              <Button  mt={4} colorScheme="teal" onClick={handleSubmit} w="100%">
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
};
export default CreateRider;
