import React from "react";
import ReactMapboxGl, {
  Marker,
  ScaleControl,
  ZoomControl,
  RotationControl,
} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapBoxContainer(props) {
  const { REACT_APP_MAPBOX_API_KEY_A } = process.env;
  const { REACT_APP_MAPBOX_API_KEY_B } = process.env;
  const { REACT_APP_MAPBOX_API_KEY_C } = process.env;
  const { setCoordinates } = props;
  const latMap = props.coordinates.latitude;
  const lngMap = props.coordinates.longitude;
  // const latMarker = props.userMarker.latitude
  // const lngMarker = props.userMarker.longitude
  // console.log("MapBox",props.coordinates,latMap,lngMap,latMarker,lngMarker);

  const Map = ReactMapboxGl({
    accessToken: `${REACT_APP_MAPBOX_API_KEY_A}.${REACT_APP_MAPBOX_API_KEY_B}.${REACT_APP_MAPBOX_API_KEY_C}`,
  });

  return (
    <>
      <Map
        // style={"mapbox://styles/mapbox/streets-v8"}
        style={"mapbox://styles/mapbox/streets-v11"}
        containerStyle={{
          height: "45vh",
          width: "60vw",
          opacity: "0.85",
        }}
        onClick={(map, clickedCoordinates) => {
          // console.log(clickedCoordinates)
          setCoordinates({
            longitude: clickedCoordinates.lngLat.lng,
            latitude: clickedCoordinates.lngLat.lat,
          });
        }}
        // onZoomEnd={(Map,zo)=>{console.log(zo)}}
        center={[lngMap, latMap]} // starting position [lng, lat]A
        scrollZoom={true}
        zooming={true}
        zoom={[14]} // starting zoom
      >
        <ScaleControl />
        <ZoomControl />
        <RotationControl />
        <Marker
          className="marker-my-position"
          captureClick="true"
          coordinates={[lngMap, latMap]}
          anchor="bottom"
        >
          <img
            src={
              "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png"
            }
            alt="marker"
            height="30vh"
          />
        </Marker>
      </Map>
      ;
    </>
  );
}
