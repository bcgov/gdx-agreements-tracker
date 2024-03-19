import { useQuery } from "@tanstack/react-query";
import { apiAxios } from "utils";

interface IGetFormData {
  url: string;
  tableName: string;
  queryParams?: { [key: string]: string | number };
}

export const useFormData = ({ url, tableName, queryParams }: IGetFormData) => {
  const getData = async () => {
    const results =
      (await apiAxios().get(url, {
        params: queryParams,
      })) ?? {};
    results.data.table = tableName;
    return results;
  };

  const query = useQuery([tableName, "form", url], getData, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
    refetchOnMount: "always"
  });
  
  return query;
};
