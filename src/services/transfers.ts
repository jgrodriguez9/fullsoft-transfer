import { get } from "./api";

const TRANSFER = "/transfer";

const getAvailablesTransfers = async (queryPath: string): Promise<any> =>
  await get(`${TRANSFER}/p-availabilities?${queryPath}`);

export { getAvailablesTransfers };
