import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../../store/shoppingSlice.js";
const CartItem = (props) => {
  const items = useSelector((state) => state.shopCart.items);

  const dispatch = useDispatch();

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} className={classes.item}>
          <header>
            <h3>{item.title}</h3>
            <div className={classes.price}>
              ${item.total.toFixed(2)}{" "}
              <span className={classes.itemprice}>
                (${item.price.toFixed(2)}/item)
              </span>
            </div>
          </header>
          <div className={classes.details}>
            <div className={classes.quantity}>
              x <span>{item.quantity}</span>
            </div>
            <div className={classes.actions}>
              <button
                onClick={() => {
                  dispatch(decreaseItemQuantity(item.id));
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  dispatch(increaseItemQuantity(item.id));
                }}
              >
                +
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CartItem;
