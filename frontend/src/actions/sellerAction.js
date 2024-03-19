import axios from 'axios';
import { LOAD_PRODUCT_SELLER_FAIL, LOAD_PRODUCT_SELLER_REQUEST, LOAD_PRODUCT_SELLER_SUCCESS,
LOAD_SHOP_FAIL,
LOAD_SHOP_REQUEST,
LOAD_SHOP_SUCCESS,
} from '../constants/userConstant';
import {
    GET_ALL_SHOP_OF_CITY_REQUEST,
GET_ALL_SHOP_OF_CITY_SUCCESS,
GET_ALL_SHOP_OF_CITY_FAIL
} from "../constants/CartConstants";
import { server } from "../FixedUrl";
import { toast } from "react-toastify";
export const loadProductOfAShopitem = () => async(dispatch) => {
    try {
        dispatch({ type: LOAD_PRODUCT_SELLER_REQUEST });
        const axiosConfig = {
            withCredentials: true
        };
        const { data } = await axios.get(`${server}/shop/getAllProduct`, axiosConfig);
        if (data.success) {
            toast.success(data.message);
            dispatch({ type: LOAD_PRODUCT_SELLER_SUCCESS, payload: data.productToReturn, hasProduct: true });
        } else {
            dispatch({ type: LOAD_PRODUCT_SELLER_FAIL, hasProduct: false });
        }
    } catch(error) {
        console.log("Error while loading seller products:", error.message);
        toast.error(error.message);
        dispatch({ type: LOAD_PRODUCT_SELLER_FAIL, hasProduct: false });
    }
}
export const loadShop = () => async(dispatch) => {
    try {
        dispatch({ type: LOAD_SHOP_REQUEST });
        const axiosConfig = {
            withCredentials: true
        };
        const { data } = await axios.get(`${server}/shop/get`, axiosConfig);
        console.log("data for shop",data);
        if (data.success) {
            toast.success(data.message);
            dispatch({ type:LOAD_SHOP_SUCCESS, payload: data.shop,loadshop:true});
        } else {
            dispatch({ type: LOAD_SHOP_FAIL,loadshop:false});
        }
    } catch(error) {
        console.log("Error while loading seller products:", error.message);
        toast.error(error.message);
        dispatch({ type: LOAD_SHOP_FAIL,loadshop:false});
        
    }
}

export const getallShopofcity = (city) => async(dispatch) => {
    try {
        dispatch({ type: GET_ALL_SHOP_OF_CITY_REQUEST });
        const axiosConfig = {
            withCredentials: true
        };
        const { data } = await axios.get(`${server}/shop/getallshopofcity/${city}`);
        console.log("data for shop",data);
        if (data.success) {
            toast.success(data.message);
            dispatch({ type:GET_ALL_SHOP_OF_CITY_SUCCESS, payload: data.shoplist,getallshopofcity:true});
        } else {
            dispatch({ type: GET_ALL_SHOP_OF_CITY_FAIL,getallshopofcity:false});
        }
    } catch(error) {
        console.log("Error while loading seller products:", error.message);
        toast.error(error.message);
        dispatch({ type: GET_ALL_SHOP_OF_CITY_FAIL,getallshopofcity:false});     
    }
}



