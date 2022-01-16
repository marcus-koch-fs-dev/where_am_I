import { useContext, useState } from 'react'
import ReactMapboxGl, {
  Marker,
  ScaleControl,
  ZoomControl,
  RotationControl
} from 'react-mapbox-gl'
// import './MapBox.css'
import { Coordinates } from '../../types/positionTypes'
import { PositionContext } from 'context/positionContext'

export interface MapBoxProps {
  homeCoords: Coordinates
}

const Map = ReactMapboxGl({
  accessToken: `${process.env.REACT_APP_ApiKey_MapBox}`
})

const MapBox = ({ homeCoords }: MapBoxProps) => {
  const { setCoordinates } = useContext(PositionContext)
  const [currentCoordinates, setCurrentCoordinates] = useState<Coordinates>({
    latitude: homeCoords.latitude,
    longitude: homeCoords.longitude
  })

  const urlMarker =
    'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png'

  const onStyleLoadHandler = (map) => {
    map.setZoom(14)
    map.setCenter({
      lat: currentCoordinates.latitude,
      lng: currentCoordinates.longitude
    })
  }

  const onClickHandler = (_, posData) => {
    const { lngLat } = posData

    setCurrentCoordinates({
      latitude: lngLat.lat.toFixed(5),
      longitude: lngLat.lng.toFixed(5)
    }),
      setCoordinates({
        latitude: lngLat.lat.toFixed(5),
        longitude: lngLat.lng.toFixed(5)
      })
  }

  return (
    <>
      <Map
        onStyleLoad={onStyleLoadHandler}
        style="mapbox://styles/mapbox/streets-v11"
        containerStyle={{
          height: '100%',
          width: '100%',
          opacity: '0.9'
        }}
        onClick={onClickHandler}>
        <ScaleControl />
        <ZoomControl />
        <RotationControl />
        <Marker
          className="marker-my-position"
          coordinates={[
            currentCoordinates.longitude,
            currentCoordinates.latitude
          ]}
          anchor="bottom">
          <img src={urlMarker} alt="marker" height="30vh" />
        </Marker>
      </Map>
    </>
  )
}

export default MapBox
