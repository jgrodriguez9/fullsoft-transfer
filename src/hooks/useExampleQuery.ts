import { useQuery } from "@tanstack/react-query";
import axios from "../services/api";

const fetchExampleData = async () => {
  const response = await axios.get("/example-endpoint");
  return response.data;
};

const useExampleQuery = () => {
  return useQuery({
    queryKey: ["exampleData"],
    queryFn: fetchExampleData,
  });
};

export default useExampleQuery;
