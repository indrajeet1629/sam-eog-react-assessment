import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import * as actions from "../store/actions";
import { compose, withProps } from "recompose";
import LinearProgress from "@material-ui/core/LinearProgress";
// GoogleMap
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: "5%"
  }
};
const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={4}
    defaultCenter={{ lat: props.data.latitude, lng: props.data.longitude }}
  >
    {props.isMarkerShown && (
      <Marker
        position={{ lat: props.data.latitude, lng: props.data.longitude }}
      />
    )}
  </GoogleMap>
));

class MapVisualization extends Component {
  componentDidMount() {
    this.props.getDroneMetricData();
  }
  render() {
    console.log("DroneData", this.props.data);
    const { data } = this.props;
    return (
      <Card style={styles.card}>
        <CardHeader title="Map Visualization" />
        <CardContent>
          {!data && <LinearProgress />}
          {data && <MyMapComponent data={data} isMarkerShown={true} />}
        </CardContent>
      </Card>
    );
  }
}

const mapState = (state, ownProps) => {
  const {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit
  } = state.weather;
  const { data } = state.drone;
  return {
    loading,
    name,
    weather_state_name,
    temperatureinFahrenheit,
    data
  };
};

const mapDispatch = dispatch => ({
  getDroneMetricData: () =>
    dispatch({
      type: actions.FETCH_DRONE_DATA
    })
});

export default connect(
  mapState,
  mapDispatch
)(MapVisualization);
