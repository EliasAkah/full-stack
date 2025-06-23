import { useContext, useRef, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();
  const [scope, animate] = useAnimate(); //use to carryout animation imperatively. scope is used as ref, animate as function use to define the animation settings.

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      animate(
        "input, textArea",
        { x: [-10, 0, 10, 0] },
        { type: "keyframes", duration: 0.5, delay: stagger(0.5) }
      );
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul
          id="new-challenge-images"
          variants={{
            hiddenAnimation: {},
            visibleAnimation: { transition: { staggerChildren: 0.5 } },
          }}
        >
          {images.map((image) => (
            <motion.li
              variants={{
                hiddenAnimation: { opacity: 0, scale: 0.5 },
                visibleAnimation: { opacity: 1, scale: 1 },
              }}
              initial="hiddenAnimation"
              animate="visibleAnimation"
              exit={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}

//variants enables us to activate the animate, exit, initial attribute in parent element on the child element if the properities of
//the parent and child elements is the same though their value may vary.
//e.g " initial={"hiddenAnimation"} animate={"visibleAnimation"} exit={"hiddenAnimation"}" defined in the parent component
// are triggered for a child element that has a variant with the same attribiute as the parent.
