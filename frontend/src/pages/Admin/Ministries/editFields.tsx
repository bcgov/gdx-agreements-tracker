import { IEditFields } from "types";

/**
 * The edit fields.
 *
 * @returns {Array}
 */
export const editFields: () => IEditFields[] = () => {
  return [
    {
      fieldName: "ministry_name",
      fieldType: "singleText",
      fieldLabel: "Name",
      width: "half",
    },
    {
      fieldName: "ministry_short_name",
      fieldType: "singleText",
      fieldLabel: "Abbreviation",
      width: "half",
    },
    {
      fieldName: "is_active",
      fieldType: "checkbox",
      fieldLabel: "Is Active",
      width: "half",
    },
  ];
};
