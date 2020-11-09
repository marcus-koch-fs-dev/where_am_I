import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './Body.css'

export default function Body(props) {
  // console.log(props)  
  return (
    <div id="mapid">
      <MapContainer
        center={[props.position.lat, props.position.lng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[props.position.lat, props.position.lng]}>
          <Popup>
          Your position<br /><strong>{props.position.city}</strong> 
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
