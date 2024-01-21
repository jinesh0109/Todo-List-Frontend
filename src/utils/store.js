import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./TodoSlice";
const loadState = () => {
    try {
      const serializedState = localStorage.getItem("todoState");
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error("Error loading state from localStorage:", err);
      return undefined;
    }
};

const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("todoState", serializedState);
    } catch (err) {
      console.error("Error saving state to localStorage:", err);
    }
};

const store = configureStore({
    reducer:{
        todo: TodoSlice
    },
    preloadedState: loadState(),
})

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
