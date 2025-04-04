import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import Input from "./UI/Input.jsx";
import { currencyFormatter } from "../util/currencyFormatter.js";
import { cartContext } from "./store/cartContext.jsx";
import userProgressContext from "./store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";

export default function CheckOut() {
  const cartCtx = useContext(cartContext);
  const userProgressCtx = useContext(userProgressContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  console.log(userProgressCtx.progress);
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
        <Input type="text" id="full-name" label="Full Name" />
        <Input type="email" id="email" label="E-Mail Address" />
        <Input type="text" id="street" label="Street" />

        <div className="control-row">
          <Input type="number" id="postal-code" label="Postal Code" />
          <Input type="text" id="city" label="city" />
        </div>

        <p className="modal-actions">
          <Button textOnly onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button type="button">Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
