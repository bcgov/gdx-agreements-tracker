import { AxiosResponse } from "axios";
import { UseQueryResult } from "@tanstack/react-query";
import { IEditField } from "types";
import { useParams } from "react-router-dom";
import { object, string } from "yup";
import { FormikValues } from "formik";

const validationSchema = object({
  stob: string()
    .min(4, "Must contain exactly 4 alphanumeric characters.")
    .max(4, "Must contain exactly 4 alphanumeric characters.")
    .matches(/^[A-Za-z0-9]{4}$/, "Must contain exactly 4 alphanumeric characters."),
});

interface IRecoveredQuarterAmounts {
  q1_amount: string;
  q2_amount: string;
  q3_amount: string;
  q4_amount: string;
  [key: string]: string;
}

/**
 * Updates the values in the `recoveredQuarterAmounts` object with the values from the `newValue` object.
 *
 * @param {FormikValues} formikValues  - The Formik values object.
 * @param {Function}     setFieldValue - Formik's setFieldValue function.
 * @param {object}       newValue      - The object containing updated values for quarters.
 */
const getRecoveredTotalsByQuarter = async (
  formikValues: FormikValues,
  setFieldValue: Function,
  newValue: { [key: string]: string }
) => {
  const { q1_amount, q2_amount, q3_amount, q4_amount } = formikValues;
  const recoveredQuarterAmounts: IRecoveredQuarterAmounts = {
    q1_amount,
    q2_amount,
    q3_amount,
    q4_amount,
  };

  /**
   * Updates the values in the `recoveredQuarterAmounts` object with the values from the `newValue` object.
   *
   * @returns {IRecoveredQuarterAmounts} The updated amounts object.
   */
  const updateQuarterAmounts = () => {
    const updatedAmounts: IRecoveredQuarterAmounts = { ...recoveredQuarterAmounts };

    // Get all unique keys from both recoveredQuarterAmounts and newValue
    const allKeys = Array.from(new Set([...Object.keys(updatedAmounts), ...Object.keys(newValue)]));

    // Loop through the keys
    for (const key of allKeys) {
      // Update the value in the main object with the value from the update object
      updatedAmounts[key] = newValue[key] || updatedAmounts[key];
    }

    return updatedAmounts;
  };

  /**
   * Converts a string representing a monetary value to a number.
   *
   * @param   {string} value - The string value representing a monetary amount.
   * @returns {number}       The converted numeric value.
   */
  const convertToNumber = (value: string) => {
    // Remove dollar signs and commas if present
    const cleanedValue = value.replace(/[$,]/g, "");

    // Parse the cleaned value to a float and round to two decimal places
    const parsedValue = parseFloat(cleanedValue).toFixed(2);

    // Convert the result back to a number
    return Number(parsedValue);
  };

  /**
   * Converts all recovered amounts in `updateQuarterAmounts` to numbers and returns them in an array.
   *
   * @returns {number[]} An array of recovered amounts.
   */
  const convertAllRecoveredAmounts = () => {
    const recoveredAmounts = [];
    for (const key in updateQuarterAmounts()) {
      recoveredAmounts.push(convertToNumber(updateQuarterAmounts()[key]));
    }
    return recoveredAmounts;
  };

  /**
   * Calculates the sum of all quarter amounts.
   *
   * @returns {number} The total sum of quarter amounts.
   */
  const sumOfQuarters = convertAllRecoveredAmounts().reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  /**
   * Converts the total sum of quarter amounts to a formatted currency string.
   *
   * @returns {string} The total sum of quarter amounts in a dollar format.
   */
  const toCurrency = sumOfQuarters.toLocaleString("en-US", { style: "currency", currency: "USD" });

  setFieldValue("total", toCurrency);
};

/**
 * Generates configuration for the form based on the query result.
 *
 * @param   {UseQueryResult<AxiosResponse, unknown>} query - The query result.
 * @returns {object}                                       Configuration object for the form.
 */

