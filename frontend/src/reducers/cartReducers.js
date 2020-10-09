export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const itemAdded = action.payload;
      const existItem = state.cartItems.find(
        (item) => item.product === itemAdded.product
      );
      //needs to some work here
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === existItem.product ? existItem : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, itemAdded],
        };
      }
    default:
      break;
  }
};
