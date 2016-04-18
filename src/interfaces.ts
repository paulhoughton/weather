interface GoogleGeocodeGeometry {
  geometry: { location: { lat: number, lng: number } };
  formatted_address: string;
}

interface ForecastIO {
  offset: number;
  sunrise: number;
  sunset: number;
  hourly: Array<{
    time: number;
    summary: string;
    icon: string;
    precipIntensity: number;
    precipProbability: number;
    temperature: number;
    apparentTemperature: number;
    dewPoint: number;
    humidity: number;
    windSpeed: number;
    windBearing: number;
    visibility: number;
    cloudCover: number;
    pressure: number;
    ozone: number;
  }>;
}
