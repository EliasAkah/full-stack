import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import Input from "./UI/Input.jsx";
import { currencyFormatter } from "../util/currencyFormatter.js";
import { cartContext } from "./store/cartContext.jsx";
import userProgressContext from "./store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";
import useHttp from "./useHttp.jsx";
import { useActionState } from "react";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function CheckOut() {
  const cartCtx = useContext(cartContext);
  const userProgressCtx = useContext(userProgressContext);
  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig,
    []
  );

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  const [formState, formAction, isLoading] = useActionState(
    checkoutAction,
    null
  );

  let action = (
    <>
      <Button textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button type="button">Submit Order</Button>
    </>
  );

  if (isLoading) {
    action = <p>Submitting Form...</p>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully!</p>
        <p>
          We will get back to you with more details vial email within the next
          few minutes
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Close</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
        <Input type="text" id="name" label="Full Name" />
        <Input type="email" id="email" label="E-Mail Address" />
        <Input type="text" id="street" label="Street" />

        <div className="control-row">
          <Input type="number" id="postal-code" label="Postal Code" />
          <Input type="text" id="city" label="city" />
        </div>
        {error && <Error title="Failed to Submit Form" message={error} />}
        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}

//by default the form is submitted to a given url not specified by us each time the submit button is pressed .
//To prevent the default behaviour of the form and force the form to behave as we want it to.
//we use the preventDefault() method of the event object passed to the event handler function.
