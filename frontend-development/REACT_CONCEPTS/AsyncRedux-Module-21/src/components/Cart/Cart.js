import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "../../store/shoppingSlice.js";

const Cart = (props) => {
  const productState = useSelector((state) => state.product);
  const navStatus = useSelector((state) => state.nav);
  return (
    <>
      {navStatus && (
        <Card className={classes.cart}>
          <h2>Your Shopping Cart</h2>
          <ul>
            <CartItem
              item={productState}
              decreaseItemQuantity={decreaseItemQuantity}
              increaseItemQuantity={increaseItemQuantity}
            />
          </ul>
        </Card>
      )}
    </>
  );
};

export default Cart;
