import GeoLocationService from "../geolocation.service";
import axios from "axios";

class geoLocationGeoCodingService implements GeoLocationService {
    private readonly apiKey: string;
    constructor() {
        this.apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
        if (!this.apiKey) {
            throw new Error('Google Maps API key is not configured.');
        }
    }
  async getCoordinates(address: string): Promise<{ lat: number, lng: number }> {
  
  const encodedAddress = encodeURIComponent(address);

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${this.apiKey}`;
console.log(url)
  const response = await axios.get(url);
    console.log(response.data)
  if (response.data.status !== 'OK') {
    throw new Error('Erro ao buscar coordenadas.');
  }

  const location = response.data.results[0].geometry.location;

  return {
    lat: location.lat,
    lng: location.lng,
  };
    }
}

export default geoLocationGeoCodingService;