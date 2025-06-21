import { cartActions } from "./cart-slice.js";
import { uiSliceAction } from "./ui-slice.js";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://new-project-dfad9-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const resData = response.json();
      console.log(resData);
      return resData;
    };

    try {
      const cartData = await fetchData();
      console.log(cartData);
      dispatch(
        cartActions.replaceCartItems({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiSliceAction.showNotification({
          status: "error",
          title: "An Error Occured",
          message: error.mesage || "Failed to fetch Data from Fire",
        })
      );
    }
  };
};

// thunk action creator function
export const sendCartData = (cart) => {
  //thunk function
  return async (dispatch) => {
    dispatch(
      uiSliceAction.showNotification({
        status: "pending",
        title: "Fetching data",
        message: "Please wait.....",
      })
    );

    const sendFetch = async () => {
      const response = await fetch(
        "https://new-project-dfad9-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) },
        [cart]
      );
      if (!response.ok) {
        throw new Error("Failed to send data");
      }
    };

    try {
      await sendFetch();
      dispatch(
        uiSliceAction.showNotification({
          status: "successful!",
          title: "Successfully",
          message: "The data has been successfully fetched",
        })
      );
    } catch (error) {
      dispatch(
        uiSliceAction.showNotification({
          status: "error",
          title: "An Error Occured",
          message: error.message || "Failed to send Data to Fire",
        })
      );
    }
  };
};
