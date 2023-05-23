import { AxiosResponse } from "axios";
import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";
import { IEditField } from "types";

export const formConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        {
          width: "full",
          title: "Category",
          value: query?.data?.data?.data?.lesson_category_id?.label,
        },
        {
          width: "full",
          title: "Lesson Sub Category",
          value: query?.data?.data?.data?.lesson_sub_category,
        },
        {
          width: "full",
          title: "Lesson",
          value: query?.data?.data?.data?.lesson,
        },
        {
          width: "half",
          title: "Recommendations",
          value: query?.data?.data?.data?.recommendations,
        },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "lesson_category_id",
      fieldType: "select",
      fieldLabel: "Category",
      width: "full",
      pickerName: "lesson_category_option",
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

  const project_id = query?.data?.data?.data?.project_id;

  const initialValues = {
    lesson_category_id: "",
    lesson_sub_category: "",
    lesson: "",
    recommendations: "",
    project_id: project_id,
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const queryKey = `/projects/${project_id}/lessons-learned/${query?.data?.data?.data?.id}`;
  const postUrl = `/lessons-learned`;
  const updateUrl = `/projects/${project_id}/lessons-learned/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, queryKey, postUrl, updateUrl };
};
