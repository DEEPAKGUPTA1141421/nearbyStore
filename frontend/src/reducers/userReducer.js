import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS
} from "../constants/userConstant";

const userInitialState = {
  user: {},
  isAuthenticated: false
};

export const userReducer = (state = userInitialState, action) => {
  if(action.type===LOGOUT_USER_REQUEST){
    return {
      ...state
    }
  }
  if(action.type===LOGOUT_USER_SUCCESS){
    return {
      ...state,
      isAuthenticated:false,
      user:action.user
    }
  }
  if(action.type===LOAD_USER_SUCCESS){
    return {
      ...state,
      user: action.user,
      isAuthenticated: true
    };
  }
  if(action.type===LOAD_USER_FAIL){
    return {
      ...state,
      user: null,
      isAuthenticated: false
    };
  }
  if(action.type===LOGIN_USER_REQUEST){
    return {
      ...state
    }
  }
  if (action.type === LOGIN_USER_SUCCESS){
    //localStorage.setItem("user", JSON.stringify(action.user))
    console.log(state);
    console.log(action.user);
    return {
      ...state,
      user: action.user,
      isAuthenticated: true
    };
  } else if (action.type === LOGIN_USER_FAIL) {
    return {
      ...state,
      user: null,
      isAuthenticated: false
    };
  } 
  else {
    return {
      ...state
    };
  }
};
