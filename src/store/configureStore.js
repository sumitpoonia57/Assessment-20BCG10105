//Configuring Reducer

//Created this file to add persistent store but couldnt implement due to time constraint

import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";

export default () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};
