import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import MapBox from "./components/MapBoxContainer";
import InfoWindow from "./components/InfoWindow";
import "./App.css";

function App() {
  const [coordinates, setCoordinates] = useState({ longitude: 0, latitude: 0 });
  // const [userMarker, setUserMarker] = useState({ longitude: 0, latitude: 0 });
  const [extraCountryInfo, setExtraCountryInfo] = useState(null);
  const [spinnerEnabled, setSpinnerEnabled] = useState(false);
  const [positionData, setPositionData] = useState(null);

  useEffect(() => {
    const getPositionByBrowser = () => {
      const error = (err) =>{}
      const option = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge:10000
      };
      
      if (!navigator.geolocation) {
        window.message("Geolocation is not supported by your browser");
      } 
      else {
        try {
          navigator.geolocation.getCurrentPosition((position) => {
            setCoordinates({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            });
            // setUserMarker({
            //   longitude: position.coords.longitude,
            //   latitude: position.coords.latitude,
            // });
            
          }, error, option);
        } catch {
          console.log(error.message);
        }
      }
    };
    getPositionByBrowser();
  }, []);

  useEffect(() => {
    const nameOfPosition = async () => {
      setSpinnerEnabled(true);
      let geoReverseResults;
      
      try {
        const { REACT_APP_GeoIpFy_API_KEY } = process.env;
        const { latitude } = coordinates
        const { longitude } = coordinates
        geoReverseResults = await axios(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&limit=1&apiKey=${REACT_APP_GeoIpFy_API_KEY}`
        );
        setPositionData(geoReverseResults.data.features[0]);
      } catch (error) {
        console.log(error.message);
      }

      try {
        const { country } = geoReverseResults.data.features[0].properties;
        // console.log(country);
        const extraCountryData = await axios(
          `https://restcountries.eu/rest/v2/name/${country}?fullText=true`
          );
        setExtraCountryInfo(extraCountryData);
      } catch (error) {
        // console.log(error.message);
        // alert("This place has no specific information. Choose a populated region for better results. ")
      }
      setSpinnerEnabled(false);
    };
   coordinates.latitude !== 0 && coordinates.longitude !== 0 && nameOfPosition();
  }, [coordinates]);

  // console.log(coordinates !== userMarker);
  return (
    <div className="App">
      {positionData && extraCountryInfo && (
        <InfoWindow
          positionData={positionData}
          extraCountryInfo={extraCountryInfo}
        />
      )}
      {spinnerEnabled && <Spinner animation="border" />}
      {coordinates && 
        <MapBox coordinates={coordinates} setCoordinates={setCoordinates}/>
      }
    </div>
  );
}
export default App;