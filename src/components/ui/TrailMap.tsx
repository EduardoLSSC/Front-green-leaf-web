"use client";

import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type TrailMapProps = {
  path: [number, number][];
  className?: string; // Adicionado para suportar className
};

const TrailMap = ({ path, className }: TrailMapProps) => {
  // Corrigir o formato para [latitude, longitude]
  const correctedPath = path.map(([longitude, latitude]) => [latitude, longitude] as [number, number]);

  // Determinar o centro do mapa com base no primeiro ponto
  const center: [number, number] = correctedPath.length > 0 ? correctedPath[0] : [0, 0];

  return (
    <MapContainer center={center} zoom={14} className={className || ""} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Polyline positions={correctedPath} color="blue" />
    </MapContainer>
  );
};

export default TrailMap;
