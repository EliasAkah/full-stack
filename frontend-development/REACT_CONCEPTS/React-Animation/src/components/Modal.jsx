import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
  // const hiddenAnimation = { opacity: 0, y: 30 };
  // const visibleAnimation = { opacity: 1, y: 0 };

  return createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <motion.dialog
        variants={{
          hiddenAnimation: { opacity: 0, y: 30 },
          visibleAnimation: { opacity: 1, y: 0 },
        }}
        initial="hiddenAnimation"
        animate="visibleAnimation"
        exit="hiddenAnimation"
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
