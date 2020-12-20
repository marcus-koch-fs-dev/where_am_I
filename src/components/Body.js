import React, {useEffect,useRef} from 'react'
import { MapContainer,TileLayer, Marker, Popup,useMap } from "react-leaflet";
// import 'leaflet/dist/leaflet.css'
import './Body.css'
// import L from "leaflet"
export default function Body(props) {
// const mapBox = useRef()

// useEffect(() => {
//   window.innerWidth = window.innerWidth++
//   console.log(mapBox.current);
// }, [])


  return (
    <div id="mapid">
      <MapContainer
        // center={[props.geoPosition.lat, props.geoPosition.lng]}
        center={[props.geoPosition.lat, props.geoPosition.lng]}
        zoom={13}
        scrollWheelZoom={true}
        // ref={mapBox}
        // style={{height:"300px"}}
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
