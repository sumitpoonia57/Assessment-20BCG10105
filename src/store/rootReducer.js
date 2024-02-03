// ** Reducers Import
import store from "./index";

import { combineReducers } from "redux";

const rootReducer = {
  store,
};

export default combineReducers(rootReducer);
