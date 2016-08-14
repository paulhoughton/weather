interface GoogleGeocodeGeometry {
  geometry: { location: { lat: number, lng: number } };
  formatted_address: string;
}

interface ForecastIODay {
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

interface ForecastIOWeek {
  [index: number]: Array<{
    time:number;
    summary:string;
    icon:string;
    sunriseTime:number;
    sunsetTime:number;
    moonPhase:number;
    precipIntensity:number;
    precipIntensityMax:number;
    precipIntensityMaxTime:number;
    precipProbability:number;
    precipType:string;
    temperatureMin:number;
    temperatureMinTime:number;
    temperatureMax:number;
    temperatureMaxTime:number;
    apparentTemperatureMin:number;
    apparentTemperatureMinTime:number;
    apparentTemperatureMax:number;
    apparentTemperatureMaxTime:number;
    dewPoint:number;
    humidity:number;
    windSpeed:number;
    windBearing:number;
    visibility:number;
    cloudCover:number;
    pressure:number;
    ozone:number;
  }>;
}
