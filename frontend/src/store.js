import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./reducers/userReducer";
import {thunk} from "redux-thunk"; // Correct import statement
import { cartReducer } from "./reducers/cartReducers";
import { sellerReducer } from "./reducers/sellerReducers";

const rootReducer = combineReducers({
  userreducer: userReducer,
  cartreducer:cartReducer,
  sellerreducer:sellerReducer
});

const middleware = [thunk];
const store = createStore(
  rootReducer, // use the rootReducer instead of the persistedReducer
  applyMiddleware(...middleware)
);

export { store }; // remove the export of persistor
