const redux = require("redux");

function counterReducer(state = { counter: 0, showCounter: false }, action) {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  //using an action to handle the toggle
  if (action.type === "toggle") {
    return {
      counter: state.counter,
      showCounter: !state.showCounter,
    };
  }
  return state;
}
//creating state store and informing it of the reducer function that can alter or mutate its state
const store = redux.createStore(counterReducer);

module.exports = store;
