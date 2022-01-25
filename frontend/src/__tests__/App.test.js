import App from "../App";
import { shallow } from "enzyme";
import { AppRouter } from "../routes";
import { BrowserRouter } from "react-router-dom";
const app = shallow(<App />);

it("renders without crashing", () => {
  shallow(<App />);
});
