import { mount } from "enzyme";
import { GDXAccordion } from "components";

describe("Tests different renders of the <Renderer /> component", () => {
  //This function allows you to render the component with different isLoading props to test different outcomes
  const wrapper = () => {
    return mount(
      <GDXAccordion sectionTitle="mock title">
        <div>mock component</div>
      </GDXAccordion>
    );
  };

  it("test 1", () => {
    expect(wrapper().html()).toMatchSnapshot();
  });
});
