import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import "./normalize.css";
import "./App.css";
import Country from "./components/Header";
import Body from "./components/Body";

function App() {
  // const ipAddress = "80.138.156.63";
  // const [country2, setCountry] = useState("uk");
  // const [position, setPosition] = useState({ lat: 51.505, lon: -0.09 });
  const [countryProps, setCountryProps] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [ipApi, setIpApi] = useState();

  useEffect(() => {
    const fetchIpApi = async () => {
      setSpinner(true);
      try {
        const myIpApi = await axios(`http://ip-api.com/json/`);
        setIpApi(myIpApi);
        setSpinner(false);
      } catch (error) {}
    };
    fetchIpApi();
  }, []);

  // useEffect(() => {
  //   const fetchLocation = async () => {
  //     try {
  //       const myLocation = await axios(
  //         `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_API_KEY}&${ipAddress}`
  //       );
  //       setCountry(myLocation.data.location.country);
  //       setPosition(myLocation.data.location);
  //     } catch (error) {}
  //   };
  //   fetchLocation();
  // }, []);

  useEffect(() => {
    const fetchCountry = async () => {
      setSpinner(true);
      try {
        const myCountry = await axios(
          `https://restcountries.eu/rest/v2/name/${ipApi.data.countryCode}?fullText=true`
          // `https://restcountries.eu/rest/v2/name/${country2}?fullText=true`
        );
        setCountryProps(myCountry);
        setSpinner(false);
      } catch (error) {}
    };
    fetchCountry();
  }, [ipApi]);
  // }, [country2]);

  return (
    <div className="App">
      <div id="wrapper">
        {countryProps && ipApi && <Country countryProps={countryProps} ipApi={ipApi}></Country>}
        {spinner && <Spinner animation="border" />}
        {ipApi && <Body ipApi={ipApi} />}
      </div>
    </div>
  );
}
export default App;
