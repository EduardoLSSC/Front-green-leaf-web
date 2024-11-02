import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

const LocateControl = () => {
  const map = useMap();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');

      import('leaflet.locatecontrol').then(() => {
        if (L.control?.locate) {
          const locateControl = L.control.locate({
            position: 'topright',
            flyTo: true,
            showPopup: false,
            strings: { title: "Voltar para a localização atual" },
            locateOptions: { enableHighAccuracy: true },
          }).addTo(map);

          return () => {
            locateControl.remove();
          };
        }
      }).catch(error => {
        console.error("Erro ao carregar o leaflet.locatecontrol:", error);
      });
    }
  }, [map]);

  return null;
};

export default LocateControl;
