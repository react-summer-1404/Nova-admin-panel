import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";


function LocateButton({ setPosition }) {
  const map = useMap();

  const handleClick = () => {
    map.locate().once("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  };

  return (
    <button
    type="button"
      style={{
        position: "absolute",
        zIndex: 1000,
        bottom: "20px",
        right: "20px",
        backgroundColor: "white",
        color: "#6c757d",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        transition: "all 0.2s",
      }}
      onClick={handleClick}
    >
      لوکیشن من
    </button>
  );
}

function LocationFinderDummy({ setPosition }) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return null;
}

function MapComponent({ position, setPosition }) {
  console.log(position);
  return (
    <div style={{ height: "100%", width: "100%", borderRadius: "10px" }}>
      <MapContainer
        center={[36.5633, 53.0601]}
        zoom={14}
        scrollWheelZoom={true}
        zoomControl={true}
        style={{ height: "100%", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationFinderDummy setPosition={setPosition} />
        <LocateButton setPosition={setPosition} />

        {position && (
          <Marker position={position}>
            <Popup>📍 موقعیت مکانی شما</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default MapComponent;
