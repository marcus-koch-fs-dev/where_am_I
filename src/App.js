import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
// import "./normalize.css";
import "./App.css";
import Country from "./components/Country";
import Body from "./components/Body";
import Card from "./components/Card"

function App() {
  const [geoPosition, setGeoPosition] = useState(null);
  const [extraCountryInfo, setExtraCountryInfo] = useState(null);
  const [spinnerEnabled, setSpinnerEnabled] = useState(false);
  const [myLocationData, setMyLocationData] = useState(null);
  // const [handlePositionByBrowser, setHandlePositionByBrowser] = useState(false);

  useEffect(() => {
    const fetchLocationInfo = async () => {
      console.log("test");
      let getCurrentCountry = "";
      setSpinnerEnabled(true);
      try {
        const { REACT_APP_API_KEY } = process.env;
        const getMyLocation = await axios(
          `https://geo.ipify.org/api/v1?apiKey=${REACT_APP_API_KEY}`
        );
        // setCountry(getMyLocation.data.location.country);
        getCurrentCountry = getMyLocation.data.location.country;
        setMyLocationData(getMyLocation);
        setGeoPosition(getMyLocation.data.location);
      } catch (error) {
        console.log(error.message);
      }
      try {
        const getExtraCountryData = await axios(
          `https://restcountries.eu/rest/v2/name/${getCurrentCountry}?fullText=true`
        );
        setExtraCountryInfo(getExtraCountryData);
      } catch (error) {
        console.log(error.message);
      }
      setSpinnerEnabled(false);
    };
    fetchLocationInfo();
  }, []);

  
  return (
    <div className="App">
      <div id="wrapper">
        {extraCountryInfo && myLocationData && (
          <Card
          extraCountryInfo={extraCountryInfo}
          myLocationData={myLocationData}
          geoPosition={geoPosition}
          setGeoPosition={setGeoPosition}
          ></Card>
          
          // <Country
          //   extraCountryInfo={extraCountryInfo}
          //   myLocationData={myLocationData}
          //   geoPosition={geoPosition}
          //   setGeoPosition={setGeoPosition}
          // ></Country>
        )}
        {spinnerEnabled && <Spinner animation="border" />}
        {geoPosition && <Body geoPosition={geoPosition} />}
        {/* {console.log(<Body></Body>)} */}
      </div>
    </div>
  );
}

export default App;

// geoPosition={geoPosition}
// setGeoPosition={setGeoPosition}
//   return (
//     <div className="App">
//       <div id="wrapper">
//         {(countryProps && myLocationData) && <Country countryProps={countryProps} myLocationData={myLocationData}></Country>}
//         {(spinner) && <Spinner animation="border" />}
//         {position && <Body position={position} />}
//       </div>
//       <div id="nav"></div>
//       <div id="side-left"></div>
//       <div id="side-right"></div>
//       <div id="footer"></div>
//     </div>
//   );
// }
// export default App;
