import React from "react";
import { shallow } from "enzyme";
import { List } from "../pages/Contract";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

describe("Contract <List /> component", () => {
  const contractList = shallow(<List />);

  it("Contains a sidebar component", () => {
    expect(contractList.find(Sidebar)).toHaveLength(1);
  });

  it("Contains a main component", () => {
    expect(contractList.find(Main)).toHaveLength(1);
  });
});
