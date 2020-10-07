import { combineReducers } from "redux";
import { productListReducer, productReducer } from "./productReducers";

const rootReducers = combineReducers({
  productList: productListReducer,
  product: productReducer,
});

export default rootReducers;
