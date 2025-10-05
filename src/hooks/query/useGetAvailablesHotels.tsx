import { getAvailablesHotels } from "@/services/daypass";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetAvailablesHotels = (queryPath: string) => {
  // Logic for fetching available transfers
  const query = useQuery({
    queryKey: ["getAvailablesHotels", queryPath],
    queryFn: () => getAvailablesHotels(queryPath),
    placeholderData: keepPreviousData,
  });

  return query;
};

export default useGetAvailablesHotels;
