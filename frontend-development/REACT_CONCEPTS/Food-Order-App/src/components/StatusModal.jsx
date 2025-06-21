import { useImperativeHandle, useRef, useEffect } from "react";

export default function StatusModal({ ref, closeStatus }) {
  const statusModalRef = useRef();
  useImperativeHandle(
    ref,
    () => {
      return {
        openStatus() {
          statusModalRef.current?.showModal();
        },
        closeStatus() {
          statusModalRef.current?.close();
        },
      };
    },
    []
  );

  return (
    <dialog className="modal cart" ref={statusModalRef} onClose={closeStatus}>
      <h3>Success!</h3>
      <p>Your order was submitted successfully.</p>
      <p>
        We will get back to you with more details via email within the next few
        minutes
      </p>
      <div className="modal-actions">
        <button className="button" onClick={closeStatus}>
          Close
        </button>
      </div>
    </dialog>
  );
}
