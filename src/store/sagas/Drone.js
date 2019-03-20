import {
  // takeEvery,
  call,
  put,
  cancel,
  // all,
  take,
  race
} from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration);
  });
  return promise;
}

function* watchDroneApiRecievedData() {
  while (true) {
    try {
      const { data } = yield call(API.getDrone);
      yield put({ type: actions.DRONE_METRIC_DATA, data });
      yield put({
        type: actions.FETCH_WEATHER,
        longitude: data.data[0].longitude,
        latitude: data.data[0].latitude
      });
      yield call(delay, 3000);
    } catch (e) {
      yield put({ type: actions.API_ERROR, code: e.code });
      yield cancel();
      return;
    }
  }
}

function* polling() {
  while (true) {
    yield race([call(watchDroneApiRecievedData), take(actions.STOP_POLLING)]);
  }
}

function* root() {
  yield [polling()];
}

export default [root];
