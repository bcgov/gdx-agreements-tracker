import { render, fireEvent, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
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
    <QueryClientProvider client={queryClient}>
      <CreateForm initialValues={initialValues} onSubmit={onSubmit} editFields={editFields} />
    </QueryClientProvider>
  );
  expect(getByRole("cr_summary_input")).toBeInTheDocument();
  expect(getByRole("submit_button")).toBeInTheDocument();
});

//test block
test("Test submit button", () => {
  // render the component on virtual dom
  const { getByRole } = render(
    <QueryClientProvider client={queryClient}>
      <CreateForm initialValues={initialValues} onSubmit={onSubmit} editFields={editFields} />
    </QueryClientProvider>
  );
  const submitButton = getByRole("submit_button");

  //interact with those elements
  const buttonTest = fireEvent.click(submitButton);
  expect(buttonTest).toEqual(true);
});

test("Test submit functionality", async () => {
  const you = await onSubmit(); 
  expect(you).toEqual({ success: "success, your dummy item saved!" });
});
