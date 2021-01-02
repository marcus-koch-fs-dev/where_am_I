import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import MapBox from './components/MapBoxContainer'
import InfoWindow from './components/InfoWindow'
import { config } from './config'
import ScaleLoader from 'react-spinners/ScaleLoader'
import './App.css'

function App() {
  const [coordinates, setCoordinates] = useState({
    longitude: 0,
    latitude: 0,
  })
  const [extraCountryInfo, setExtraCountryInfo] = useState(null)
  const [spinnerEnabled, setSpinnerEnabled] = useState(false)
  const [searchByIp, setSearchByIp] = useState({
    status: false,
    mode: 'Browser',
    IP_Info: 'n/d',
  })
  const [positionData, setPositionData] = useState(null)
  const initialState = { count: 0 }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'add':
        // console.log('add')
        return { count: state.count + 1 }
      case 'minus':
        // console.log('minus')
        return { count: state.count - 1 }
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    state.count > 0 ? setSpinnerEnabled(true) : setSpinnerEnabled(false)
  }, [state])

  //Get latitude and longitude
  useEffect(() => {
    const getPositionByBrowser = () => {
      dispatch({ type: 'add' })
      const error = (err) => {
        alert('Please activate your geolocation service')
      }
      const option = {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 6000,
      }

      if (!navigator.geolocation) {
        // alert('Geolocation is not supported by your browser')
        setSearchByIp({ ...searchByIp, [status]: true })
      } else {
        try {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setCoordinates({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
              })
            },
            error,
            option
          )
        } catch {
          console.log(error.message)
        }
      }
      dispatch({ type: 'minus' })
    }
    getPositionByBrowser()
  }, [])

  //Search position by Ip
  useEffect(() => {
    const Search = async () => {
      dispatch({ type: 'add' })
      try {
        const { Key } = config.ipIfy
        const getMyLocation = await axios(
          `https://geo.ipify.org/api/v1?apiKey=${Key}`
        )
        dispatch({ type: 'minus' })
        setCoordinates({
          longitude: getMyLocation.data.location.lng,
          latitude: getMyLocation.data.location.lat,
        })
        setSearchByIp({
          status: false,
          mode: 'IP-Detection',
          IP_Info: getMyLocation.data.ip + ' ' + getMyLocation.data.isp,
        })
      } catch (error) {
        console.log(error.message)
      }
      dispatch({ type: 'minus' })
    }
    searchByIp === true && Search()
  }, [searchByIp])

  // Get location and extra country information
  useEffect(() => {
    const nameOfPosition = async () => {
      dispatch({ type: 'add' })
      let geoReverseResults
      try {
        const { Key } = config.geoIpFy
        const { latitude } = coordinates
        const { longitude } = coordinates
        geoReverseResults = await axios(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&limit=1&apiKey=${Key}`
        )
        setPositionData(geoReverseResults.data.features[0])
      } catch (error) {
        console.log('PosErr', error.message)
        setPositionData({
          properties: {
            housenumber: 'n/d',
            street: 'n/d',
            postcode: 'n/d',
            city: 'n/d',
            county: 'n/d',
            state: 'n/d',
            country: 'n/d',
          },
        })
      }
      dispatch({ type: 'minus' })

      try {
        dispatch({ type: 'add' })
        const { country } = geoReverseResults.data.features[0].properties
        const extraCountryData = await axios(
          `https://restcountries.eu/rest/v2/name/${country}`
        )
        setExtraCountryInfo(extraCountryData)
      } catch (error) {
        console.log(error.message)
        setExtraCountryInfo({
          data: [
            {
              area: 'n/d',
              capital: 'n/d',
              flag: 'n/d',
              population: 'n/d',
              callingCodes: 'n/d',
              altSpellings: ['n/d'],
            },
          ],
        })
      }
      dispatch({ type: 'minus' })
    }
    coordinates.latitude !== 0 &&
      coordinates.longitude !== 0 &&
      nameOfPosition()
  }, [coordinates])

  return (
    <div className="App">
      {positionData && extraCountryInfo && (
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
      )}
    </div>
  )
}
export default App
