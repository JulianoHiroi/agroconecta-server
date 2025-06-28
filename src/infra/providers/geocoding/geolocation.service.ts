abstract class GeoLocationService {
  abstract getCoordinates(address: string): Promise<{ lat: number, lng: number }>;
}

export default GeoLocationService;
