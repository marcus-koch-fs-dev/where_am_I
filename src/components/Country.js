
import React from 'react';
import "./Country.css";

export default function Country(props) {
  const getPositionByBrowser = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const latBrowser = position.coords.latitude;
        const lngBrowser = position.coords.longitude;
        props.setGeoPosition({...props.geoPosition, lat:latBrowser})
        // props.setGeoPosition({...props.geoPosition, lng:lngBrowser})
      });
  };
  
    return (
        <div className = "header-position">
          {/* <div className = "header-position-position"> */}
          <h1>Where am I?</h1>
          <p>Welcome, this is your current IP: <br/> {<strong>{props.myLocationData.data.ip}</strong>}</p>
          <p>Due to your IP, your are currently located in:<br/>{<strong>"{props.myLocationData.data.location.city}"</strong>} ({props.myLocationData.data.location.region})</p>
          <p>Your geographical position is:<br/>{<strong>Lat.:</strong>} {props.myLocationData.data.location.lat} | {<strong>Lon.:</strong>} {props.myLocationData.data.location.lng} </p>
          <p>The region {props.myLocationData.data.location.region} is a subregion of {<span>{props.extraCountryInfo.data[0].name}</span>}</p> 
          {/* </div> */}
          <div className ="header-position-about">
          <ul>
            <li><strong>About {props.extraCountryInfo.data[0].name}:</strong></li>
            <li>Country name: {props.extraCountryInfo.data[0].altSpellings[2]} ({props.extraCountryInfo.data[0].altSpellings[1]})</li>
            <li>Capital: {props.extraCountryInfo.data[0].capital}</li>
            <li>Population: {props.extraCountryInfo.data[0].population}</li>
            <li>National flag: <img src={props.extraCountryInfo.data[0].flag} alt={props.extraCountryInfo.data[0].name}  ></img></li>
          </ul>
          </div>
    <p>Your position is not accurate enough?<br/><button onClick={getPositionByBrowser}>clicke here</button> </p>
        </div>
    )
}

// width = '50rem'

// </div>  <p>Country: {extraCountryInfo[0].altSpellings[2]}</p> s