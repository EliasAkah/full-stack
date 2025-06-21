import { useRef, useContext, useEffect } from "react";
import { createPortal } from "react-dom";

import logo from "../assets/logo.jpg";
import Modal from "./Modal.jsx";
import { FoodDetailContext } from "../store/Modifiy-Data.jsx";

export default function Navigation() {
  const cartRef = useRef();
  const { moveListToClient, itemList, setItemList } =
    useContext(FoodDetailContext);
  function openModal() {
    moveListToClient();
    cartRef.current.open();
  }

  function closeModal() {
    cartRef.current.close();
  }

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("http://localhost:3000/items");

        if (!response.ok) throw new Error("couldn't fetch data");

        const items = await response.json();
        console.log(items);
        setItemList(items);
      } catch (error) {
        console.error("Error fetching items", error);
      }
    }
    fetchItems();
  }, [setItemList]);

  return (
    <nav id="main-header">
      <div id="title">
        <img src={logo} alt="order" />
        <h1>ReactFood</h1>
      </div>
      <button className = "text-button" onClick={openModal}>
        Cart<span> ({itemList?.length}) </span>
      </button>
      {createPortal(
        <Modal ref={cartRef} onClose={closeModal} />,
        document.getElementById("modal")
      )}
    </nav>
  );
}

//use stateUpdating function as a depency within the useEffect() hook any time it is received
//as a prop, or context value.
