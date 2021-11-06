import { useEffect, useState } from 'react'
import ReactMapboxGl, {
  Marker,
  ScaleControl,
  ZoomControl,
  RotationControl
} from 'react-mapbox-gl'
import { getPositionByBrowser } from 'utils/positionFunction'
import { GeoPositionByBrowser } from 'utils/types/positionTypes'

const MapBoxCard = () => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })

  useEffect(() => {
    getPositionByBrowser((positionData: GeoPositionByBrowser) => {
      const { latitude, longitude } = positionData?.coords

      if (latitude && longitude !== null)
        setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  const Map = ReactMapboxGl({
    accessToken: `${process.env.REACT_APP_ApiKey_MapBox}`
  })

  return (
    <>
      <Map
        className="mapBox"
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: '80%',
          width: '80%',
          opacity: '0.85'
        }}
        onClick={(Map, clickedCoordinates) => {
          console.log(clickedCoordinates)
        }}
        center={[coordinates.lng, coordinates.lat]} // starting position [lng, lat]A
        zoom={[14]} // starting zoom
      >
        <ScaleControl />
        <ZoomControl />
        <RotationControl />
        <Marker
          className="marker-my-position"
          // captureClick="true"
          coordinates={[coordinates.lng, coordinates.lat]}
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
    </>
  )
}

export default MapBoxCard
