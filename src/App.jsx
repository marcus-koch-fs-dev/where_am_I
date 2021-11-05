import { useState, useEffect } from 'react'

import './App.css'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { getPositionByBrowser } from './utils/positionFunction'
import { Home } from './views'

const App = () => {
  const [coordinates, setCoordinates] = useState({
    longitude: 0,
    latitude: 0
  })
  const [extraCountryInfo, setExtraCountryInfo] = useState(null)
  const [spinnerEnabled, setSpinnerEnabled] = useState(false)
  const [searchByIp, setSearchByIp] = useState({
    status: false,
    mode: 'Browser',
    IP_Info: 'n/d'
  })
  const [positionData, setPositionData] = useState(null)

  //Get latitude and longitude
  useEffect(() => {
    getPositionByBrowser()
  }, [])

  //Search position by Ip
  useEffect(() => {}, [searchByIp])

  // Get location and extra country information
  useEffect(() => {}, [])

  return (
    <div className="App">
      <Home />
      {/* {positionData && extraCountryInfo && (
        <InfoWindow
          positionData={positionData}
          extraCountryInfo={extraCountryInfo}
          searchByIp={searchByIp}
        />
      )}
      <ScaleLoader
        className="spinner"
        loading={spinnerEnabled}
        color="firebrick"
        radius="5vh"
      />
      {coordinates && (
        <MapBox coordinates={coordinates} setCoordinates={setCoordinates} />
      )} */}
    </div>
  )
}
export default App
