type Coordinates = {
  lng: number
  lat: number
}

async function getRouteTimeAndDistance(
  startRoute: Coordinates,
  endRoute: Coordinates
): Promise<{ duration: number; distance: number }> {
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${startRoute.lng}%2C${startRoute.lat}%3B${endRoute.lng}%2C${endRoute.lat}?alternatives=false&geometries=geojson&steps=false&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
    { method: 'GET' }
  )
  const json = await query.json()

  return {
    duration: json.routes[0].duration,
    distance: json.routes[0].distance
  }
}

export { getRouteTimeAndDistance }
