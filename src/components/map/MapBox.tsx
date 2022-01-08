import { useContext, useState } from 'react'
import ReactMapboxGl, {
  Marker,
  ScaleControl,
  ZoomControl,
  RotationControl
} from 'react-mapbox-gl'
import './MapBox.css'
import { Coordinates } from '../../types/positionTypes'
import { PositionContext } from 'context/positionContext'

export interface MapBoxProps {
  homeCoords: Coordinates
}

const Map = ReactMapboxGl({
  accessToken: `${process.env.REACT_APP_ApiKey_MapBox}`
})

const MapBox = ({ homeCoords }: MapBoxProps) => {
  const { onClick } = useContext(PositionContext)
  const [currentCoordinates, setCurrentCoordinates] = useState<Coordinates>({
    latitude: homeCoords.latitude,
    longitude: homeCoords.longitude
  })
  //! temporary deactivated
  //   const [zoom, setZoom] = useState<number>(8)

  //   const onZoomEndHandler = (map: { getZoom: () => number }) =>
  //     setZoom(parseInt(map.getZoom().toFixed(2), 16))

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
      onClick({
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
          height: '90vh',
          width: '90vw',
          opacity: '0.9'
        }}
        onClick={onClickHandler}
        // onZoomEnd={onZoomEndHandler}
      >
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
