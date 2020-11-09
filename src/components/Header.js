
import React from 'react';
import "./Header.css";

export default function Country(props) {
  
    return (
        <div className = "header-position">
          <div className = "header-position-position">
          <h1>Where am I?</h1>
          <p>Welcome, this is your current {<strong>IP: {props.myLocationData.data.ip}</strong>}</p>
          <p>Your are currently located in {<strong>"{props.myLocationData.data.location.city}"</strong>} ({props.myLocationData.data.location.region})</p>
          <p>Your geographical position is {<strong>Lat.:</strong>} {props.myLocationData.data.location.lat} | {<strong>Lon.:</strong>} {props.myLocationData.data.location.lng} </p>
          <p>The region {props.myLocationData.data.location.region} is a subregion of {<span>{props.countryProps.data[0].name}</span>}</p> 
          </div>
          <div className ="header-position-about">
          <ul>
            <li><strong>About {props.countryProps.data[0].name}:</strong></li>
            <li>Country name: {props.countryProps.data[0].altSpellings[2]} ({props.countryProps.data[0].altSpellings[1]})</li>
            <li>Capital: {props.countryProps.data[0].capital}</li>
            <li>Population: {props.countryProps.data[0].population}</li>
            <li>National flag: <img src={props.countryProps.data[0].flag} alt={props.countryProps.data[0].name} width = '50rem' ></img></li>
          </ul>
          </div>
        </div>
    )
}


// </div>  <p>Country: {countryProps[0].altSpellings[2]}</p> 