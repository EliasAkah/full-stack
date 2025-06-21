import { useContext } from "react";
import CreateItem from "./CreateItem.jsx";

import { cartContext } from "./store/cartContext.jsx";
import { currencyFormatter } from "../util/currencyFormatter.js";
import Button from "./UI/Button.jsx";
import Modal from "./UI/Modal.jsx";
import userProgressContext from "./store/UserProgressContext.jsx";

export default function Cart() {
  const cartCtx = useContext(cartContext);
  const userProgressCtx = useContext(userProgressContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckOut() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CreateItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            increaseItem={() => cartCtx.addItem(item)}
            decreaseItem={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckOut}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
