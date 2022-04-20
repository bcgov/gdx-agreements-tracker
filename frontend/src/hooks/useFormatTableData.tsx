import { useLayoutEffect, useState } from "react";
import { apiAxios } from "../utils";
import { column, tableData } from "../types/table.types";

/**
 * Formats data from a database table in a way that is usable for material ui datagrid (table).
 * @param {Array<Object>} tableData data from a database table.
 * @example tableData.data = [ {id:1,name:"sara"} , {id:2,name:"jim"} ]
 *
 */

// Export this function for unit testing.
export const formatTableColumns = (tableData: tableData) => {
  return new Promise((resolve) => {
    let formattedColumns: Array<Object> = [];
    Object.entries(tableData.data[0]).forEach((value, index) => {
      formattedColumns.push({
        field: value[0],
        headerName: value[0]
          .split("_")
          .join(" ")
          .replace(/(?:^|\s)\S/g, function (a: string) {
            return a.toUpperCase();
          }),
        width: 200,
        id: index,
      });
    });
    resolve(formattedColumns);
  });
};

export const useFormatTableData = (tableName: string) => {
  const [columns, setColumns] = useState<column[]>([
    { id: 0, field: "loading", headerName: "loading", width: 150 },
  ]);
  const [rows, setRows] = useState([{ id: 0 }]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    apiAxios()
      .get(tableName)
      .then((tableData) => {
        setRows(tableData.data);
        formatTableColumns(tableData).then((formattedColumns: any) => {
          setColumns(formattedColumns);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error(error);
      }); //! TODO: We had to ignore react-hooks/exhaustive-deps because of error "React Hook useLayoutEffect has a missing dependency: 'tableName'. Either include it or remove the dependency array" ref: https://exerror.com/react-hook-useeffect-has-a-missing-dependency/
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return { rows, columns, loading };
};
