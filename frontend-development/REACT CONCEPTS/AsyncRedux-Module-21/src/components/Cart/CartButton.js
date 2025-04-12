import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { toggleCart } from "../../store/NavBarslice.js";

const CartButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(toggleCart());
      }}
      className={classes.button}
    >
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
