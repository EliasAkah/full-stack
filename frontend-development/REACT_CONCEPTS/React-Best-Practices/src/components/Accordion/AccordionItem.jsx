import { createContext, useContext } from "react";

const AccordionItemContext = createContext();

export function useAccordionItemContext() {
  const id = useContext(AccordionItemContext); // returns the value of the context within its parenthesis and pass it as a value to the id variable

  if (!id) {
    throw new Error(
      "All AccordionItem components must be wrapped within the AccordionItem component"
    );
  }

  return id;
}

function AccordionItem({ id, className, children }) {
  return (
    <AccordionItemContext.Provider value={id}>
      <li className={className}>{children}</li>
    </AccordionItemContext.Provider>
  );
}

export default AccordionItem;
