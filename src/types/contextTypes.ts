import { Coordinates } from './positionTypes'

export interface PositionContextProps {
  coordinates: Coordinates
  onClick: (coords: Coordinates) => void
}
