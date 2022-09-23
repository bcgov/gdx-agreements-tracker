import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditFields } from "types";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} reactQuery The react query data for specific project.
 * @returns {Array}
 */
export const readFields = (reactQuery: UseQueryResult<FormikValues>) => {
  return [
    {
      width: "full",
      title: "Category",
      value: reactQuery?.data?.lesson_category_id?.label,
      tableName: "lesson_category",
    },
    {
      width: "full",
      title: "Lesson Sub Category",
      value: reactQuery?.data?.lesson_sub_category,
    },
    {
      width: "full",
      title: "Lesson",
      value: reactQuery?.data?.lesson,
    },
    {
      width: "half",
      title: "Recommendations",
      value: reactQuery?.data?.recommendations,
    },
  ];
};

/**
 * The edit fields.
 *
 * @returns {Array}
 */
export const editFields: IEditFields[] = [
  {
    fieldName: "lesson_category_id",
    fieldType: "select",
    fieldLabel: "Category",
    width: "full",
    tableName: "project_lesson",
  },
  {
    fieldName: "lesson_sub_category",
    fieldType: "singleText",
    fieldLabel: "Lesson Sub Category",
    width: "full",
  },
  {
    fieldName: "lesson",
    fieldType: "singleText",
    fieldLabel: "Lesson",
    width: "full",
  },
  {
    fieldName: "recommendations",
    fieldType: "singleText",
    fieldLabel: "Recommendations",
    width: "half",
  },
];
