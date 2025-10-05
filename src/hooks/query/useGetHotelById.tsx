import { getHotelById } from "@/services/daypass";
import { useQuery } from "@tanstack/react-query";

const useGetHotelById = (id: string, date: string) => {
  // Logic for fetching available transfers
  const query = useQuery({
    queryKey: ["getHotelById", id],
    queryFn: () => getHotelById(id, date),
  });

  return query;
};

export default useGetHotelById;
