import axios from 'axios';
import { LOAD_CART_FAIL, LOAD_CART_REQUEST, LOAD_CART_SUCCESS, SET_CART_FAIL, SET_CART_REQUEST, SET_CART_SUCCESS,
ADD_TO_CART_FAIL,
ADD_TO_CART_REQUEST,
ADD_TO_CART_SUCCESS,
INCREASE_PRODUCT_COUNT_FAIL,
INCREASE_PRODUCT_COUNT_REQUEST,
INCREASE_PRODUCT_COUNT_SUCCESS,
DECREASE_PRODUCT_COUNT_FAIL,
DECREASE_PRODUCT_COUNT_REQUEST,
DECREASE_PRODUCT_COUNT_SUCCESS
} from '../constants/CartConstants';
import { server } from "../FixedUrl";
import{toast} from "react-toastify";

export const loadcartitem = () => async(dispatch) => {
    try {
        const axiosConfig = {
            withCredentials: true,
        };
        dispatch({ type: LOAD_CART_REQUEST });
        const { data } = await axios.get(`${server}/user/cartitems`, axiosConfig);
        if (data.success) {
            dispatch({ type: LOAD_CART_SUCCESS, cartitem: data.cartItems });
        } else {
            dispatch({ type: LOAD_CART_FAIL });
        }
    } catch(err) {
        console.log("Error while loading cart items:", err.message);
        dispatch({ type: LOAD_CART_FAIL });
    }
}

export const setcartitem = (cartitem) => async(dispatch) => {
    try {
        dispatch({ type: SET_CART_REQUEST });
        dispatch({ type: SET_CART_SUCCESS, cartitem: cartitem });
    } catch(err) {
        console.log("Error while setting cart items:", err.message);
        dispatch({ type: SET_CART_FAIL });
    }
}

export const increasecount = (p) => async(dispatch) => {
    try {
        dispatch({ type: INCREASE_PRODUCT_COUNT_REQUEST});
        dispatch({ type: INCREASE_PRODUCT_COUNT_SUCCESS,product:p});
    } catch(err) {
        console.log("Error while setting cart items:", err.message);
        dispatch({ type: INCREASE_PRODUCT_COUNT_FAIL });
    }
}
export const decreasecount = (p) => async(dispatch) => {
    try {
        dispatch({ type: DECREASE_PRODUCT_COUNT_REQUEST});
        dispatch({ type: DECREASE_PRODUCT_COUNT_SUCCESS,product:p});
    } catch(err) {
        console.log("Error while setting cart items:", err.message);
        dispatch({ type: DECREASE_PRODUCT_COUNT_FAIL });
    }
}