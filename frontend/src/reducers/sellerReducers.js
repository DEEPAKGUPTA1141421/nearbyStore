import { GET_ALL_SHOP_OF_CITY_FAIL, GET_ALL_SHOP_OF_CITY_REQUEST, GET_ALL_SHOP_OF_CITY_SUCCESS } from "../constants/CartConstants";
import { LOAD_PRODUCT_SELLER_FAIL,LOAD_PRODUCT_SELLER_REQUEST,LOAD_PRODUCT_SELLER_SUCCESS, LOAD_SHOP_SUCCESS,
  LOAD_SHOP_FAIL,
  LOAD_SHOP_REQUEST 
} from "../constants/userConstant";
  const sellerInitialState = {
    productList: {},
    hasProduct:false,
    shop:{},
    loadshop:false,
    shoplist:{},
    getallshopofcity:false
  };
  export const sellerReducer = (state = sellerInitialState, action) => {
    if (action.type === LOAD_PRODUCT_SELLER_SUCCESS){
      console.log(state);
      return {
        ...state,
        productList: action.payload,
        hasProduct:action.hasProduct
      };
    }
    else if(action.type===GET_ALL_SHOP_OF_CITY_REQUEST){
      return {
        ...state
      }
    }
    else if(action.type===GET_ALL_SHOP_OF_CITY_SUCCESS){
      return {
        ...state,
        shoplist:action.payload,
        getallshopofcity:action.getallshopofcity
      }
    }
    else if(action.type===GET_ALL_SHOP_OF_CITY_FAIL){
      return {
        ...state,
        getallshopofcity:action.getallshopofcity
      }
    }
    else if(action.type===LOAD_SHOP_SUCCESS){
    return {
      ...state,
      loadshop:true,
      shop:action.payload
    }
    }
    else if(action.type===LOAD_SHOP_REQUEST){
      return{
        ...state
      }
    }
    else if(action.type===LOAD_SHOP_FAIL){
      return {
        ...state,
        loadshop:false,
        shop:{}
      }
    }
    else if (action.type === LOAD_PRODUCT_SELLER_REQUEST) {
      return {
        ...state,
        hasProduct:false
      };
    } else if(action.type===LOAD_PRODUCT_SELLER_FAIL){
      return {
        ...state,
        productList:{},
        hasProduct:false
      };
    }
    else{
        return {
            ...state
        }
    }
};
  