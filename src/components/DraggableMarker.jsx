import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const DraggableMarker = ({ onMarkerDrag, lat, lon }) => {
  const [position, setPosition] = useState([lat, lon]);
  const handleDrag = (e) => {
    const newPosition = e.target.getLatLng();
    setPosition(newPosition);
    onMarkerDrag(newPosition);
  };
  const MapEvents = () => {
    const map = useMapEvents({
      dragend: () => {},
    });
    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{
        height: "300px",
        width: "67%",
        margin: "1rem auto",
        borderRadius: "2rem",
        zIndex: "0",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEvents />
      <Marker
        draggable={true}
        position={position}
        eventHandlers={{
          dragend: handleDrag,
        }}
      />
    </MapContainer>
  );
};

export default DraggableMarker;
