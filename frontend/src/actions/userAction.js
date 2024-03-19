import axios from'axios';
import {LOGIN_USER_REQUEST, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS,
LOAD_USER_FAIL,
LOAD_USER_SUCCESS,
LOAD_USER_REQUEST,
LOGOUT_USER_FAIL,
LOGOUT_USER_REQUEST,
LOGOUT_USER_SUCCESS
} from "../constants/userConstant";
import {server} from "../FixedUrl";
import {toast} from "react-toastify";

export const login = (email,password) => async(dispatch) =>{

    try{
        console.log("1");
        dispatch({type:LOGIN_USER_REQUEST});
        const formData = new FormData();
        formData.append("email",email);
        formData.append("password",password);
        console.log("2");
        const axiosConfig = {
            withCredentials: true, // Store cookies
            // ContentType: 'application/data' // Handle application/data responses
          };
          console.log("3");
        const {data} = await axios.post(`${server}/user/login`,formData,axiosConfig);
        console.log("hello",data);
        console.log("4");
        if(data.success){
            console.log("5");
            toast.success("Login SuccessFul");
            dispatch({type:LOGIN_USER_SUCCESS,user:data.user});
        }
        else{
            console.log("6");
            console.log("unsuccessfull");
            toast.error("Login unSuccessFul");
            dispatch({type:LOGIN_USER_FAIL});
        }
    }
    catch(err){
        toast.error(err.message);
        dispatch({type:LOGIN_USER_FAIL});
    }

}
export const loaduser = () => async(dispatch) =>{

    try{
        console.log("loaduser");
        dispatch({type:LOAD_USER_REQUEST});
        const axiosConfig = {
            withCredentials: true, // Store cookies
            // ContentType: 'application/data' // Handle application/data responses
          };
          console.log("3");
        const {data} = await axios.get(`${server}/user/loaduser`,axiosConfig);
        console.log("hello",data);
        console.log("4");
        if(data.success){
            console.log("5");
            dispatch({type:LOAD_USER_SUCCESS,user:data.user});
        }
        else{
            console.log("6");
            console.log("unsuccessfull");
            dispatch({type:LOAD_USER_FAIL});
        }
    }
    catch(err){
        dispatch({type:LOAD_USER_FAIL});
    }

}
export const logout = () => async(dispatch) =>{

    try{
        console.log("1");
        dispatch({type:LOGOUT_USER_REQUEST});
        console.log("2");
        const axiosConfig = {
            withCredentials: true, // Store cookies
            // ContentType: 'application/data' // Handle application/data responses
          };
          console.log("3");
        const {data} = await axios.delete(`${server}/user/logout`,axiosConfig);
        console.log("hello",data);
        console.log("4");
        if(data.success){
            console.log("5");
            dispatch({type:LOGOUT_USER_SUCCESS,user:{}});
        }
        else{
            console.log("6");
            console.log("unsuccessfull");
            dispatch({type:LOGOUT_USER_FAIL});
        }
    }
    catch(err){
        dispatch({type:LOGOUT_USER_FAIL});
    }

}