import { useRef } from "react";
import logo from "../assets/logo.jpg";
import Modal from "./Modal.jsx"
export default function Navigation() {
    const cartRef = useRef()

    function openModal(){
        cartRef.current.open();
    }

    function closeModal(){
        cartRef.current.close();
    }
  return (
    <nav id="main-header">
      <div id="title">
        <img src={logo} alt="order" />
        <h1>ReactFood</h1>
      </div>
      <button  className = "text-button" onClick = {openModal}>
        Cart<span>{/*dynamically enters the number of selected meals*/}</span>
      </button>
      <Modal ref = {cartRef} onClose = {closeModal} />
    </nav>
  );
}
