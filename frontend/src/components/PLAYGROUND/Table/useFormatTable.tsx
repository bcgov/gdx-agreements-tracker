import React from "react";
import { useQuery } from "react-query";
import { ITableData } from "../../../types";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { TableHealthChip } from "components/TableComplete/TableHealthChip";
import { useAxios } from "hooks/useAxios";
// import { TableHealthChip } from "components/TableComplete/TableHealthChip";

/**
 * Formats data from a database table in a way that is usable for material ui datagrid (table).
 *
 * @param {Array<object>} tableData data from a database table.
 * @example tableData.data = [ {id:1,name:"sara"} , {id:2,name:"jim"} ]
 */

// Export this function for unit testing.
// export const formatTableColumns = (
//   tableData: ITableData,
//   tableName?: string,
//   handleClick?: Function,
//   columnWidths?: { [key: string]: number }
// ) => {
//   return new Promise((resolve) => {
//     const formattedColumns: Array<Object> = [
//       {
//         field: "edit",
//         headerName: "",
//         maxWidth: 60,
//         renderCell: (cellValues: { id: number }) => {
//           return (
//             <IconButton
//               onClick={
//                 // If the handleClick function does not exist, render a Button else render the link component
//                 !handleClick
//                   ? undefined
//                   : () => {
//                     handleClick(cellValues);
//                   }
//               }
//               // If the handleClick function does not exist, render a Button else render the link component
//               component={!handleClick ? Link : Button}
//               // If the handlClick function does not exist, apply to property else apply undefined
//               to={!handleClick ? `/${tableName}/${cellValues.id}` : undefined}
//             >
//               <RemoveRedEyeIcon />
//             </IconButton>
//           );
//         },
//       },
//     ];
//     Object.entries(tableData.data.data[0]).forEach((value, index) => {
//       let columnFlex = 1;
//       if (columnWidths && columnWidths[value[0]]) {
//         columnFlex = columnWidths[value[0]];
//       }

//       const fColumn = {
//         hide: "id" === value[0] && true,
//         field: value[0],
//         headerName: value[0]
//           .split("_")
//           .join(" ")
//           .replace(/(?:^|\s)\S/g, (a: string) => a.toUpperCase()),
//         flex: columnFlex,
//         id: index,
//         renderCell: (params: { value: { red: number; green: number; blue: number } }) => {
//           if (
//             params.value &&
//             params.value.red !== undefined &&
//             params.value.green !== undefined &&
//             params.value.blue !== undefined
//           ) {
//             return <TableHealthChip variant="outlined" colors={params.value} />;
//           }
//           if ("boolean" === typeof params.value) {
//             return <Checkbox disabled checked={params.value} />;
//           }
//         },
//       };

//       formattedColumns.push(fColumn);
//     });

//     resolve({ columns: formattedColumns, rows: tableData.data.data, user: tableData.data?.user });
//   });
// };


export const useFormatTableData = ({
  apiEndPoint,
}: {
  apiEndPoint: string;
}) => {
  const { axiosAll } = useAxios();
  const getTableData = async () => {
    const tableData = axiosAll()
      .get(apiEndPoint)
      .then((tableData: any) => {
        return tableData
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
    return tableData;
  };

  // Queries
  //Destructure the keycloak functionality
  const { data, isLoading } = useQuery(apiEndPoint, getTableData, {
    refetchOnMount: "always",
  });
  return { data, isLoading };
};
