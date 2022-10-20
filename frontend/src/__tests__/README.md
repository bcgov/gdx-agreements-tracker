mount.debug()
Shows the compiled JSX(HTML).  This helps to see what is rendered from your component and makes it easier to see what to test for.

describe("Renders <ReadForm /> component", () => {}
This is a test suite.  This is used wrap your test
describe("Renders <ReadForm /> component", () => {
  const wrapper = shallow(<ReadForm fields={fields} />);
  const readFieldComponent = wrapper.find(ReadField);
  console.log('readFieldComponent', readFieldComponent)
  it("renders the ReadForm component", () => {
    expect(wrapper.html()).toMatchSnapshot();
    // expect((wrapper.props().children[0].props.title)).toEqual("Mock Title");
  });
  it("Tries to match the ReadField title prop", () => {
    expect(readFieldComponent.props().width).toEqual("full");
  });
  it("Tries to match the ReadField title prop", () => {
    expect(readFieldComponent.props().title).toEqual("Mock Title");
  });
  it("Tries to match the ReadField title prop", () => {
    expect(readFieldComponent.props().value).toEqual("Mock Value");
  });
});
