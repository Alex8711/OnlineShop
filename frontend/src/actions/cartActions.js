import axios from 'axios';
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
console.log(userInfoFromLocalStorage);





export const getCartDetail = () => {
    return async (dispatch,getState) => {
      try {
        dispatch({ type: "CART_DETAIL_REQUEST" });
        const {
            userLogin: { userInfo },
          } = getState();
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
        const { data } = await axios.get(`/api/users/cart`,config);
        dispatch({
          type: "CART_DETAIL_SUCCESS",
          payload: data.cart,
        });
      } catch (error) {
        dispatch({
          type: "CART_DETAIL_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.response,
        });
      }
    };
  };

  export const addToCart = (addInfo) =>{
    return async (dispatch,getState)=>{
        try {
            dispatch({
                type: "ADD_TO_CART_REQUEST", 
              });
              const {
                userLogin: { userInfo },
              } = getState();
              const config = {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${userInfo.token}`,
                },
              };
             const{data} = await axios.post(`/api/users/cart`,addInfo, config);
        
              dispatch({
                type: "ADD_TO_CART_SUCCESS",
                payload: data
              });
        } catch (error) {
            dispatch({
                type: "ADD_TO_CART_FAIL",
                payload:
                  error.response && error.response.data.message
                    ? error.response.data.message
                    : error.response,
              });
        }
    
  }
}