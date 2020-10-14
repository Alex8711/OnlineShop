import { combineReducers } from "redux";
import { productListReducer, productReducer } from "./productReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./userReducers";

const rootReducers = combineReducers({
  productList: productListReducer,
  product: productReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

export default rootReducers;
