import { useLayoutEffect, useState } from "react";
import { apiAxios } from "../utils";
import { IColumn, ITableData } from "../types";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

/**
 * Formats data from a database table in a way that is usable for material ui datagrid (table).
 *
 * @param {Array<object>} tableData data from a database table.
 * @example tableData.data = [ {id:1,name:"sara"} , {id:2,name:"jim"} ]
 */

// Export this function for unit testing.
export const formatTableColumns = (tableData: ITableData, tableName?: string) => {
  return new Promise((resolve) => {
    const formattedColumns: Array<Object> = [
      {
        field: "edit",
        headerName: "",
        sortable: false,
        renderCell: (cellValues: { id: number }) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {}}
              component={Link}
              to={`/${tableName}/${cellValues.id}`}
            >
              View
            </Button>
          );
        },
      },
    ];

    Object.entries(tableData.data[0]).forEach((value, index) => {
      formattedColumns.push({
        field: value[0],
        headerName: value[0]
          .split("_")
          .join(" ")
          .replace(/(?:^|\s)\S/g, (a: string) => a.toUpperCase()),
        flex: 1,
        id: index,
      });
    });

    resolve(formattedColumns);
  });
};

export const useFormatTableData = (tableName: string) => {
  const [columns, setColumns] = useState<IColumn[]>([
    { id: 0, field: "loading", headerName: "loading", flex: 1 },
  ]);
  const [rows, setRows] = useState([{ id: 0 }]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    apiAxios()
      .get(tableName)
      .then((tableData) => {
        setRows(tableData.data);
        /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
        // todo: Define a good type. "Any" type temporarily permitted.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatTableColumns(tableData, tableName).then((formattedColumns: any) => {
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
