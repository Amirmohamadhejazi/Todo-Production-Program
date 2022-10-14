/* eslint-disable no-unused-vars */

import { all } from "redux-saga/effects";

import Home from "./Home/saga";
export default function* rootSaga(getState) {
  yield all([
    Home(),
  ]);
}
