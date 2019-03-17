import {
  takeEvery,
  call,
  put,
  cancel,
  all
  //   take,
  //   race
} from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

// function delay(duration) {
//   const promise = new Promise(resolve => {
//     setTimeout(() => resolve(true), duration);
//   });
//   return promise;
// }

// function* watchDroneApiRecievedData() {
//   console.log("it is coming Here watchDroneApiRecievedData");
//   while (true) {
//     try {
//       const { data } = yield call(API.getDrone);
//       yield put({ type: actions.DRONE_METRIC_DATA, data });
//       yield call(delay, 5000);
//     } catch (e) {
//       yield put({ type: actions.API_ERROR, code: e.code });
//       yield cancel();
//       return;
//     }
//   }
// }

function* watchDroneApiRecievedData() {
  console.log("ControllerCameHere");
  const { error, data } = yield call(API.getDrone);
  if (error) {
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
  yield put({ type: actions.DRONE_METRIC_DATA, data });
}

// function* polling() {
//   //   yield all([takeEvery(actions.FETCH_DRONE_DATA, watchDroneApiRecievedData)]);
//   while (true) {
//     console.log("it is coming Here polling");
//     const data = yield take(actions.START_POLLING);
//     yield race([
//       call(watchDroneApiRecievedData, data),
//       take(actions.STOP_POLLING)
//     ]);
//   }
// }
function* root() {
  console.log("it is coming Here root");
  yield all([takeEvery(actions.FETCH_DRONE_DATA, watchDroneApiRecievedData)]);
}

export default [root];
