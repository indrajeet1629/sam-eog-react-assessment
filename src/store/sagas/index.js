import WeatherSagas from "./Weather";
import ApiErrors from "./ApiErrors";
import Drone from "./Drone";

export default [...ApiErrors, ...WeatherSagas, ...Drone];
