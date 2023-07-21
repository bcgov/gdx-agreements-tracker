import { useAxios } from "hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

interface IGetFormData {
  url: string;
  tableName: string;
}

export const useFormData = ({ url, tableName }: IGetFormData) => {
  const { axiosAll } = useAxios();
  const getData = async () => {
    const results = (await axiosAll().get(url)) ?? {};
    results.data.table = tableName;
    return results;
  };

  const query = useQuery([tableName, "form", url], getData, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });

  return query;
};
