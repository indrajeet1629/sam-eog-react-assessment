import * as actions from "../actions";

const initialState = {
  isLoading: false
};

const droneDataReceived = (state, action) => {
  const { data } = action;
  const droneLocation = data.data[0];
  return { ...state, data: droneLocation };
};

const handlers = {
  [actions.DRONE_METRIC_DATA]: droneDataReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
