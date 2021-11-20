import './App.css'
// import ScaleLoader from 'react-spinners/ScaleLoader'
import { Home } from './views'

const App = () => {
  return (
    <div className="App">
      <Home />

      {/* <ScaleLoader
        className="spinner"
        loading={spinnerEnabled}
        color="firebrick"
        radius="5vh"
      /> */}
    </div>
  )
}
export default App
