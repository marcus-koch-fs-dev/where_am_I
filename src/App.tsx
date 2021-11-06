import dotenv from 'dotenv'
import { useState, useEffect } from 'react'
import './App.css'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { getPositionByBrowser } from './utils/positionFunction'
import { Home } from './views'

dotenv.config()

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
