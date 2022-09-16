import { render, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { IEditFields } from "types";
import { CreateForm } from "../../../../frontend/src/components/CreateForm";

const queryClient = new QueryClient();
const initialValues = { testName: "test" };
const onSubmit = async () => {
  return { success: "success, your dummy item saved!" };
};

const editFields: IEditFields[] = [
  {
    fieldName: "cr_summary",
    fieldType: "multiText",
    fieldLabel: "Summary",
    width: "full",
  },
];

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

//test block
test("Render the Create form component", () => {
  // render the component on virtual dom
  const { getByRole } = render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CreateForm initialValues={initialValues} onSubmit={onSubmit} editFields={editFields} />
      </QueryClientProvider>
    </BrowserRouter>
  );
  expect(getByRole("cr_summary_input")).toBeInTheDocument();
  expect(getByRole("submit_button")).toBeInTheDocument();
});

//test block
test("Submit button", () => {
  // render the component on virtual dom
  const { getByRole } = render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CreateForm initialValues={initialValues} onSubmit={onSubmit} editFields={editFields} />
      </QueryClientProvider>
    </BrowserRouter>
  );
  const submitButton = getByRole("submit_button");

  //interact with those elements
  const buttonTest = fireEvent.click(submitButton);
  expect(buttonTest).toEqual(true);
});

test("Submit functionality", async () => {
  const handleSubmit = await onSubmit();
  expect(handleSubmit).toEqual({ success: "success, your dummy item saved!" });
});
