import { get, post } from "./api";

const HOTELS = "/hotels";
const HOTELS_BOOKED = "/hotel-day-pass-booked";

const getAvailablesHotels = async (queryPath: string): Promise<any> =>
    await get(`${HOTELS}/p-availabilities?${queryPath}`);
const getHotelById = async (id: string, date: string): Promise<any> =>
    await get(`${HOTELS}/p-hotel/${id}?date=${date}`);
const createHotelDayPassReservation = async (data: any): Promise<any> =>
    await post(`${HOTELS_BOOKED}`, data);

export { getAvailablesHotels, getHotelById, createHotelDayPassReservation };
