import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import NewChallenge from "./NewChallenge.jsx";

export default function Header() {
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] = useState();

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  return (
    <>
      <AnimatePresence>
        {isCreatingNewChallenge && <NewChallenge onDone={handleDone} />}
      </AnimatePresence>

      <header id="main-header">
        <h1>Your Challenges</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
          onClick={handleStartAddNewChallenge}
          className="button"
        >
          Add Challenge
        </motion.button>
      </header>
    </>
  );
}

//AnimatePresence is used to prevent react default effect of directly and quickly removing a component from the screen
// the moment it is umounted from the screen.
// by wrapping the component with AnimatePresence react is forced to go into that component to check if their is an child component
//within it that has "exit" attribute that comes with "motion" object from "framer-motion" it executest the exit attribute in that
//child component before remove the rest of the components from the screen.

//we use variants or define a variable that contains the animation setting inorder for us to reuse an animation.
