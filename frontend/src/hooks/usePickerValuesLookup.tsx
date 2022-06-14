import React from "react";
import { apiAxios } from "../utils";
import { useQuery } from "react-query";

export const formatLookupPicker = (
  tableData: any,
  pickerLabelObjProp: string,
  pickerValueObjProp: string
) => {
  return new Promise((resolve) => {
    const test = () => {
      const pickerValues = tableData.data.map((picker: any) => {
        return {
          label: picker[pickerLabelObjProp],
          value: picker[pickerValueObjProp],
        };
      });
      return pickerValues;
    };
    resolve(test);
  });
};

export const usePickerValuesLookup = ({
  tableName,
  pickerLabelObjProp,
  pickerValueObjProp,
}: {
  tableName: string;
  pickerLabelObjProp: string;
  pickerValueObjProp: string;
}) => {
  const getPickerLookup = async () => {
    const allPickers = await apiAxios()
      .get(tableName)
      .then((tableData) => {
        return formatLookupPicker(tableData, pickerLabelObjProp, pickerValueObjProp);
      });
    return allPickers;
  };

  // Queries
  const { data, isLoading } = useQuery(`${tableName}-pickers`, getPickerLookup, {
    staleTime: 10000,
  });
  console.log("data", data);
  return { data, isLoading };
};
