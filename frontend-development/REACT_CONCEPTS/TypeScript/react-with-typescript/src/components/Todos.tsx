import React, { ReactNode } from "react";

//usingType Alias
type TodosProps = {
  items: string[];
  children?: ReactNode;//react
};
//creating a react functional component using typescript
const Todos: React.FC<TodosProps> = (props) => {
  return (
    <>
      <ul>
        {props.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {props.children}
    </>
  );
};

export default Todos;

//TodosProps is an object type variable that contains a items property which is an array of string
//ReactNode => a type provided by react that represents anything that can be rendered in React