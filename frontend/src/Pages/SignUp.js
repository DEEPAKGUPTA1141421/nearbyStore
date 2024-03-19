import React, { useState } from "react";
import "./styles/SignUp.css";
import { Link } from "react-router-dom";
import hidepng from '../images/hide.png';
import showpng from '../images/show.png';
import { server } from "../FixedUrl";
import axios from "axios";
import { toast } from 'react-toastify';
function SignUp() {
  const [passwordLength, setPasswordLength] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const[image,setImage]=useState(null);

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
      setAvatar(null);
      console.log("file uploaded failed");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password||!avatar) return;

    const formdata = new FormData();
    formdata.append("avatar", avatar);
    formdata.append("name",name);
    formdata.append("email", email);
    formdata.append("password", password);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const { data } = await axios.post(`${server}/user/signup`, formdata, config);
      console.log("user", data.user);
      toast.success(data.message);
    } catch (err) {
      console.log("err", err);
      toast(err.message);
    }
  };

  return (
    <div className="body">
      <div className="center-div">
        <div className="heading">
          <h2>Register as a new user</h2>
        </div>
        <div className="content" style={{position: "relative",
  top: "15rem"}}>
          <div>
            <label>Full name</label>
            <br />
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" type="text" required />
            <br />
          </div>

          <div>
            <label>Email address</label>
            <br />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
            <br />
          </div>

          <div>
            <label>Password</label>
            <br />
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => handlePassword(e)}
              required
            />
            {showPassword ? <span onClick={handlePaswordVisible}><img src={showpng} alt="showpng" /></span> : <span onClick={handlePaswordVisible}><img src={hidepng} alt="hidepng" /></span>}
            {passwordLength && <i className="error">Minimum 8 characters allowed</i>}
          </div>

          <div className="profile">
            <div className="user-logo">
              {avatar !== null ? <img src={avatar} alt="User Avatar" /> : <i className="fa-solid fa-user"></i>}
            </div>
            <div>
              <input type="file" name="file"  onChange={handleAvatarChange} />
            </div>
            <div>
              <i className="avatar">Upload your avatar</i>
            </div>
          </div>
          <button  onClick={handleSubmit} className="submit-btn">Submit</button>
          <p>
            Already have an account?
            <Link to="/login">
              <span className="sign-in">Sign in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
