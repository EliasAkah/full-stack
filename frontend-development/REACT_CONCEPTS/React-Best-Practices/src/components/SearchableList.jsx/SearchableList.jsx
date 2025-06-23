import { useRef, useState } from "react";

export function SearchableList({ items, itemKey, children }) {
  const lastChange = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  const SearchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  ); //creates a new array that contains elements that satifies the conditions within the fileter function

c 

  return (
    <div>
      <input
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchItem}
      />
      <ul>
        {SearchResults.map((item, index) => {
          console.log("value of item", item);
          return <li key={itemKey(item)}>{children(item)}</li>;
        })}
      </ul>
    </div>
  );
}
