import { LOAD_CART_FAIL,LOAD_CART_REQUEST,LOAD_CART_SUCCESS } from "../constants/CartConstants"
  const riderInitialState = {
    cartitem: {},
    loading:false

    
  };
  export const riderReducer = (state = riderInitialState, action) => {
    if (action.type === LOAD_CART_SUCCESS){
      console.log(state);
      console.log(action.user);
      return {
        ...state,
        cartitem: action.cartitem,
        loading:true
      };
    } else if (action.type === LOAD_CART_REQUEST) {
      return {
        ...state,
        loading:false
      };
    } else if(action.type===LOAD_CART_FAIL){
      return {
        ...state,
        cartitem:{},
        loading:false
      };
    }
    else{
      return {
        ...state
      }
    }
  };
  