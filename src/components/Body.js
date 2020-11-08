import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './Body.css'

export default function Body(props) {
    return (
    <div id="mapid">
      <MapContainer
        center={[props.ipApi.data.lat, props.ipApi.data.lon]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[props.ipApi.data.lat, props.ipApi.data.lon]}>
          <Popup>
          Your position<br /><strong>{props.ipApi.data.city}</strong> 
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
