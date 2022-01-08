import { createContext } from 'react'
import { Coordinates } from 'types/positionTypes'
import { PositionContextProps } from '../types/contextTypes'

const PositionContext = createContext<PositionContextProps>({
  coordinates: {
    latitude: 0,
    longitude: 0
  },

  onClick: (coords: Coordinates) => coords
})

export { PositionContext }
