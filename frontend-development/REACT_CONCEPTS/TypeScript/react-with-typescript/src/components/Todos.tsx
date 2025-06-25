import React, { useContext } from "react";

import TodoItem from "./TodoItem";
import classes from "./Todos.module.css";
import { TodoContext } from "./TodoContextProvider";

//creating a react functional component using typescript
const Todos: React.FC = (props) => {
  const { items, deleteTodo } = useContext(TodoContext);
  return (
    <>
      <ul className={classes.todos}>
        {items.map((item) => {
          return (
            <TodoItem
              key={item.id}
              text={item.text}
              onDeleteTodo={deleteTodo.bind(null, item.id)}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Todos;

//TodosProps is an object type variable that contains a items property which is an array of string
//ReactNode => a type provided by react that represents anything that can be rendered in React
//() => props.onDeleteTodo(item.id) perform the same action as () => props.onDeleteTodo.bind(null, item.id)

// import classes from "./Todos.module.css";
// //usingType Alias
// type TodosProps = {
//   items: Todo[]; // we contain array that hava objects that are of the shape of Todo  class
//   onDeleteTodo: (id: string) => void;
//   children?: ReactNode; //react
// };

// //creating a react functional component using typescript
// const Todos: React.FC<TodosProps> = (props) => {
//   return (
//     <>
//       <ul className={classes.todos}>
//         {props.items.map((item) => {
//           return (
//             <TodoItem
//               key={item.id}
//               text={item.text}
//               onDeleteTodo={props.onDeleteTodo.bind(null, item.id)}
//             />
//           );
//         })}
//       </ul>
//       {props.children}
//     </>
//   );
// };
