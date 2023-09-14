import { AxiosResponse } from "axios";
import { IEditField } from "types";
import formatDate from "utils/formatDate";

export const FormConfig = (query: AxiosResponse | undefined) => {
  const readFields = [
    {
      width: "full",
      title: "Close out date",
      value: formatDate(query?.data?.data?.data?.close_out_date),
    },
    {
      width: "full",
      title: "Completed by",
      value: query?.data?.data?.data?.completed_by_contact_id?.label,
    },
    {
      width: "full",
      title: "Actual completion date of project",
      value: formatDate(query?.data?.data?.data?.actual_completion_date),
    },
    {
      width: "full",
      title: "Post implementation hand-off to operation completed",
      value: query?.data?.data?.data?.hand_off_to_operations?.value,
    },
    {
      width: "full",
      title: "Project documentation filled in accordance with records management",
      value: query?.data?.data?.data?.records_filed?.value,
    },
    {
      width: "full",
      title: "Contract evaluation completed if applicable",
      value: query?.data?.data?.data?.contract_ev_completed?.value,
    },
    {
      width: "full",
      title: "Contractor IDIR terminated / building passes returned",
      value: query?.data?.data?.data?.contractor_security_terminated?.value,
    },
  ];
  const editFields: IEditField[] = [
    {
      fieldName: "close_out_date",
      fieldLabel: "Close out date",
      fieldType: "date",
      width: "full",
    },
    {
      fieldName: "completed_by_contact_id",
      fieldLabel: "Completed by",
      fieldType: "select",
      width: "full",
      pickerName: "contact_option",
    },
    {
      fieldName: "actual_completion_date",
      fieldLabel: "Actual completion date of project",
      fieldType: "date",
      width: "full",
    },
    {
      fieldName: "hand_off_to_operations",
      fieldLabel: "Post implementation hand-off to operation completed",
      fieldType: "select",
      width: "full",
      tableName: "project",
    },
    {
      fieldName: "records_filed",
      fieldLabel: "Project documentation filled in accordance with records management",
      fieldType: "select",
      width: "full",
      tableName: "project",
    },
    {
      fieldName: "contract_ev_completed",
      fieldLabel: "Contract evaluation completed if applicable",
      fieldType: "select",
      width: "full",
      tableName: "project",
    },
    {
      fieldName: "contractor_security_terminated",
      fieldLabel: "Contractor IDIR terminated / building passes returned",
      fieldType: "select",
      width: "full",
      tableName: "project",
    },
  ];
  return { readFields, editFields };
};
