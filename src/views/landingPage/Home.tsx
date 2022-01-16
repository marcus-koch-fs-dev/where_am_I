import './Home.scss'
import { useContext, useEffect, useState } from 'react'
import { InfoCard, MapBox } from '../../components'
import { getPositionByBrowser } from '../../api'
import { PositionContext } from 'context/positionContext'
import ScaleLoader from 'react-spinners/ScaleLoader'
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
  const { setCoordinates } = useContext(PositionContext)

  useEffect(() => {
    getPositionByBrowser((positionData: GeoPositionByBrowser) => {
      const { latitude, longitude } = positionData.coords

      if (latitude === null || longitude === null) return

      setCoordinates({ latitude: latitude, longitude: longitude })
      setHomeCoordinates({
        latitude: latitude,
        longitude: longitude
      })
      setIsMapLoaded(true)
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {isMapLoaded ? (
        <div className="home__wrapper">
          <div className="home_infoCard">
            <InfoCard />
          </div>
          <div className="home__mapBox">
            <MapBox homeCoords={homeCoordinates} />
          </div>
        </div>
      ) : (
        <div className="loader">
          <ScaleLoader />
        </div>
      )}
    </>
  )
}

export default Home
