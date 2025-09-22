import { ZoneList } from "@/types";
import { get } from "./api";

const ZONE = "/zone";
const DESTINY = "/destiny";
const TOUR_DESTINY = "/tours-destiny";

const getZones = async (queryPath: string): Promise<ZoneList> =>
  await get(`${ZONE}/p-take?${queryPath}`);

const getDestinies = async (queryPath: string): Promise<any> =>
  await get(`${DESTINY}/p-take?${queryPath}`);

const getTourDestinies = async (queryPath: string): Promise<any> =>
  await get(`${TOUR_DESTINY}/p-take?${queryPath}`);

export { getZones, getDestinies, getTourDestinies };
