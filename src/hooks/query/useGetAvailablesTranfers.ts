import { getAvailablesTransfers } from "@/services/transfers";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetAvailablesTranfers = (queryPath: string) => {
  // Logic for fetching available transfers
  const query = useQuery({
    queryKey: ["getAvailablesTransfers", queryPath],
    queryFn: () => getAvailablesTransfers(queryPath),
    placeholderData: keepPreviousData,
  });

  return query;
};

export default useGetAvailablesTranfers;
