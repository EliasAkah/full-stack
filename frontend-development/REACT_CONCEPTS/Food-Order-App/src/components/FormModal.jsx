import { useImperativeHandle, useRef, useContext } from "react";

import Form from "./Form.jsx";
import StatusModal from "./StatusModal.jsx";
import { FoodDetailContext } from "../store/Modifiy-Data";

export default function FormModal({ ref, handleFormClose, totalCost }) {
  const { itemList, populateOrders, setItemList } =
    useContext(FoodDetailContext);

  const formDialogRef = useRef();
  const statusRef = useRef();

  useImperativeHandle(
    ref,
    () => {
      return {
        open() {
          formDialogRef.current.showModal();
        },
        close() {
          formDialogRef.current.close();
        },
      };
    },
    []
  );

  function openStatusModal() {
    console.log("Opening status modal...", statusRef.current); // Debugging line
    statusRef.current?.openStatus();
  }

  function closeStatusModal() {
    statusRef.current?.closeStatus();
    setItemList([]);
  }

  return (
    <>
      <StatusModal
        ref={statusRef}
        closeStatus={closeStatusModal}
        handleFormClose={handleFormClose}
      />

      <dialog className="modal cart" ref={formDialogRef} onClose={handleFormClose}>
        <Form
          closeStatusModal={closeStatusModal}
          openStatusModal={openStatusModal}
          handleFormClose={handleFormClose}
          totalCost={totalCost}
        />
      </dialog>
    </>
  );
}
