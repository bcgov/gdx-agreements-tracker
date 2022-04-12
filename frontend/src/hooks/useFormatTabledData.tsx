import React, { useEffect, useRef, useState } from "react";
import { apiAxios } from "../utils";

interface column {
  id: number;
  [otherProperties: string | number]: unknown;
}

export const useFormatTabledData = () => {
  const [columns, setColumns] = useState<any>([{ id: 0 }]);
  const [rows, setRows] = useState([{ id: 0 }]);

  useEffect(() => {
    apiAxios()
      .get("suppliers")
      .then((tableData: any) => {
        const columnNames = Object.getOwnPropertyNames(tableData.data[0]);
        const columns = tableData.data.map((column: column, index: number) => {
          return {
            field: columnNames[index],
            headerName: columnNames[index] //This function replaces underscores with spaces and sets the first letter of every word in the string to a capital example: test_string = Test String
              .split("_")
              .join(" ")
              .replace(/(?:^|\s)\S/g, function (a) {  
                return a.toUpperCase();
              }),
            width: 200,
          };
        });
        setColumns(columns);
        console.log("columns", columns);
        console.log("tableData.data", tableData.data);
        setRows(tableData.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return { rows, columns };
};

/**Rows
 * [{
    lastName: "James",
    firstName: "Fred",
    jobTitle: "Sr. Developer",
    MinistryId: "AEST",
    Notes: "",
    id: 1,
  }]
 * 
 */

/**columns
 [{ field: "lastName", headerName: "Last Name", width: 150 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "jobTitle", headerName: "Job Title", width: 150 },
  { field: "MinistryId", headerName: "Ministry ID", width: 150 },
  { field: "Notes", headerName: "Notes", width: 150 }]
   */
