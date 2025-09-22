import { getTourById } from "@/services/tours";
import { useQuery } from "@tanstack/react-query";

const useGetToursById = (id: string) => {
  // Logic for fetching available transfers
  const query = useQuery({
    queryKey: ["getTourById", id],
    queryFn: () => getTourById(id),
  });

  return query;
};

export default useGetToursById;
