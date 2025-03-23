import { useImperativeHandle, useRef, useState } from "react";

import Form from "./Form.jsx";
import StatusModal from "./StatusModal.jsx";

export default function FormModal({ ref, handleFormClose }) {
  const formDialogRef = useRef();
  const statusRef = useRef();
  const [openStatus, setOpenStatus] = useState(false);

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
    setOpenStatus(true);
    setTimeout(() => {
      handleFormClose();
      statusRef.current?.openStatus();
    }, 2000);

    
  }

  function closeStatusModal() {
    statusRef.current?.closeStatus();
    setOpenStatus(false);
  }

  return (
    <>
      {openStatus && (
        <StatusModal
          ref={statusRef}
          closeStatus={closeStatusModal}
          handleFormClose={handleFormClose}
        />
      )}
      <dialog ref={formDialogRef} onClose={handleFormClose}>
        <Form
          closeStatusModal={closeStatusModal}
          openStatusModal={openStatusModal}
          handleFormClose={handleFormClose}
        />
      </dialog>
    </>
  );
}
