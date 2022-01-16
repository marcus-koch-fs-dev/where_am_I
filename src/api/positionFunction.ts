// Modules
import axios, { AxiosResponse } from 'axios'
import { isDevMode } from '../utils/helperFunctions'
// Types
import { Coordinates, GeoPositionByBrowser } from '../types/positionTypes'
import { DataReverseGeoCode } from './../types/apiTypes'

export const getPositionInfo = async (
  coord: Coordinates
): Promise<DataReverseGeoCode | undefined> => {
  const { latitude, longitude } = coord
  const { REACT_APP_ApiKey_ReverseGeoCode } = process.env

  try {
    const { data }: AxiosResponse<DataReverseGeoCode> = await axios(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${REACT_APP_ApiKey_ReverseGeoCode}`
    )
    return data
  } catch (error) {
    isDevMode() && console.error(error)
    return undefined
  }
}

/** 
    Deliver base information of a global country 
*/
export const getCurrentPosition = async (
  coord: Coordinates
): Promise<Coordinates | null> => {
  const { longitude, latitude } = coord
  const { REACT_APP_ApiKey_IpIfy } = process.env

  try {
    const { data } = await axios(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&limit=1&apiKey=${REACT_APP_ApiKey_IpIfy}`
    )
    return data
  } catch (error) {
    isDevMode() && console.error(error)
    return null
  }
}

export const getPositionByBrowser = async (
  cb: (browserData: GeoPositionByBrowser) => void
) => {
  if (!navigator.geolocation) return

  const options = {
    enableHighAccuracy: true,
    maximumAge: 5000,
    timeout: 6000
  }

  await navigator.geolocation.getCurrentPosition(
    (newPositionData: GeoPositionByBrowser) => {
      cb(newPositionData)
    },
    (error) => error,
    options
  )
}

/**  
    Deliver base information of a country in EU
*/
//! temporary deactivated
// export const getCountryInformation = async (country: string): Promise<any> => {
//   try {
//     const { data } = await axios(
//       `https://restcountries.eu/rest/v2/name/${country}`
//     )
//     return data
//   } catch (error) {
//     isDevMode() && console.error(error)
//     return {}
//   }
// }
