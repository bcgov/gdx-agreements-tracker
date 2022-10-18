import { useQuery } from "react-query";
import { ITableData } from "../types";
import { Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useAxios } from "./useAxios";

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
  handleDelete?: Function,
  columnWidths?: Object
) => {
  /**
   * Small helper function to check if key exists and to make the typescript linter happy.
   *
   * @param   {O}           obj The object to check if has key.
   * @param   {PropertyKey} key The key to check for.
   * @returns {boolean}
   */
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
    // todo: Convert to an arrow function.
    return key in obj;
  }

  /**
   * This allows the field columnWidths to be passed that adjusts the flex value for > 1.
   *
   * @param   {PropertyKey} field The field key to check for.
   * @returns {number}
   */
  const getFlexValue = (field: PropertyKey) => {
    columnWidths = columnWidths ?? {};
    let flexWidth = 1;
    if (hasKey(columnWidths, field)) {
      flexWidth = Number(columnWidths[field]);
    }

    return flexWidth;
  };

  return new Promise((resolve) => {
    const formattedColumns: Array<Object> = [
      {
        field: "edit",
        headerName: "",
        sortable: false,
        filterable: false,
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

    if (handleDelete !== undefined) {
      formattedColumns.push({
        field: "delete",
        headerName: "",
        sortable: false,
        filterable: false,
        maxWidth: 60,
        renderCell: (cellValues: { id: number }) => {
          return (
            <IconButton
              onClick={() => {
                handleDelete(cellValues.id);
              }}
              size="small"
              component={Button}
            >
              <DeleteIcon />
            </IconButton>
          );
        },
      });
    }

    Object.entries(tableData.data.data[0]).forEach((value, index) => {
      formattedColumns.push({
        hide: "id" === value[0] && true,
        field: value[0],
        headerName: value[0]
          .split("_")
          .join(" ")
          .replace(/(?:^|\s)\S/g, (a: string) => a.toUpperCase()),
        flex: getFlexValue(value[0]),
        id: index,
        sortable: false,
        filterable: false,
      });
    });

    resolve({ columns: formattedColumns, rows: tableData.data.data, user: tableData.data?.user });
  });
};

export const useFormatTableData = ({
  tableName,
  apiEndPoint,
  handleClick,
  handleDelete,
  columnWidths,
}: {
  tableName: string;
  apiEndPoint: string;
  handleClick?: Function;
  handleDelete?: Function;
  columnWidths?: Object;
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
            return formatTableColumns(
              tableData,
              tableName,
              handleClick,
              handleDelete,
              columnWidths
            );
        }
      })
      .catch((error) => {
        switch (error.toJSON().status) {
          case 404:
            console.error(error.toJSON());
            return { columns: [], rows: [] };

          case 500:
            console.error(error.toJSON());
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
