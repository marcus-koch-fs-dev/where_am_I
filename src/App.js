import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import "./normalize.css";
import "./App.css";
import Country from "./components/Header";
import Body from "./components/Body";

function App() {
  const [country2, setCountry] = useState(null);
  const [position, setPosition] = useState(null);
  const [countryProps, setCountryProps] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [myLocationData, setMyLocationData] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
       setSpinner(true);
      try {
    console.log("try fetch ip")
        const myLocation = await axios(
          `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_API_KEY}`
          // `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_API_KEY}&${ipAddress}}`
        );
        setCountry(myLocation.data.location.country);
        setPosition(myLocation.data.location);
        setMyLocationData(myLocation)
      } catch (error) {
    console.log(error.message)

  }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        console.log("try fetch country")
        const myCountry = await axios(
          `https://restcountries.eu/rest/v2/name/${country2}?fullText=true`
        );
        setCountryProps(myCountry);
        setSpinner(false);
      } catch (error) {
        console.log(error.message)
      }
    };
    fetchCountry();
  }, [country2]);


  return (
    <div className="App">
      <div id="wrapper">
        {(countryProps && myLocationData) && <Country countryProps={countryProps} myLocationData={myLocationData}></Country>}
        {(spinner) && <Spinner animation="border" />}
        {position && <Body position={position} />}
      </div>
      <div id="nav"></div>
      <div id="side-left"></div>
      <div id="side-right"></div>
      <div id="footer"></div>
    </div>
  );
}
export default App;
