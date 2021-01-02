import React from 'react'
import './InfoWindow.css'

export default function InfoWindow(props) {
  const { mode, IP_Info } = props.searchByIp
  const {
    housenumber,
    street,
    postcode,
    city,
    county,
    state,
    country,
  } = props.positionData.properties
  // console.log(props.positionData.properties)
  const altSpellingsName = props.extraCountryInfo.data[0].altSpellings[1]
  const {
    area,
    capital,
    flag,
    population,
    callingCodes,
  } = props.extraCountryInfo.data[0]

  return (
    <div className="infoWindow-wrapper">
      <h1>Where am I?</h1>
      <h3>Welcome visitor, here are some info about your position.</h3>
      <h3>Click around to get more...</h3>
      <p>
        Locating by: <span>{mode}</span> | IP-Info: <span>{IP_Info}</span>
      </p>
      <p>
        Address:{' '}
        <span>
          {street} {housenumber}, {postcode} {city}
        </span>
      </p>
      <p>
        County: <span>{county}</span> | State: <span>{state}</span> | Country:{' '}
        <span>{country}</span>
      </p>
      <h3>Country side info</h3>
      <p>
        Official name: <span>{altSpellingsName}</span>
      </p>
      <p>
        Capital: <span>{capital}</span>
      </p>
      <p>
        Calling code: <span>{callingCodes}</span> | Population:{' '}
        <span>{population}</span> | Area: <span>{area}km²</span>
      </p>
      <img className="countryFlag" src={`${flag}`} alt="Flag n/d" />
    </div>
  )
}
