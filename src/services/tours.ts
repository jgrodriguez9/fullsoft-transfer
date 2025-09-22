import { get, post } from "./api";

const TOURS = "/tours";
const TOURS_BOOKED = "/tours-booked";

const getAvailablesTours = async (queryPath: string): Promise<any> =>
  await get(`${TOURS}/p-availabilities?${queryPath}`);
const getTourById = async (id: string): Promise<any> =>
  await get(`${TOURS}/p-tour/${id}`);
const createTourReservation = async (data: any): Promise<any> =>
  await post(`${TOURS_BOOKED}`, data);

export { getAvailablesTours, getTourById, createTourReservation };
