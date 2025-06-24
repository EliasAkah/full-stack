import { useEffect, useState } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (startListening = true) => {
  const setState = useState(globalState)[1]; //use to force re-render when globalState changes

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };
  useEffect(() => {
    if (startListening) {
      listeners.push(setState);
    }
    // executes when component renders(mounts);

    return () => {
      //remove a component setState from listeners array when the component unmounts
      if (startListening) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, startListening]);

  return [globalState, dispatch]; //mimics the useReducer hook
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
