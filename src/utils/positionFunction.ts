import { isDevMode } from './helperFunctions'
import axios from 'axios'

// export const Search = async () => {
//     try {
//       const { Key } = config.ipIfy
//       const getMyLocation = await axios(
//         `https://geo.ipify.org/api/v1?apiKey=${Key}`
//       )

//       setCoordinates({
//         longitude: getMyLocation.data.location.lng,
//         latitude: getMyLocation.data.location.lat
//       })
//       setSearchByIp({
//         status: false,
//         mode: 'IP-Detection',
//         IP_Info: getMyLocation.data.ip + ' ' + getMyLocation.data.isp
//       })
//     } catch (error) {
//       console.log(error.message)
//     }
//   }

/* 
    Deliver base information of a global country 
*/
export const getCurrentPosition = async (
  latitude: number,
  longitude: number
): Promise<any> => {
  const { REACT_APP_ApiKey_IpIfy } = process.env

  try {
    const { data } = await axios(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&limit=1&apiKey=${REACT_APP_ApiKey_IpIfy}`
    )
    return data
  } catch (error) {
    isDevMode && console.error(error)
    return {}
  }
}

/* 
    Deliver base information of a country in EU
*/
export const getCountryInformation = async (country: string): Promise<any> => {
  try {
    const { data } = await axios(
      `https://restcountries.eu/rest/v2/name/${country}`
    )
    return data
  } catch (error) {
    isDevMode && console.error(error)
    return {}
  }
}

export const getPositionByBrowser = async (): Promise<any> => {
  const success = (data) => data

  const error = (err) => err
  // alert('Please activate your geolocation service')
  const option = {
    enableHighAccuracy: true,
    maximumAge: 5000,
    timeout: 6000
  }

  if (!navigator.geolocation) {
    // alert('Geolocation is not supported by your browser')
    // setSearchByIp({ ...searchByIp, [status]: true })
  } else {
    try {
      await navigator.geolocation.getCurrentPosition(success, error, option)
      return success
    } catch (error) {
      isDevMode && console.error(error)
      return {}
    }
  }
}