import { ZoneList } from "@/types";
import { get } from "./api";

const ZONE = "/zone";

const getZones = async (queryPath: string): Promise<ZoneList> =>
  await get(`${ZONE}/p-take?${queryPath}`);

export { getZones };
