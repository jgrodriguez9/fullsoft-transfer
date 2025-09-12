import { ZoneList } from "@/types";
import { get } from "./api";

const ZONE = "/zone";
const DESTINY = "/destiny";

const getZones = async (queryPath: string): Promise<ZoneList> =>
  await get(`${ZONE}/p-take?${queryPath}`);

const getDestinies = async (queryPath: string): Promise<any> =>
  await get(`${DESTINY}/p-take?${queryPath}`);

export { getZones, getDestinies };
