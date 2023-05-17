import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { LatLngExpression, latLng, point } from "leaflet";
import {
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  TileLayer,
} from "react-leaflet";

const MapComponent = () => {
  const [points, setPoints] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    mappatore();
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  function mappatore() {
    let startingPoint = {
      lat: 41.025,
      lng: 14.9279,
    };

    let actualPosition = { ...startingPoint };

    let percorso: any = [];

    for (let i = 0; i < 10; i++) {
      actualPosition.lng = actualPosition.lng - 0.0001;
      percorso.push(JSON.parse(JSON.stringify(actualPosition)));
      for (let j = 0; j < 9; j++) {
        if (i % 2 === 0) {
          actualPosition.lat = actualPosition.lat + 0.0001;
        } else {
          actualPosition.lat = actualPosition.lat - 0.0001;
        }
        percorso.push(JSON.parse(JSON.stringify(actualPosition)));
      }
    }

    console.log(percorso);
    setPoints(percorso);
  }

  const poligono = [
    { lat: 41.0259, lng: 14.9279 },
    { lat: 41.0259, lng: 14.9269 },
    { lat: 41.025, lng: 14.9269 },
    { lat: 41.025, lng: 14.9279 },
  ];

  const currentPoints = points.slice(0, currentIndex);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        center={[41.0246, 14.9282]}
        zoom={15}
        maxZoom={20}
        scrollWheelZoom={true}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
          attribution="Map data &copy; Google"
        ></TileLayer>
        <Polyline positions={currentPoints} color="red" pane="overlayPane" />
        <Polygon positions={poligono} pane="mapPane"></Polygon>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
