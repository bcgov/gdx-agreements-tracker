import React from "react";
import { mount } from "enzyme";
import { TableComplete } from "components/TableComplete";
import { IEditFields } from "types";
import { FormikValues } from "formik";
import { UseQueryResult } from "@tanstack/react-query";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const readFields = (ministriesQuery: UseQueryResult<FormikValues>) => {
  return [
    { width: "half", title: "Ministry", value: ministriesQuery?.data?.ministry_name },
    { width: "half", title: "Abbr", value: ministriesQuery?.data?.ministry_short_name },
    { width: "half", title: "Is Active", value: ministriesQuery?.data?.is_active ? "Yes" : "No" },
  ];
};

const editFields: IEditFields[] = [
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

const createFormInitialValues = {
  ministry_name: "",
  ministry_short_name: "",
  is_active: false,
};

const roles = {
  get: "admin_form_read_all",
  add: "admin_form_add_one",
  update: "admin_form_update_one",
  delete: "admin_form_delete_one",
};

const url = {
  getAll: `/ministries`,
  getOne: `/ministries/{id}`,
  updateOne: `/ministries/{id}`,
  addOne: `/ministries`,
};

const queryClient = new QueryClient();

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("Tests different renders of the <Renderer /> component", () => {
  const history = createMemoryHistory();
  //This function allows you to render the component with different isLoading props to test different outcomes
  const wrapper = mount(
    <QueryClientProvider client={queryClient}>
      <Router location={history.location} navigator={history}>
        <TableComplete
          itemName="Ministry"
          tableName="ministry"
          url={url}
          createFormInitialValues={createFormInitialValues}
          readFields={readFields}
          editFields={editFields}
          roles={roles}
        />
      </Router>
    </QueryClientProvider>
  );

  it("test 1", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
