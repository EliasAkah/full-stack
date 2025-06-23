import { motion } from "framer-motion";

export default function Badge({ caption }) {
  return (
    <motion.span
      animate={{ scale: [1, 0.2, 1] }}
      transition={{ type: "keyframes" }}
      className="badge"
    >
      {caption}
    </motion.span>
  );
}
