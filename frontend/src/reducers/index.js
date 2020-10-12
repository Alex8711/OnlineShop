import { combineReducers } from "redux";
import { productListReducer, productReducer } from "./productReducers";
import { userLoginReducer } from "./userReducers";

const rootReducers = combineReducers({
  productList: productListReducer,
  product: productReducer,
  userLogin: userLoginReducer,
});

export default rootReducers;
