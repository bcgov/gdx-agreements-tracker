import { IEditFields } from "types";

export const editFields: () => IEditFields[] = () => {
  return [
    {
      fieldName: "contract_id",
      fieldType: "number",
      fieldLabel: "Contractd",
      width: "half",
    },
    {
      fieldName: "amendment_number",  //will be a lookup
      fieldType: "number",
      fieldLabel: "Amendment type",
      width: "half",
    },
    {
      fieldName: "amendment_date",
      fieldType: "date",
      fieldLabel: "Amendment Date",
      width: "half",
    },
    {
      fieldName: "description",
      fieldType: "singleText",
      fieldLabel: "Description",
      width: "half",
    },
  ];
};
