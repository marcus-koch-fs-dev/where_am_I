import { useContext, useState } from 'react'
import { PositionContext } from '../context/positionContext'
import { Coordinates } from '../types/positionTypes'

const usePosition = () => {
  const { coordinates } = useContext(PositionContext)
  const [userSelectCoords, setUserSelectCoords] = useState(coordinates)

  const handleSelectedCoords = (coords: Coordinates) => {
    setUserSelectCoords(coords)
  }

  return { coordinates: userSelectCoords, setCoordinates: handleSelectedCoords }
}

export { usePosition }
