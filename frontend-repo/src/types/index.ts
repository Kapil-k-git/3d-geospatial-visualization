export interface GeoPoint {
  id: number;
  name: string;
  lat: number;
  lon: number;
  category: string;
  value: number;
}

export interface ApiResponse {
  success: boolean;
  count: number;
  data: GeoPoint[];
  bbox?: {
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
  };
}