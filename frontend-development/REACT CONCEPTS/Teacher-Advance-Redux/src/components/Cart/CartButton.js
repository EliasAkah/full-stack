import { useDispatch } from "react-redux";

import classes from "./CartButton.module.css";
import { uiSliceAction } from "../../store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();

  function handleToggle() {
    dispatch(uiSliceAction.toggle());
  }
  return (
    <button className={classes.button} onClick={handleToggle}>
      <span>My Cart</span>
      <span className={classes.badge}>{props.cartTotalQuantity}</span>
    </button>
  );
};

export default CartButton;
