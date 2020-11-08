
import React from 'react';
import "./Header.css";

export default function Country(props) {
    // console.log(props.ipApi.data);
    // console.log(props.countryProps);
   
    return (
        <div className = "header-position">
          <div className = "header-position-position">
          <h1>Where am I?</h1>
          <p>Welcome, this is your current {<strong>IP: {props.ipApi.data.query}</strong>}</p>
          <p>Your are currently located in {<strong>"{props.ipApi.data.city}"</strong>} ({props.ipApi.data.regionName})</p>
          <p>Your geographical position is {<strong>Lat.:</strong>} {props.ipApi.data.lat} | {<strong>Lon.:</strong>} {props.ipApi.data.lon} </p>
          <p>The region {props.ipApi.data.regionName} is a subregion of {<span>{props.ipApi.data.country}</span>}</p>
          </div>
          <div className ="header-position-about">
          <ul>
            <li><strong>About {props.ipApi.data.country}:</strong></li>
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