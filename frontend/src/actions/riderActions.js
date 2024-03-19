import axios from'axios';
import { CREATE_RIDER_REQUEST,CREATE_RIDER_SUCCESS,CREATE_RIDER_FAIL } from '../constants/userConstant';
import {server} from "../FixedUrl";
import {toast} from "react-toastify";

export const createRider = (formData) => async(dispatch) =>{
    try{
        dispatch({type:CREATE_RIDER_REQUEST});
        const currformdata=new FormData();
        for (const key in formData) {
            currformdata.append(key,formData[key]);
          }
        const { data } = await axios.post(`${server}/rider/create`,currformdata);
        console.log("data",data);
        if(data.success){
            toast.success("Rider Created SuccessFuLLY");
            console.log("5");
            dispatch({type:CREATE_RIDER_SUCCESS,cartitem:data.rider});
        }
        else{
            console.log("6");
            console.log("unsuccessfull");
            toast.error("Rider Not Created SuccessFuLLY");
            dispatch({type:CREATE_RIDER_FAIL});
        }
    }
    catch(err){
        console.log("inside cartitem",err.message);
        dispatch({type:CREATE_RIDER_FAIL});
    }

}