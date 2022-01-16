import './App.scss'
import { PositionContext } from './context/positionContext'
import { usePosition } from './hooks/usePosition'
import { Home } from './views'

const App = () => {
  const { coordinates, setCoordinates } = usePosition()

  return (
    <PositionContext.Provider value={{ coordinates, setCoordinates }}>
      <div className="app">
        <Home />
      </div>
    </PositionContext.Provider>
  )
}
export default App
