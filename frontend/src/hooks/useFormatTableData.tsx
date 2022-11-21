import { useQuery } from "react-query";
import { ITableData } from "../types";
import { Button, Chip, IconButton, styled } from "@mui/material";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import React from "react";
import { useAxios } from "./useAxios";
import { TableHealthChip } from "components/TableComplete/TableHealthChip";

/**
 * Formats data from a database table in a way that is usable for material ui datagrid (table).
 *
 * @param {Array<object>} tableData data from a database table.
 * @example tableData.data = [ {id:1,name:"sara"} , {id:2,name:"jim"} ]
 */

// Export this function for unit testing.
export const formatTableColumns = (
  tableData: ITableData,
  tableName?: string,
  handleClick?: Function,
  columnWidths?: { [key: string]: number }
) => {
  return new Promise((resolve) => {
    const formattedColumns: Array<Object> = [
      {
        field: "edit",
        headerName: "",
        maxWidth: 60,
        renderCell: (cellValues: { id: number }) => {
          return (
            <IconButton
              onClick={
                // If the handleClick function does not exist, render a Button else render the link component
                !handleClick
                  ? undefined
                  : () => {
                      handleClick(cellValues);
                    }
              }
              // If the handleClick function does not exist, render a Button else render the link component
              component={!handleClick ? Link : Button}
              // If the handlClick function does not exist, apply to property else apply undefined
              to={!handleClick ? `/${tableName}/${cellValues.id}` : undefined}
            >
              <RemoveRedEyeIcon />
            </IconButton>
          );
        },
      },
    ];
    Object.entries(tableData.data.data[0]).forEach((value, index) => {
      let columnFlex = 1;
      if (columnWidths && columnWidths[value[0]]) {
        columnFlex = columnWidths[value[0]];
      }
      formattedColumns.push({
        hide: "id" === value[0] && true,
        field: value[0],
        headerName: value[0]
          .split("_")
          .join(" ")
          .replace(/(?:^|\s)\S/g, (a: string) => a.toUpperCase()),
        flex: columnFlex,
        id: index,
        renderCell: (cellValues: { id: number }) => {
          if (
            value[1]?.red !== undefined &&
            value[1]?.green !== undefined &&
            value[1]?.blue !== undefined
          ) {
            return <TableHealthChip variant="outlined" colors={value[1]} />;
          }
        },
      });
    });

    resolve({ columns: formattedColumns, rows: tableData.data.data, user: tableData.data?.user });
  });
};

export const useFormatTableData = ({
  tableName,
  apiEndPoint,
  handleClick,
  columnWidths,
}: {
  tableName: string;
  apiEndPoint: string;
  handleClick?: Function;
  columnWidths?: { [key: string]: number };
}) => {
  // const handleCurrentUser = async () => {
  //   if (initialized) {
  //     const currentUser = (await axiosAll())
  //       .post(`users/email`, { email: keycloak?.tokenParsed?.email })
  //       .then((user) => {
  //         return user;
  //       });
  //     return currentUser;
  //   }
  // };
  const { axiosAll } = useAxios();
  const getTableData = async () => {
    const allProjects = (await axiosAll())
      .get(apiEndPoint)
      .then((tableData: ITableData) => {
        switch (tableData.data.data.length) {
          case 0:
            return { columns: [], rows: [], user: tableData.data?.user };

          default:
            return formatTableColumns(tableData, tableName, handleClick, columnWidths);
        }
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
      });
    return allProjects;
  };

  // Queries
  //Destructure the keycloak functionality
  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading } = useQuery<any>(apiEndPoint, getTableData, {
    refetchOnMount: "always",
  });
  return { data, isLoading };
};
