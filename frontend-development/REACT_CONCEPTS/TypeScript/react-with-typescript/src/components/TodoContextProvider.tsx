import React, { ReactNode, useState } from "react";
import Todo from "../models/Todo";

type TodoContextObject = {
  items: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
};
export const TodoContext = React.createContext<TodoContextObject>({
  items: [],
  addTodo: (text: string) => {},
  deleteTodo: (id: string) => {},
});

const TodoContextProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]); //todo becomes an empty arry but will contain elements with the same structure as Todo Instance

  const addToDoHandler = (text: string) => {
    let newTodos = new Todo(text);

    setTodos((prevTodos) => prevTodos.concat(newTodos));
    // setTodo((prevTodos) => [...prevTodos, newTodo]);
  };

  const deleteTodoHandler = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const TodoContextValue = {
    items: todos,
    addTodo: addToDoHandler,
    deleteTodo: deleteTodoHandler,
  };

  return (
    <TodoContext.Provider value={TodoContextValue}>
      <div className="App">{props.children}</div>
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
