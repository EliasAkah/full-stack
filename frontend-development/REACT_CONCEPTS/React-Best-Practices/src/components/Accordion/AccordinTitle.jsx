import { useAccordionContext } from "./Accordion.jsx";
import { useAccordionItemContext } from "./AccordionItem.jsx";

export function AccordionTitle({ children }) {
  const { toggleItem } = useAccordionContext();
  const id = useAccordionItemContext();

  return (
    <h3
      onClick={() => {
        toggleItem(id);
      }}
    >
      {children}
    </h3>
  );
}
