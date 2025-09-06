import { post } from "./api";

const RESERVATION = "/reservations";

const createReservation = async (): Promise<any> =>
  await post(`${RESERVATION}/send-email`);

export { createReservation };
