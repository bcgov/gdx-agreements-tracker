import { AxiosResponse } from "axios";
import { FormikValues } from "formik";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";
import { useParams } from "react-router-dom";

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const { projectId } = useParams();
  const readFields = !query
    ? []
    : [
        { width: "half", title: "Version", value: query?.data?.data?.data?.version },
        { width: "half", title: "Fiscal Year", value: query?.data?.data?.data?.fiscal_year?.label },
        {
          width: "half",
          title: "Initiation Date",
          value: query?.data?.data?.data?.initiation_date,
        },
        { width: "half", title: "CR Contact", value: query?.data?.data?.data?.cr_contact },
        {
          width: "half",
          title: "Initiated By",
          value: query?.data?.data?.data?.initiated_by?.label,
        },
        { width: "half", title: "Approval Date", value: query?.data?.data?.data?.approval_date },
        { width: "full", title: "Summary", value: query?.data?.data?.data?.summary },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "fiscal_year",
      fieldType: "select",
      fieldLabel: "Fiscal Year",
      width: "half",
      pickerName: "fiscal_year_option",
      required: true,
    },
    {
      fieldName: "initiation_date",
      fieldType: "date",
      fieldLabel: "Initiation Date",
      width: "half",
      required: true,
    },
    {
      fieldName: "cr_contact",
      fieldType: "singleText",
      fieldLabel: "CR Contact",
      width: "half",
      required: true,
    },
    {
      fieldName: "initiated_by",
      fieldType: "select",
      fieldLabel: "Initiated By",
      width: "half",
      tableName: "change_request",
      required: true,
    },
    {
      fieldName: "approval_date",
      fieldType: "date",
      fieldLabel: "Approval Date",
      width: "half",
      required: true,
    },
    {
      fieldName: "summary",
      fieldType: "multiText",
      fieldLabel: "Summary",
      width: "full",
      required: true,
    },
  ];

  const initialValues = {
    fiscal_year: null,
    initiation_date: null,
    cr_contact: null,
    initiated_by: null,
    approval_date: null,
    summary: null,
    link_id: projectId,
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/change_request`;
  const updateUrl = `/change_request/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
