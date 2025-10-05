import { get } from "./api";

const HOTELS = "/hotels";

const getAvailablesHotels = async (queryPath: string): Promise<any> =>
    await get(`${HOTELS}/p-availabilities?${queryPath}`);
const getHotelById = async (id: string, date: string): Promise<any> =>
    await get(`${HOTELS}/p-hotel/${id}?date=${date}`);

export { getAvailablesHotels, getHotelById };
