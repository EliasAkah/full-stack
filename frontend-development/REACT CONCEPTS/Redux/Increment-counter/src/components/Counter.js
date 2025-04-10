import { useSelector, useDispatch } from "react-redux";

import classes from "./Counter.module.css";
const Counter = () => {
  const dispatch = useDispatch(); //binds a function to a const binding.

  const counter = useSelector((state) => state.counter); //accessing counter property of state from the store.
  const showCounter = useSelector((state) => state.showCounter); //accessing showCounter property of the state from the store.

  function incrementCounter() {
    dispatch({ type: "increment" });
  }
  function increaseHandler() {
    dispatch({ type: "increase", amount: 10 });
  }

  function decrementCounter() {
    dispatch({ type: "decrement" });
  }

  const toggleCounterHandler = () => {
    dispatch({ type: "toggle" });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementCounter}>increment</button>
        <button onClick={increaseHandler}>increment by 10</button>
        <button onClick={decrementCounter}>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

//the useSelector is a react hook provided by react redux team that accepts a call back function as its argument the callback fn takes the state of the store
//as its argument and returns a paticular property of the state(since the state is an object we access the property via the use of . operator)
//the useSelector hook returns the value of the property that we passed to it in the callback function
// In so doing react creates a subscriber function at the background for that component when it mounted in our application
//and vise versa when the state unmounts
//the subscriber function is responsible for listening to the state of the store and whenever the state changes it
//useSelector grants us access into the data in the redux store.

//useDispatch is a react hook provided by react redux team that is used to pass an action to the reducer function in the reducx store
