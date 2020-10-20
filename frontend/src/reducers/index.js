import { combineReducers } from "redux";
import { productListReducer, productDetailReducer,productDeleteReducer,productCreateReducer,productUpdateReducer } from "./productReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer
} from "./userReducers";

import {addToCartReducer,cartDetailReducer,removeFromCartReducer} from './cartReducers'

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
  userDelete:userDeleteReducer,
  productUpdate:productUpdateReducer,
  addToCart:addToCartReducer,
  cartDetail:cartDetailReducer,
  removeFromCart:removeFromCartReducer
});

export default rootReducers;
