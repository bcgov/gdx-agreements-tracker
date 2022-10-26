import { shallow } from "enzyme";
import { Renderer } from "components/Renderer";
import { LinearProgress } from "@mui/material";

describe("Tests different renders of the <Renderer /> component", () => {
  const component = <div>Mock Component</div>;

  //This function allows you to render the component with different isLoading props to test different outcomes
  const wrapper = (isLoading: boolean) => {
    return shallow(<Renderer component={component} isLoading={isLoading} />);
  };

  it("Tries to snapshot test the Renderer component", () => {
    expect(wrapper(true).html()).toMatchSnapshot();
  });

  it("Should find the loader because isLoading is true", () => {
    expect(wrapper(true).find(LinearProgress).length).toBe(1);
  });

  it("Should find the text of the rendered component", () => {
    expect(wrapper(false).text()).toEqual("Mock Component");
  });
});
