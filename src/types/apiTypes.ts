export interface Geometry {
  coordinates: Array<number>
  [key: string]: any
}

export interface Properties {
  address_line1: string
  address_line2: string
  city: string
  country: string
  country_code: string
  county: string
  datasource: { [key: string]: any }
  distance: number
  district: string
  formatted: string
  housenumber: string
  lat: number
  lon: number
  place_id: string
  postcode: string
  rank: { popularity: number }
  result_type: string
  state: string
  street: string
  subUrb?: string
  type: string
  [key: string]: any
}
export interface Feature {
  geometry: Geometry
  properties: Properties
}

export interface DataReverseGeoCode {
  features: Array<Feature>
  type: string
}
