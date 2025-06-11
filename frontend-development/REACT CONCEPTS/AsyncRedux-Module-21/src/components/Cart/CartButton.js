import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../store/NavBarslice.js";

const CartButton = () => {
  const cartState = useSelector((state) => state.shopCart);

  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        dispatch(toggleCart());
      }}
      className={classes.button}
    >
      <span>My Cart</span>
      <span className={classes.badge}>{cartState.items.length}</span>
    </button>
  );
};

export default CartButton;
