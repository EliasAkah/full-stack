import React from "react";
import classes from "./TodoItem.module.css";

type ItemProps = { text: string; onDeleteTodo: () => void };

const TodoItem: React.FC<ItemProps> = (props) => {
  return (
    <li className={classes.item} onClick={props.onDeleteTodo}>
      {props.text}
    </li>
  );
};

export default TodoItem;
