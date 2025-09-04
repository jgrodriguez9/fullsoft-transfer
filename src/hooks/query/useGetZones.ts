import { getZones } from "@/services/zone";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetZones = (queryPath: string) => {
  const query = useQuery({
    queryKey: ["getZones", queryPath],
    queryFn: () => getZones(queryPath),
    placeholderData: keepPreviousData,
  });

  return query;
};

export default useGetZones;
