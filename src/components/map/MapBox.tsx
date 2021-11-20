import { useState } from 'react'
import ReactMapboxGl, {
  Marker,
  ScaleControl,
  ZoomControl,
  RotationControl
} from 'react-mapbox-gl'

import { Coords } from '../../types/positionTypes'

export interface MapBoxProps {
  homeCoords: Coords
}

const Map = ReactMapboxGl({
  accessToken: `${process.env.REACT_APP_ApiKey_MapBox}`
})

const MapBox = ({ homeCoords }: MapBoxProps) => {
  const [currentCoordinates, setCurrentCoordinates] = useState<Coords>({
    lat: homeCoords.lat,
    lng: homeCoords.lng
  })

  const [zoom, setZoom] = useState<number>(8)
  const urlMarker =
    'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png'

  const onStyleLoadHandler = (map) => {
    map.setZoom(14)
    map.setCenter({
      lat: currentCoordinates.lat,
      lng: currentCoordinates.lng
    })
  }

  const onZoomEndHandler = (map: { getZoom: () => number }) =>
    setZoom(parseInt(map.getZoom().toFixed(2), 16))

  const onClickHandler = (_, posData) => {
    const { lngLat } = posData

    setCurrentCoordinates({
      lat: lngLat.lat.toFixed(5),
      lng: lngLat.lng.toFixed(5)
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
        onZoomEnd={onZoomEndHandler} // starting position [lng, lat]A
      >
        <ScaleControl />
        <ZoomControl />
        <RotationControl />
        <Marker
          className="marker-my-position"
          coordinates={[currentCoordinates.lng, currentCoordinates.lat]}
          anchor="bottom">
          <img src={urlMarker} alt="marker" height="30vh" />
        </Marker>
      </Map>
    </>
  )
}

export default MapBox
