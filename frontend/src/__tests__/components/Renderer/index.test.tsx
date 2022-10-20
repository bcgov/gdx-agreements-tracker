import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import { Renderer } from "components/Renderer";
import { LinearProgress } from "@mui/material";
import { Loader } from "components";

describe("Tests different renders of the <Renderer /> component", () => {
  const component = <div>Mock Component</div>;

  //This function allows you to render the component with different isLoading props to test different outcomes
  const wrapper = (isLoading: boolean) => {
    return shallow(<Renderer component={component} isLoading={isLoading} />);
  };

  it("Tries to snapshot test the Renderer component", () => {
    expect(wrapper(true).html()).toMatchSnapshot();
    // expect((wrapper.props().children[0].props.title)).toEqual("Mock Title");
  });

  it("Should find the loader because isLoading is true", () => {
    expect(wrapper(true).find(LinearProgress).length).toBe(1);
  });

  it("Should find the text of the rendered component", () => {
    console.log('first', wrapper(false).debug())
    expect(wrapper(false).text()).toEqual("Mock Component")
  });
});
