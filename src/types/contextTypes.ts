import { Coordinates } from './positionTypes'

export interface PositionContextProps {
  coordinates: Coordinates
  setCoordinates: (coords: Coordinates) => void
}
