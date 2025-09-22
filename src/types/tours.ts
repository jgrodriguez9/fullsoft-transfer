export interface ToursQueryDTO {
  page: number;
  limit: number;
  destiny: string;
  //pax: number;
  sort?: string;
  date: string;
}

export interface TourImageDTO {
  publicUrl: string;
  publicId: string;
  _id?: string;
}

export interface StartHoursByDayDTO {
  [key: number]: string[]; // 0 (Sunday) to 6 (Saturday)
}

export interface TourDTO {
  _id: string;
  name: string;
  description: string;
  durationHours: number;
  price: number;
  currency: "USD" | "MXN"; // extend as needed
  isShared: boolean;
  capacity: number;
  includes: string[];
  notIncludes: string[];
  languageAvailables: ("es" | "en")[];
  type: string[]; // could be narrowed to 'cultural' | 'family' | etc.
  image: TourImageDTO;
  images: TourImageDTO[];
  active: boolean;
  hoursToBooking: number;
  daysAvailable: number[]; // 0–6
  startHoursByDay: StartHoursByDayDTO;
  createdAt: string; // ISO date
  updatedAt: string;
  __v: number;
  destiny: string;
  bookings: unknown[]; // define if you have booking schema
  availableHours: string[];
}
