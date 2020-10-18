import { combineReducers } from "redux";
import { productListReducer, productReducer } from "./productReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer
} from "./userReducers";

const rootReducers = combineReducers({
  productList: productListReducer,
  product: productReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete:userDeleteReducer
});

export default rootReducers;
