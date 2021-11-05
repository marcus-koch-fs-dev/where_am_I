import ReactMapboxGl, {
  Marker,
  ScaleControl,
  ZoomControl,
  RotationControl
} from 'react-mapbox-gl'

const MapBoxCard = (props) => {
  const latMap = props.coordinates.latitude
  const lngMap = props.coordinates.longitude

  const Map = ReactMapboxGl({
    accessToken: `${process.env.REACT_APP_ApiKey_MapBox}`
  })

  return (
    <>
      {props.coordinates && (
        <Map
          className="mapBox"
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: '45vh',
            width: '90%',
            opacity: '0.85'
          }}
          //   onClick={(Map, clickedCoordinates) => {
          //     setCoordinates({
          //       longitude: clickedCoordinates.lngLat.lng,
          //       latitude: clickedCoordinates.lngLat.lat
          //     })
          //   }}
          center={[lngMap, latMap]} // starting position [lng, lat]A
          zoom={[14]} // starting zoom
        >
          <ScaleControl />
          <ZoomControl />
          <RotationControl />
          <Marker
            className="marker-my-position"
            // captureClick="true"
            coordinates={[lngMap, latMap]}
            anchor="bottom">
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

export default MapBoxCard
