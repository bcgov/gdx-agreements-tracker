import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ReadForm } from "../../../components/ReadForm";
import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import { mount, shallow } from "enzyme";
import { ReadField } from "components/ReadForm/ReadField";

const fields = [
  {
    width: "full",
    title: "Mock Title",
    value: "Mock Value",
  },
  {
    width: "half",
    title: "Mock Title 2",
    value: 2,
  },
];

describe("Renders <ReadForm /> component", () => {
  const wrapper = shallow(<ReadForm fields={fields} />);

  it("renders the ReadForm component", () => {
    expect(wrapper.html()).toMatchSnapshot();
    // expect((wrapper.props().children[0].props.title)).toEqual("Mock Title");
  });
});
