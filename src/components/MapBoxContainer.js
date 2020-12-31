import React from 'react'
import ReactMapboxGl, {
  Marker,
  ScaleControl,
  ZoomControl,
  RotationControl,
} from 'react-mapbox-gl'
import { config } from '../config'
// import 'mapbox-gl/dist/mapbox-gl.css'

export default function MapBoxContainer(props) {
  const { KeyA } = config.mapbox
  const { KeyB } = config.mapbox
  const { KeyC } = config.mapbox
  const { setCoordinates } = props
  const latMap = props.coordinates.latitude
  const lngMap = props.coordinates.longitude

  const Map = ReactMapboxGl({
    accessToken: `${KeyA}.${KeyB}.${KeyC}`,
  })

  return (
    <>
      {props.coordinates && (
        <Map
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: '45vh',
            width: '60vw',
            opacity: '0.85',
          }}
          onClick={(Map, clickedCoordinates) => {
            setCoordinates({
              longitude: clickedCoordinates.lngLat.lng,
              latitude: clickedCoordinates.lngLat.lat,
            })
          }}
          center={[lngMap, latMap]} // starting position [lng, lat]A
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
                'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png'
              }
              alt="marker"
              height="30vh"
            />
          </Marker>
        </Map>
      )}
      ;
    </>
  )
}
