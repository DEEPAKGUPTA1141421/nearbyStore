import { LOAD_CART_FAIL,LOAD_CART_REQUEST,LOAD_CART_SUCCESS,
  INCREASE_PRODUCT_COUNT_FAIL,
  INCREASE_PRODUCT_COUNT_REQUEST,
  INCREASE_PRODUCT_COUNT_SUCCESS,
  DECREASE_PRODUCT_COUNT_REQUEST,
  DECREASE_PRODUCT_COUNT_FAIL,
  DECREASE_PRODUCT_COUNT_SUCCESS
} from "../constants/CartConstants"
  const cartInitialState = {
    cartitem: {},
    loading:false,
    addtocart:false,
    cartitemqty:[]
  };
  
  export const cartReducer = (state = cartInitialState, action) => {
    if (action.type === LOAD_CART_SUCCESS){
      console.log(state);
      console.log(action.user);
      const newarr=[];
      for(let i=0;i<action.cartitem.length;i++){
        newarr.push({productId:action.cartitem[i].productId._id,count:1});
      }
      return {
        ...state,
        cartitem: action.cartitem,
        loading:true,
        cartitemqty:newarr
      };
    } 
    else if(action.type===INCREASE_PRODUCT_COUNT_REQUEST||action.type===DECREASE_PRODUCT_COUNT_REQUEST){
      return {
        ...state
      }
    }
    else if(action.type===INCREASE_PRODUCT_COUNT_SUCCESS){
      let newcartitemqty=[];
      let arr=state.cartitemqty;
      for(let i=0;i<arr.length;i++){
        if(arr[i].productId===action.product){
          let obj={productId:arr[i].productId,count:arr[i].count+1};
          newcartitemqty.push(obj);
        }
        else{
          newcartitemqty.push(arr[i]);
        }
      }
      return {
        ...state,
        cartitemqty:newcartitemqty
      }
    }
    else if(action.type===DECREASE_PRODUCT_COUNT_SUCCESS){
      let newcartitemqty=[];
      let arr=state.cartitemqty;
      for(let i=0;i<arr.length;i++){
        if(arr[i].productId===action.product){
          if(arr[i].count==1){
            let obj={productId:arr[i].productId,count:arr[i].count};
             newcartitemqty.push(obj);
          }
          else{
            let obj={productId:arr[i].productId,count:arr[i].count-1};
             newcartitemqty.push(obj);
          }
        }
        else{
          newcartitemqty.push(arr[i]);
        }
      }
      return {
        ...state,
        cartitemqty:newcartitemqty
      }
    }
    else if(action.type=INCREASE_PRODUCT_COUNT_FAIL||action.type===DECREASE_PRODUCT_COUNT_FAIL){
      return {
        ...state
      }
    }
    else if (action.type === LOAD_CART_REQUEST) {
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
      return{
        ...state
      }
    }
  };
  