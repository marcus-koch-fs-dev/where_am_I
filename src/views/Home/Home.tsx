import './Home.css'
import { useEffect, useState } from 'react'
import { InfoCard, MapBox } from '../../components'
import { getPositionByBrowser } from 'utils/positionFunction'
// Types
import type { GeoPositionByBrowser, Coords } from '../../types/positionTypes'

export const Home = () => {
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false)
  const [homeCoordinates, setHomeCoordinates] = useState<Coords>({
    lat: 0,
    lng: 0
  })

  useEffect(() => {
    getPositionByBrowser((positionData: GeoPositionByBrowser) => {
      const { latitude, longitude } = positionData.coords

      if (latitude === null || longitude === null) return

      setHomeCoordinates({
        lat: latitude,
        lng: longitude
      })
      setIsMapLoaded(true)
    })
  }, [])

  return (
    <div className="home-wrapper">
      {/* <InfoCard /> */}
      {isMapLoaded && <MapBox homeCoords={homeCoordinates} />}
    </div>
  )
}

export default Home
