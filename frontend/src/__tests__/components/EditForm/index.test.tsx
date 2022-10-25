import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { EditForm } from "../../../components/EditForm";
import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import { mount, shallow } from "enzyme";
import { ReadField } from "components/ReadForm/ReadField";
import { IEditFields } from "types";

const editFields: () => IEditFields[] = () => {
  return [
    {
      fieldName: "mock_field",
      fieldLabel: "Mock Field",
      fieldType: "singleText",
      width: "full",
    },
  ];
};

const initialValues = { mock_field: "mock value" };

const mockFunction = jest.fn();

// jest.mock("@react-keycloak/web", () => ({
//     FormInput: () => (<Fi>{}</Fi>),
// }));

describe("Renders <EditForm /> component", () => {
  const wrapper = shallow(
    <EditForm initialValues={initialValues} onSubmit={mockFunction} editFields={editFields()} />
  );

  it("renders the EditForm component", () => {
    expect(wrapper.html()).toMatchSnapshot();
    // expect((wrapper.props().children[0].props.title)).toEqual("Mock Title");
  });
});
