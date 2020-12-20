import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    maxWidth: 390,
  },
  media: {
    height: 250,
  },
});
export default function MediaCard(props) {
    const classes = useStyles();
        
  return (
    <Card className={classes.root} align="center">
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2"align="center" >
          What's my IP?
          </Typography>
          <Typography variant="body2" color="textSecondary"  align="center" component="p" >
          Welcome, this is your current IP: <br/> {<strong>{props.myLocationData.data.ip}</strong>}<br/>
          Due to your IP, your are currently located in:<br/>{<strong>"{props.myLocationData.data.location.city}"</strong>} ({props.myLocationData.data.location.region}) 
          <img src={props.extraCountryInfo.data[0].flag} alt={props.extraCountryInfo.data[0].name} width="22rem" ></img><br/>
          Your geographical position is:<br/>{<strong>Lat.:</strong>} {props.myLocationData.data.location.lat} | {<strong>Lon.:</strong>} {props.myLocationData.data.location.lng}<br/>
          The region {props.myLocationData.data.location.region} is a subregion of {<span>{props.extraCountryInfo.data[0].name}</span>}
          </Typography>
          
          <Typography variant="body2" color="textSecondary"  align="center" component="p">
          <br/><strong>About {props.extraCountryInfo.data[0].name}:</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary"  align="center" component="p">
          Country name: {props.extraCountryInfo.data[0].altSpellings[2]} ({props.extraCountryInfo.data[0].altSpellings[1]})
          </Typography>
          <Typography variant="body2" color="textSecondary"  align="center" component="p">
          Capital: {props.extraCountryInfo.data[0].capital}
          </Typography>
          <Typography variant="body2" color="textSecondary"  align="center" component="p">
          Population: {props.extraCountryInfo.data[0].population}
          </Typography>

        </CardContent>
      <CardActions >

        <Button size="small" color="primary"onClick={getPositionByBrowser} >
          Exact Position Here
        </Button>

      </CardActions>
    </Card>
  );
}