const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  // Mean radius of Earth in meters
  const R = 6371008.8; // Improved precision with IUGG value

  // Convert degrees to radians
  const toRadians = (angle: number) => angle * (Math.PI / 180);

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  // Haversine formula with higher precision for trigonometric operations
  const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export default calculateDistance;
