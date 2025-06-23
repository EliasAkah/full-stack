import { useAccordionContext } from "./Accordion.jsx";
import { useAccordionItemContext } from "./AccordionItem.jsx";

export function AccordionContent({ className, children }) {
  const { openitemId } = useAccordionContext();
  const id = useAccordionItemContext();

  const isOpen = openitemId === id;

  return (
    <>
      <div className={isOpen ? `${className} open` : `${className} close`}>
        {children}
      </div>
    </>
  );
}
