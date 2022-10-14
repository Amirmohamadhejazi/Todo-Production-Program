import { combineReducers } from "@reduxjs/toolkit";
import HomeSlice from "./Home/HomeSlice";

const reducers = combineReducers({
  HomeSlice,
});
export default reducers;
