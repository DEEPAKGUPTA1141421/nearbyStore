import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction.js";
import { toast } from 'react-toastify';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const navigate=useNavigate();
  const u=useSelector((state)=>state.userreducer);
  const {isAuthenticated}=u;
  console.log(u);
  useEffect(()=>{
    if(isAuthenticated){
      navigate("/");
      return;
    }
    if(u.user!=undefined){
      setUser(u.user);
      navigate("/");
    }

  },[isAuthenticated]);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="body">
      <div className="center-div">
        <div className="heading">
          <h2>Login to your account</h2>
        </div>
        <div className="content">
          <div>
            <label>Email address</label>
            <br />
            <input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
          </div>
          <div>
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="options">
            <div className="checkbox-container">
              <input type="checkbox" className="checkbox" />
              <span>Remember me</span>
            </div>

            <div>
              <a>Forgot your password?</a>
            </div>
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>

          <p>
            Not have any account?{" "}
            <Link to="/sign-up">
              <span className="sign-up">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