export const FormConfig = (query: UseQueryResult<AxiosResponse, unknown>) => {
  const { projectId } = useParams();
  const readFields = !query
    ? []
    : [
        {
          width: "half",
          title: "Recovery Area",
          value: query?.data?.data?.data?.recovery_area.label,
        },
        {
          width: "half",
          title: "Deliverable Name",
          value: query?.data?.data?.data?.project_deliverable_id.deliverable_name,
        },
        {
          width: "full",
          title: "Detail Amount",
          value: query?.data?.data?.data?.detail_amount,
        },
        {
          width: "half",
          title: "Q1 Amount",
          value: query?.data?.data?.data?.q1_amount,
        },
        {
          width: "half",
          title: "Q1 Recovered",
          value: query?.data?.data?.data?.q1_recovered,
          type: "checkbox",
        },
        {
          width: "half",
          title: "Q2 Amount",
          value: query?.data?.data?.data?.q2_amount,
        },
        {
          width: "half",
          title: "Q2 Recovered",
          value: query?.data?.data?.data?.q2_recovered,
          type: "checkbox",
        },
        {
          width: "half",
          title: "Q3 Amount",
          value: query?.data?.data?.data?.q3_amount,
        },
        {
          width: "half",
          title: "Q3 Recovered",
          value: query?.data?.data?.data?.q3_recovered,
          type: "checkbox",
        },
        {
          width: "half",
          title: "Q4 Amount",
          value: query?.data?.data?.data?.q4_amount,
        },
        {
          width: "half",
          title: "Q4 Recovered",
          value: query?.data?.data?.data?.q4_recovered,
          type: "checkbox",
        },
        {
          width: "full",
          title: "Total",
          value: query?.data?.data?.data?.total,
        },
        {
          width: "half",
          title: "Resource Type",
          value: query?.data?.data?.data?.resource_type.label,
        },
        {
          width: "half",
          title: "STOB",
          value: query?.data?.data?.data?.stob,
        },
        {
          width: "half",
          title: "Responsibility",
          value: query?.data?.data?.data?.responsibility_centre,
        },
        {
          width: "half",
          title: "Service Line",
          value: query?.data?.data?.data?.service_line,
        },
        {
          width: "half",
          title: "Fiscal",
          value: query?.data?.data?.data?.fiscal_year.label,
        },
        {
          width: "half",
          title: "Program Area",
          value: query?.data?.data?.data?.program_area?.label,
        },
        {
          width: "half",
          title: "Contract",
          value: query?.data?.data?.data?.contract_id.label,
        },
        {
          width: "half",
          title: "Notes",
          value: query?.data?.data?.data?.notes,
        },
      ];
  const editFields: IEditField[] = [
    {
      width: "half",
      fieldLabel: "Recovery Area",
      fieldName: "recovery_area",
      fieldType: "select",
      pickerName: "recovery_area_option",
    },
    {
      fieldName: "project_deliverable_id",
      fieldLabel: "Deliverable Name",
      fieldType: "autocompleteTable",
      width: "half",
      pickerName: "project_budget_deliverables_option",
      autocompleteTableColumns: [
        { field: "deliverable_name", headerName: "Deliverable Name" },
        { field: "deliverable_id", headerName: "Deliverable ID" },
      ],
      required: true,
      projectId: Number(projectId),
    },

    {
      width: "half",
      fieldLabel: "Detail Amount",
      fieldName: "detail_amount",
      fieldType: "money",
    },
    {
      width: "half",
      fieldLabel: "Q1 Amount",
      fieldName: "q1_amount",
      fieldType: "money",
      customOnChange: getRecoveredTotalsByQuarter,
    },
    {
      width: "half",
      fieldLabel: "Q1 Recovered",
      fieldName: "q1_recovered",
      fieldType: "checkbox",
    },
    {
      width: "half",
      fieldLabel: "Q2 Amount",
      fieldName: "q2_amount",
      fieldType: "money",
      customOnChange: getRecoveredTotalsByQuarter,
    },
    {
      width: "half",
      fieldLabel: "Q2 Recovered",
      fieldName: "q2_recovered",
      fieldType: "checkbox",
    },
    {
      width: "half",
      fieldLabel: "Q3 Amount",
      fieldName: "q3_amount",
      fieldType: "money",
      customOnChange: getRecoveredTotalsByQuarter,
    },
    {
      width: "half",
      fieldLabel: "Q3 Recovered",
      fieldName: "q3_recovered",
      fieldType: "checkbox",
    },
    {
      width: "half",
      fieldLabel: "Q4 Amount",
      fieldName: "q4_amount",
      fieldType: "money",
      customOnChange: getRecoveredTotalsByQuarter,
    },
    {
      width: "half",
      fieldLabel: "Q4 Recovered",
      fieldName: "q4_recovered",
      fieldType: "checkbox",
    },
    {
      width: "half",
      fieldLabel: "Total",
      fieldName: "total",
      fieldType: "readonly",
    },
    {
      width: "half",
      fieldLabel: "Resource Type",
      fieldName: "resource_type",
      fieldType: "select",
      tableName: "project_budget",
    },
    {
      width: "half",
      fieldLabel: "Responsibility Centre",
      fieldName: "responsibility_centre",
      fieldType: "singleText",
    },
    {
      width: "half",
      fieldLabel: "Service Line",
      fieldName: "service_line",
      fieldType: "singleText",
    },
    {
      width: "half",
      fieldLabel: "STOB",
      fieldName: "stob",
      fieldType: "singleText",
    },
    {
      width: "half",
      fieldLabel: "Fiscal",
      fieldName: "fiscal_year",
      fieldType: "select",
      pickerName: "fiscal_year_option",
    },
    {
      width: "half",
      fieldLabel: "Notes",
      fieldName: "notes",
      fieldType: "multiText",
    },
    {
      width: "half",
      fieldLabel: "Program Area",
      fieldName: "program_area",
      fieldType: "select",
      pickerName: "client_coding_option",
      projectId: Number(projectId),
    },
    {
      width: "half",
      fieldLabel: "Contract",
      fieldName: "contract_id",
      fieldType: "select",
      pickerName: "budget_contract_option",
      projectId: Number(projectId),
    },
  ];

  const initialValues = {
    q1_amount: "0",
    q1_recovered: null,
    q2_amount: "0",
    q2_recovered: null,
    q3_amount: "0",
    q3_recovered: null,
    q4_amount: "0",
    q4_recovered: null,
    fiscal: null,
    project_deliverable_id: null,
    notes: null,
    detail_amount: "0",
    recovery_area: null,
    resource_type: null,
    stob: null,
    client_coding_id: null,
    contract_id: null,
    deliverable_name: null,
  };
  const rowsToLock = [query?.data?.data?.data?.id];
  const postUrl = `/projects/budget`;
  const updateUrl = `/projects/budget/${query?.data?.data?.data?.id}`;
  const deleteUrl = `/projects/budget/${query}`;

  return {
    validationSchema,
    readFields,
    editFields,
    initialValues,
    rowsToLock,
    postUrl,
    updateUrl,
    deleteUrl,
  };
};
