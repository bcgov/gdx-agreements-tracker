import { apiAxios } from "../utils";
import { useQuery } from "react-query";
import { ITableData } from "../types";
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

    resolve({ columns: formattedColumns, rows: tableData.data });
  });
};

export const useFormatTableData = ({
  tableName,
  ApiEndPoint,
}: {
  tableName: string;
  ApiEndPoint: string;
}) => {
  const getTableData = async () => {
    const allProjects = await apiAxios()
      .get(ApiEndPoint)
      .then((tableData) => {
        return formatTableColumns(tableData, tableName);
      })
      .catch((error) => {
        switch (error.toJSON().status) {
          case 404:
            console.error(error.toJSON());
            return { columns: [], data: [] };

          case 500:
            console.error(error.toJSON());
            return { columns: [], data: [] };
        }
      });
    return allProjects;
  };

  // Queries
  //Destructure the keycloak functionality
  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading } = useQuery<any>(ApiEndPoint, getTableData, {
    refetchOnMount: "always",
  });
  return { data, isLoading };
};
