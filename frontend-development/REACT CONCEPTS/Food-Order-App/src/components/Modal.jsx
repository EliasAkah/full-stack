// import ORDERS from "../../backend/data/orders.json";
import FormModal from "./FormModal.jsx";
import { useImperativeHandle, useRef, useState } from "react";

export default function Modal({ ref, onClose }) {
  const [openForm, setOpenForm] = useState(false);
  const modalRef = useRef();
  const formRef = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          modalRef.current.showModal();
        },
        close() {
          modalRef.current.close();
        },
      };
    },
    []
  );

  function handleOpenForm() {
    onClose();
    setOpenForm(true);
    setTimeout(() => {
      formRef.current?.open();
    }, 0);
  }

  function handleFormClose() {
    formRef.current.close();
    setOpenForm(false);
  }

  return (
    <>
      {openForm && (
        <FormModal ref={formRef} handleFormClose={handleFormClose} />
      )}
      <dialog ref={modalRef} onClose={onClose}>
        <h3>Your Cart</h3>
        <ul>
          <li>order one details from ORDERS ARRAY</li>
          <li>order two details from ORDERS ARRAY</li>
          <li>order three details from ORDERS ARRAY</li>
        </ul>
        <p>$89.95</p>
        <div>
          <button onClick={onClose}>Close</button>
          <button onClick={handleOpenForm}>Go to Checkout</button>
        </div>
      </dialog>
    </>
  );
}
