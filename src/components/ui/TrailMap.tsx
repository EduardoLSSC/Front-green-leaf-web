// src/components/TrailMap.tsx
"use client";

import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type TrailMapProps = {
  path: [number, number][];
};

const TrailMap = ({ path }: TrailMapProps) => {
  // Convert path to [latitude, longitude] format if it's currently [longitude, latitude]
  const correctedPath = path.map(([longitude, latitude]) => [latitude, longitude] as [number, number]);

  // Ensure `center` is correctly derived from the first coordinate in [latitude, longitude] format
  const center: [number, number] = correctedPath.length > 0 ? correctedPath[0] : [0, 0];

  return (
    <MapContainer center={center} zoom={14} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Polyline positions={correctedPath} color="blue" />
    </MapContainer>
  );
};

export default TrailMap;
