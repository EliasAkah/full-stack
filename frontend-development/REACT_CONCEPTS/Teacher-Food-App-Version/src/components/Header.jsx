import { useContext } from "react";

import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import { cartContext } from "./store/cartContext.jsx";
import userProgressContext from "./store/UserProgressContext.jsx";

export default function Header() {
  const cartCtxt = useContext(cartContext);
  const userProgressCtx = useContext(userProgressContext);

  const totalCartItems = cartCtxt.items.reduce((totalNumberOfItems, item) => {
    return (totalNumberOfItems = totalNumberOfItems + item.quantity);
  }, 0);

  function openCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A Restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={openCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}

//writing textOnly as a prop in the Button component is assigned "true" as prop value by react.
