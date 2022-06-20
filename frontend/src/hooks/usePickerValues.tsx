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
      tableData.data.forEach(async (item: any) => {
        if (!pickersByGroup.pickers[item.associated_table]) {
          pickersByGroup.pickers[item.associated_table] = {};
        }
        pickersByGroup.pickers[item.associated_table][item.name] = item;
      });
      return pickersByGroup;
    };
    console.log('groupByCategory', groupByCategory())
    resolve(groupByCategory());
  });
};

export const usePickerValues = () => {
  const getTableData = async () => {
    const allPickers = await apiAxios()
      .get("picker_options")
      .then((tableData) => {
        console.log('tableData', tableData)
        return formatPickerOptions(tableData);
      });
    return allPickers;
  };

  // Queries
  const { data, isLoading } = useQuery("picker_options", getTableData, { staleTime: 10000 });
  return { data, isLoading };
};
