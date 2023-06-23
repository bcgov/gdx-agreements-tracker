import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";

export const formConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const readFields = !query
    ? []
    : [
        {
          value: query?.data?.data?.data?.portfolio_id.label,
          title: "Portfolio",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.cas_project_number,
          title: "CAS Project #",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.responsibility,
          title: "Responsibility",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.asset_tag,
          title: "Asset Tag",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.service_line,
          title: "Service_line",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.wip_no,
          title: "WIP #",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.stob,
          title: "STOB",
          width: "half",
        },
        {
          value: query?.data?.data?.data?.qualified_receiver,
          title: "Qualified Receiver",
          width: "half",
        },
      ];

  const editFields: IEditField[] = [
    {
      fieldName: "portfolio_id",
      fieldType: "select",
      fieldLabel: "Portfolio",
      width: "half",
      pickerName: "portfolio_option",
    },
    {
      fieldName: "cas_project_number",
      fieldType: "singleText",
      fieldLabel: "CAS Project #",
      width: "half",
    },
    {
      fieldName: "responsibility",
      fieldType: "readonly",
      fieldLabel: "Responsibility",
      width: "half",
    },
    {
      fieldName: "asset_tag",
      fieldType: "singleText",
      fieldLabel: "Asset Tag",
      width: "half",
    },
    {
      fieldName: "service_line",
      fieldType: "readonly",
      fieldLabel: "Service Line",
      width: "half",
    },
    {
      fieldName: "wip_no",
      fieldType: "singleText",
      fieldLabel: "WIP #",
      width: "half",
    },
    {
      fieldName: "stob",
      fieldType: "singleText",
      fieldLabel: "STOB",
      width: "half",
    },
    {
      fieldName: "qualified_receiver",
      fieldType: "singleText",
      fieldLabel: "Qualified Receiver",
      width: "half",
    },
  ];

  /**
   * Inital values for create form.
   */
  const initialValues = {
    portfolio_id: null,
    cas_project_number: "",
    asset_tag: "",
    wip_no: "",
    stob: "",
    qualified_receiver: "",
  };

  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/contracts/${query?.data?.data?.data?.id}/internal-coding`;
  const updateUrl = `/contracts/internal-coding/${query?.data?.data?.data?.id}`;

  return { readFields, editFields, initialValues, rowsToLock, postUrl, updateUrl };
};
