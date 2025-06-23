import { createContext, useContext, useState } from "react";

import AccordionItem from "./AccordionItem";
import { AccordionContent } from "./AccordionContent";
import { AccordionTitle } from "./AccordinTitle";

const AccordionContext = createContext(); //produces a context component

export function useAccordionContext() {
  const accordionContextValue = useContext(AccordionContext);

  if (!accordionContextValue) {
    throw new Error(
      "Accordion components must be wrapped with Accordion component"
    );
  }

  return accordionContextValue;
}

function Accordion({ children, className }) {
  const [openitemId, setOpenitemId] = useState();

  function toggleItem(id) {
    setOpenitemId((prevId) => (prevId === id ? null : id));
  }

  const contextValue = {
    openitemId,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={className}>{children}</ul>
    </AccordionContext.Provider>
  );
}

Accordion.Item = AccordionItem;
Accordion.Content = AccordionContent;
Accordion.Title = AccordionTitle;

export default Accordion;
