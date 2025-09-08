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
}
