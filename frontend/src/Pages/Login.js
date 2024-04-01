import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction.js";
import { toast } from 'react-toastify';
import { Box, Image, Text, Button, Icon,Heading,Input,Checkbox } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import BackIcon from "../BackIcon.js";
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
    <>
    <BackIcon/>
    <Box style={{ margin: 'auto', width: 'fit-content', textAlign: 'center' }}>
      <Box>
        <Heading as="h2">Login to your account</Heading>
      </Box>
      <Box>
        <Box>
          <label>Email address</label>
          <br />
          <Input
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
        </Box>
        <Box>
          <label>Password</label>
          <br />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>

        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
          <Box>
            <Checkbox />
            <span style={{ marginLeft: '0.5rem' }}>Remember me</span>
          </Box>

          <Box>
            <Link>Forgot your password?</Link>
          </Box>
        </Box>

        <Button
          style={{ marginTop: '1rem', backgroundColor: 'blue', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
          onClick={handleSubmit}
        >
          Submit
        </Button>

        <Box style={{ marginTop: '1rem' }}>
          Not have any account?{' '}
          <Link as={RouterLink} to="/sign-up" style={{ color: 'blue' }}>
            Sign up
          </Link>
        </Box>
      </Box>
    </Box>
    </>
  );
}

export default Login;
