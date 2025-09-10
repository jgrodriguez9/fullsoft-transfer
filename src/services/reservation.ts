import { post } from "./api";

const TRANSFER_RESERVATION = "/transfer-reservation";

const createTransferReservation = async (data: any): Promise<any> =>
  await post(`${TRANSFER_RESERVATION}`, data);

export { createTransferReservation };
