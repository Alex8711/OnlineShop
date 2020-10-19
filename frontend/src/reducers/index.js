import { combineReducers } from "redux";
import { productListReducer, productDetailReducer,productDeleteReducer,productCreateReducer } from "./productReducers";
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
  productDetail: productDetailReducer,
  productDelete:productDeleteReducer,
  productCreate:productCreateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete:userDeleteReducer
});

export default rootReducers;
