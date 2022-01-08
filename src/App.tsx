import './App.css'
import { PositionContext } from './context/positionContext'
import { usePosition } from './hooks/usePosition'
import { Home } from './views'
// import ScaleLoader from 'react-spinners/ScaleLoader'

const App = () => {
  const { coordinates, onClick } = usePosition()

  return (
    <PositionContext.Provider value={{ coordinates, onClick }}>
      <div className="App">
        <Home />

        {/* <ScaleLoader
        className="spinner"
        loading={spinnerEnabled}
        color="firebrick"
        radius="5vh"
    /> */}
      </div>
    </PositionContext.Provider>
  )
}
export default App
