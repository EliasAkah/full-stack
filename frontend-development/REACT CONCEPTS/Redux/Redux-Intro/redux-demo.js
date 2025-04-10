const redux = require("redux");

const reducerFunction = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return { counter: state.counter + 1 };
  }

  if (action.type === "decrement") {
    return { counter: state.counter - 1 };
  }

  return state; // returns old state if all the condition fails
};
const store = redux.createStore(reducerFunction);

console.log(
  "state Value before subscriber call back function is invoked: ",
  store.getState()
);
const counterSubscriber = () => {
  // callback function passed as an argument to subscribe method that is triggered when the state in the reducer function is triggered by calling the dispatch Fn it receives the updated/old state according to the condition met
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });

//counterSubscriber is a callback function that is passed as an argument to subscribe  method of store object which it executes
//whenever the state in the reducer function is updated after a dispatch function was called it retrieves the latest state from the reducer function
//dispatch funtion sends an action object containing a type property which is used as condition within the reducer function
//to determine how the state is to be updated
// when we don't use the action object dispatched inside the reducer function the state returned will be updated before the final update
//which will take place after the subscribe() calls the callback function counterSubscriber.
// but if action.type is used as condition if we try to access the state before the the subscribe function is called;
//we get the old state not the updated state.
