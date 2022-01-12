import React from "react";
import { shallow } from "enzyme";
import { List } from "../../pages/Project";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";

describe("Project <List /> component", () => {
  const projectList = shallow(<List />);

  it("Contains a sidebar component", () => {
    expect(projectList.find(Sidebar)).toHaveLength(1);
  });

  it("Contains a main component", () => {
    expect(projectList.find(Main)).toHaveLength(1);
  });
});
