import { IEditFields } from "types";

/**
 * The edit fields.
 *
 * @returns {Array}
 */
export const editFields: () => IEditFields[] = () => {
  return [
    {
      fieldName: "supplier_id",
      fieldType: "select",
      fieldLabel: "Supplier",
      width: "half",
      tableName: "resource",
    },
    {
      fieldName: "subcontractor_id",
      fieldType: "select",
      fieldLabel: "Subcontractor",
      width: "half",
      tableName: "resource",
    },
    {
      fieldName: "resource_first_name",
      fieldType: "singleText",
      fieldLabel: "First Name",
      width: "half",
    },
    {
      fieldName: "resource_last_name",
      fieldType: "singleText",
      fieldLabel: "Last Name",
      width: "half",
    },
  ];
};
