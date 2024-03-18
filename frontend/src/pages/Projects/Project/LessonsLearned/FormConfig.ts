import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";
import { useParams } from "react-router";
import { object, string } from "yup";
import keycloak from "keycloak";
import { useAuthorization } from "hooks/useAuthorization";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const { projectId } = useParams();

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
      required: true,
    },
    {
      fieldName: "lesson_sub_category",
      fieldType: "singleText",
      fieldLabel: "Lesson Sub Category",
      width: "full",
      required: true,
    },
    {
      fieldName: "lesson",
      fieldType: "singleText",
      fieldLabel: "Lesson",
      width: "full",
      required: true,
    },
    {
      fieldName: "recommendations",
      fieldType: "singleText",
      fieldLabel: "Recommendations",
      width: "half",
    },
  ];

  const initialValues = {
    lesson_category_id: "",
    lesson_sub_category: "",
    lesson: "",
    recommendations: "",
    project_id: Number(projectId),
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/lessons-learned`;
  const updateUrl = `/projects/${Number(projectId)}/lessons-learned/${query?.data?.data?.data?.id}`;

  const validationSchema = object({
    lesson_category_id: object()
      .shape({
        value: string(),
        label: string(),
      })
      .nullable()
      .required("Category is required."),
    lesson_sub_category: string().required("Lesson Sub Category is required."),
    lesson: string().required("Lesson is required."),
  });

  const formTitle = "Project Lessons Learned";
  const canEdit = useAuthorization("PMO-Manager-Edit-Capability");

  return {
    readFields,
    editFields,
    initialValues,
    rowsToLock,
    postUrl,
    updateUrl,
    validationSchema,
    formTitle,
    canEdit,
  };
};
