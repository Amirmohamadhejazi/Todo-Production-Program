import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  getData,SetData
} from "./HomeSlice";
import api from "../../constants/api";
import {NotificationManager} from "react-notifications";

export function* watchGetData() {
  yield takeEvery(getData.type, GetDataFake);
}
const GetDataAsync = async (data) =>
    await api
        .get("/todo")
        .then((data) => data)
        .catch((error) => error);

function* GetDataFake({ payload }) {
  try {
    const DataTodo = yield call(GetDataAsync, payload);
    console.log(DataTodo)
    if (DataTodo.status === 200) {
      console.log(DataTodo.data)
      yield put(SetData(DataTodo.data));
    }
    else {
      console.log(DataTodo)
    }
  } catch (error) {
    NotificationManager.error(<span>پیام خانه</span> , <span>بارگذاری آیتم های فروشگاه با مشکل روبرو شد</span> , 2000);
  }
}




export default function* rootSaga() {
  yield all([
    fork(watchGetData),
  ]);
}
