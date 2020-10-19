
export const cartDetailReducer = (state={cartItems:[]},action)=>{
  switch (action.type) {
    case "CART_DETAIL_REQUEST":
      return { loading: true, cartItems:[] };
    case "CART_DETAIL_SUCCESS":
      return { loading: false, success:true,cartItems:action.payload};

    case "CART_DETAIL_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const addToCartReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TO_CART_REQUEST":
      return { loading: true };
    case "ADD_TO_CART_SUCCESS":
      return { loading: false, success:true,addedProduct:action.payload};

    case "ADD_TO_CART_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
