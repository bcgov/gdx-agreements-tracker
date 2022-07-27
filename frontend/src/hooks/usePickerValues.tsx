import { apiAxios } from "../utils";
import { useQuery } from "react-query";
import { IPickerTableData } from "../types";

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

export const usePickerValues = () => {
  const getTableData = async () => {
    const allPickers = await apiAxios()
      .get("picker_options")
      .then((tableData) => {
        return formatPickerOptions(tableData);
      });
    return allPickers;
  };

  // Queries
  const { data, isLoading } = useQuery("picker_options", getTableData, {
    // todo: When there is an edit and view form built, reassess these options.
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: Infinity,
  });
  return { data, isLoading };
};
