export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { loading: true, products: [] };
    case "PRODUCT_LIST_SUCCESS":
      return { loading: false, products: action.payload };

    case "PRODUCT_LIST_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case "GET_PRODUCT_REQUEST":
      return { loading: true, product: {} };
    case "GET_PRODUCT_SUCCESS":
      return { loading: false, product: action.payload };

    case "GET_PRODUCT_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_DELETE_REQUEST":
      return { loading: true };
    case "PRODUCT_DELETE_SUCCESS":
      return { loading: false, success:true};

    case "PRODUCT_DELETE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_CREATE_REQUEST":
      return { loading: true };
    case "PRODUCT_CREATE_SUCCESS":
      return { loading: false, success:true,product:action.payload};

    case "PRODUCT_CREATE_FAIL":
      return { loading: false, error: action.payload };
      case "PRODUCT_CREATE_RESET":
        return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_Update_REQUEST":
      return { loading: true };
    case "PRODUCT_Update_SUCCESS":
      return { loading: false, success:true,product:action.payload};

    case "PRODUCT_Update_FAIL":
      return { loading: false, error: action.payload };
      case "PRODUCT_Update_RESET":
        return {};
    default:
      return state;
  }
};