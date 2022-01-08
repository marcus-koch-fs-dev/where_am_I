// import './InfoWindow.css'
import { getPositionInfo } from '../../api'
import { useContext, useEffect, useState } from 'react'
import { DataReverseGeoCode } from 'types/apiTypes'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography
} from '@mui/material'
import { PositionContext } from 'context/positionContext'

export const InfoCard = () => {
  const [positionInfo, setPositionInfo] = useState<DataReverseGeoCode>()
  const { coordinates } = useContext(PositionContext)

  useEffect(() => {
    if (!coordinates) return
    getPositionInfo(coordinates)
      .then((data: DataReverseGeoCode) => {
        console.log('res', data)
        setPositionInfo(data)
      })
      .catch((err) => console.error(err))
  }, [coordinates])

  const renderInfoCard = (positionInfo: DataReverseGeoCode) => {
    const { features } = positionInfo

    return features.map((item) => {
      const {
        address_line1,
        postcode,
        city,
        country,
        country_code,
        state,
        county,
        district,
        subUrb,
        lat,
        lon,
        place_id
      } = item.properties

      return (
        <Card key={place_id}>
          <CardActionArea>
            <Typography sx={{ fontSize: '0.5' }}>Where am I?</Typography>
            <CardMedia
              component="img"
              height="60"
              image={`https://flagcdn.com/${country_code}.svg`}
              alt={country}
            />
            <CardContent>
              <Typography sx={{ fontSize: '0.5' }}>
                {`${address_line1}`}
              </Typography>
              <Typography sx={{ fontSize: '0.5' }}>
                {`${postcode} ${city}, ${country}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <List>
                  <h3>{`Lat: ${lat.toFixed(3)} Lng: ${lon.toFixed(3)}`}</h3>
                  <ListItem>{`Country: ${country}`}</ListItem>
                  <ListItem>{`State: ${state}`}</ListItem>
                  <ListItem>{`County: ${county}`}</ListItem>
                  <ListItem>{`District: ${district}`}</ListItem>
                </List>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )
    })
  }

  return <>{positionInfo && renderInfoCard(positionInfo)}</>
}
//* template from previous version
/* <h3>Welcome visitor, here are some info about your position.</h3>
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
    <img className='countryFlag' src={`${flag}`} alt='Flag n/d' /> */
