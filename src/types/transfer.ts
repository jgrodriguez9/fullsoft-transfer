export interface VehicleDTO {
  _id: string;
  name: string;
  description: string;
  capacity: number;
  image: string;
  active: boolean;
  price: number;
  currency: "USD" | "MXN" | "EUR";
  vehicleType: string;
  originZone: string;
  destinationZone: string;
  isShared: boolean;
  bags: number;
}

export interface QueryDTO {
  page: number;
  limit: number;
  originZoneId: string;
  destinationZoneId: string;
  pax: number;
  shared?: boolean;
  vehicleType?: string;
  sort?: string;
  date: string;
  time: string;
}
