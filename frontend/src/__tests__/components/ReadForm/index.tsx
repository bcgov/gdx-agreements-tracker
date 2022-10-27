import { ReadForm } from "../../../components/ReadForm";
import { shallow } from "enzyme";

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
  });
});
