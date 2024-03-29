import { useQuery } from "@tanstack/react-query";
import { useAxios } from "hooks/useAxios";

/**
 * Formats data from a database table in a way that is usable for material ui datagrid (table).
 *
 * @param {string} apiEndPoint data from a database table.
 * @example apiEndPoint = 'projects'
 */

export const useFormatTableData = ({
  apiEndPoint,
  tableName,
}: {
  apiEndPoint: string;
  tableName: string;
}) => {
  const { axiosAll } = useAxios();
  const getTableData = async () => {
    return (
      axiosAll()
        .get(apiEndPoint)
        // todo: Define a good type. "Any" type temporarily permitted.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((tableData: any) => {
          return tableData;
        })
        .catch((error) => {
          switch (error.status) {
            case 404:
              console.error(error);
              return { columns: [], rows: [] };

            case 500:
              console.error(error);
              return { columns: [], rows: [] };
          }
        })
    );
  };

  const { data, isLoading } = useQuery([tableName, "table", apiEndPoint], getTableData, {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
  return { data, isLoading };
};
