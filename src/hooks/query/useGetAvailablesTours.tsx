import { getAvailablesTours } from "@/services/tours";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetAvailablesTours = (queryPath: string) => {
  // Logic for fetching available transfers
  const query = useQuery({
    queryKey: ["getAvailablesTours", queryPath],
    queryFn: () => getAvailablesTours(queryPath),
    placeholderData: keepPreviousData,
  });

  return query;
};

export default useGetAvailablesTours;
