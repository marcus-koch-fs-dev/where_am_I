export interface GeoCoordinatesByBrowser {
  accuracy?: number | null
  altitude?: number | null
  altitudeAccuracy?: number | null
  heading?: number | null
  latitude: number | null
  longitude: number | null
  speed?: number | null
}

export interface GeoPositionByBrowser {
  coords: GeoCoordinatesByBrowser
  timestamp?: number
}

export interface Coordinates {
  latitude: number
  longitude: number
}
