import React, { useEffect, useRef, useState } from "react";
import { apiAxios } from "../utils";

interface column {
  id: number;
  field: string;
  headerName: string;
  width: number;
  [otherProperties: string | number]: unknown;
}

export const useFormatTabledData = () => {
  const [columns, setColumns] = useState<any>([{ id: 0 }]);
  const [rows, setRows] = useState([{ id: 0 }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiAxios()
      .get("suppliers")
      .then((tableData: any) => {
        const columnNames = Object.getOwnPropertyNames(tableData.data[0]);
        const tempColumns = tableData.data.map((column: column, index: number) => {
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
        setColumns(tempColumns);
        setRows(tableData.data);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  return { rows, columns, loading };
};
