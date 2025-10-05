import { get } from "./api";

const HOTELS = "/hotels";

const getAvailablesHotels = async (queryPath: string): Promise<any> =>
    await get(`${HOTELS}/p-availabilities?${queryPath}`);

export { getAvailablesHotels };
