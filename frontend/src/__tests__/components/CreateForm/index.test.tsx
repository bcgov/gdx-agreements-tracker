import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IEditField } from "types";

import { CreateForm } from "../../../components/CreateForm";

const editFields: () => IEditField[] = () => {
  return [
    {
      fieldName: "first_name",
      fieldLabel: "First Name",
      fieldType: "singleText",
      width: "full",
    },
    {
      fieldName: "last_name",
      fieldLabel: "Last Name",
      fieldType: "singleText",
      width: "full",
    },
  ];
};

const initialValues = {
  first_name: "mock value",
  last_name: "mock value 2",
};

//Mock keycloak.
jest.mock("../../../hooks/usePickerValues", () => ({
  usePickerValues: () => [],
}));

test("rendering and submitting a basic Formik form", async () => {
  const handleSubmit = jest.fn();
  render(
    <CreateForm initialValues={initialValues} onSubmit={handleSubmit} editFields={editFields()} />
  );

  const user = userEvent.setup();
  const firstNameInput = screen.getByLabelText(/First Name/i);
  const lastNameInput = screen.getByLabelText(/Last Name/i);

  //Clear mock_field input box
  await user.clear(firstNameInput);
  //Enter data into mock_field input box
  await user.type(firstNameInput, "John");

  //Clear mock_field2 input box
  await user.clear(lastNameInput);
  //Enter data into mock_field2 input box
  await user.type(lastNameInput, "Smith");

  await user.click(screen.getByRole("button", { name: /submit/i }));

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith(
      { first_name: "John", last_name: "Smith" },
      expect.objectContaining({
        resetForm: expect.any(Function),
        setErrors: expect.any(Function),
        setFieldError: expect.any(Function),
        setFieldTouched: expect.any(Function),
        setFieldValue: expect.any(Function),
        setStatus: expect.any(Function),
        setSubmitting: expect.any(Function),
        setTouched: expect.any(Function),
        setValues: expect.any(Function),
      })
    )
  );
});
