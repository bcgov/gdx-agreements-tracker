import { TableComplete } from "components/TableComplete";
import { mount } from "enzyme";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { getByRole, render, screen, waitFor } from "@testing-library/react";

import { Container, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Axios } from "axios";
import { useFormatTableData } from "hooks/useFormatTableData";

import { FormikValues } from "formik";
import { UseQueryResult } from "react-query";

/**
 * The view fields.
 *
 * @param   {UseQueryResult<FormikValues>} query The react query data for specific project.
 * @returns {Array}
 */
export const readFields = (query: UseQueryResult<FormikValues>): Array<any> => {
  return [
    { width: "half", title: "Invoice Number", value: "000123456" },
    { width: "half", title: "Invoice Date", value: "01/01/0001" },
  ];
};

/**
 * The edit fields.
 *
 * @returns {IEditFields[]}
 */
export const editFields = [
  {
    width: "half",
    fieldLabel: "Invoice Number",
    fieldName: "invoice_number",
    fieldType: "singleText",
  },
  { width: "half", fieldLabel: "Invoice Date", fieldName: "invoice_date", fieldType: "date" },
];

/**
 * Inital values for create form.
 */
export const initialValues = {
  invoice_number: "",
  invoice_date: "",
};

jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

jest.mock("hooks/useFormatTableData", () => ({
  useFormatTableData: () => ({
    data: {
      rows: [
        {
          id: 1980,
          fiscal: "22-23",
          resource: "Baker, Anna",
        },
      ],
      data: [
        {
          field: "edit",
          headerName: "",
          sortable: false,
          filterable: false,
          maxWidth: 60,
        },
        {
          hide: true,
          field: "id",
          headerName: "Id",
          flex: 1,
          id: 0,
          sortable: false,
          filterable: false,
        },
        {
          hide: false,
          field: "resource",
          headerName: "Resource",
          flex: 2,
          id: 2,
          sortable: false,
          filterable: false,
        },
      ],
      user: {
        capabilities: ["mock_read_all", "mock_add_one", "mock_update_one", "mock_delete_one"],
      },
    },
    isLoading: false,
  }),
}));

// //Mock keycloak.
// jest.mock("hooks/useFormControls", () => ({
//   useFormControls: () => ({
//     handleEditMode,
//     handleOpen,
//     handleClose:()=>{},//TODO
//     handleCurrentRowData:() => {},//TODO
//     handleFormType,
//     formType:"read", //TODO
//     open,
//     editMode:false,
//     currentRowData,
//   }),
// }));

jest.mock("hooks/useFormSubmit", () => ({
  useFormSubmit: () => ({ handlePost: () => {}, handleUpdate: () => {}, Notification: "" }),
}));

jest.mock("react-query", () => ({
  useQuery: () => ({
    data: {
      id: 1977,
      fiscal: {
        value: 13,
        label: "22-23",
      },
      resource_id: {
        value: 581,
        label: "Various, Various",
      },
      assignment_rate: "35",
      supplier_rate_id: {
        value: 467,
        label: "$35.00",
      },
      hours: 125,
      start_date: "2022-04-01T07:00:00.000Z",
      end_date: "",
    },
  }),
}));

const mockRoles = {
  get: "mock_read_all",
  add: "mock_add_one",
  update: "mock_update_one",
  delete: "mock_delete_one",
};

const mockUrl = {
  getAll: ``,
  getOne: ``,
  updateOne: ``,
  addOne: ``,
  deleteOne: ``,
};

describe("Role Testing", () => {
  test("test", () => {
    mount(
      <BrowserRouter>
        <TableComplete
          url={mockUrl}
          tableName={"mockTable"}
          itemName={"mockItem"}
          createFormInitialValues={initialValues}
          readFields={readFields}
          editFields={editFields}
          // totalColumns={["rate"]}
          roles={mockRoles}
        />
      </BrowserRouter>
    );
  });
});
