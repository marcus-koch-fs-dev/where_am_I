import './Home.css'
import { useEffect, useState } from 'react'
import { InfoCard, MapBox } from '../../components'
import { getPositionByBrowser } from '../../api'
import type {
  GeoPositionByBrowser,
  Coordinates
} from '../../types/positionTypes'

const Home = () => {
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false)
  const [homeCoordinates, setHomeCoordinates] = useState<Coordinates>({
    latitude: 0,
    longitude: 0
  })

  useEffect(() => {
    getPositionByBrowser((positionData: GeoPositionByBrowser) => {
      const { latitude, longitude } = positionData.coords

      if (latitude === null || longitude === null) return

      setHomeCoordinates({
        latitude: latitude,
        longitude: longitude
      })
      setIsMapLoaded(true)
    })
  }, [])

  return (
    <div className="home-wrapper">
      {isMapLoaded && (
        <>
          <InfoCard />
          <MapBox homeCoords={homeCoordinates} />
        </>
      )}
    </div>
  )
}

export default Home
