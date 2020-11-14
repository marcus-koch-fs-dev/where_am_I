import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './Body.css'

export default function Body(props) {
  // console.log(props)  
  return (
    <div id="mapid">
      <MapContainer
        center={[props.geoPosition.lat, props.geoPosition.lng]}
        zoom={13}
        scrollWheelZoom={true}
        >
        {console.log("re render",props.geoPosition.lat, props.geoPosition.lng)}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[props.geoPosition.lat, props.geoPosition.lng]}>
          <Popup>
          Your are here 
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
