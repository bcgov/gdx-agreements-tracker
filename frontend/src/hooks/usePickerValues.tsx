import { useQuery } from "@tanstack/react-query";
import { IPickerTableData } from "../types";
import { useAxios } from "./useAxios";
import { useSearchParams } from "react-router-dom";

/**
 * Formats data from a database table in a way that is usable for material ui datagrid (table).
 *
 * @param {Array<object>} tableData data from a database table.
 * @example tableData.data = [ {id:1,name:"sara"} , {id:2,name:"jim"} ]
 */

// Export this function for unit testing.
//groups all pickers by table

export const formatPickerOptions = (tableData: IPickerTableData) => {
  return new Promise((resolve) => {
    const groupByCategory = () => {
      // todo: Define a good type. "Any" type temporarily permitted.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pickersByGroup: any = { pickers: {} };
      // todo: Define a good type. "Any" type temporarily permitted.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tableData.data.data.forEach(async (item: any) => {
        if (!pickersByGroup.pickers[item.associated_form]) {
          pickersByGroup.pickers[item.associated_form] = {};
        }
        pickersByGroup.pickers[item.associated_form][item.name] = item;
      });

      return pickersByGroup;
    };
    resolve(groupByCategory());
  });
};

export const usePickerValues = (projectId: number | undefined, contractId: number | undefined) => {
  const [searchParams] = useSearchParams();
  const params: { [key: string]: string | number } = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const { axiosAll } = useAxios();
  let url = "picker_options";
  if (projectId) {
    url = `picker_options/project/${projectId}`;
  } else if (contractId) {
    url = `picker_options/contract/${contractId}`;
  }

  const getTableData = async () => {
    const allPickers = await axiosAll()
      .get(url, { params })
      .then((tableData) => {
        return formatPickerOptions(tableData);
      });
    return allPickers;
  };

  // Queries
  const { data, isLoading } = useQuery([url], getTableData, {
    // todo: When there is an edit and view form built, reassess these options.
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnMount: "always",
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
  return { data, isLoading };
};
