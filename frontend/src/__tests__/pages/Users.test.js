import React from "react";
import { shallow } from "enzyme";
import { User } from "../../pages/Admin";

jest.mock("react-router-dom", () => ({
  useParams: () => ({ userId: null }),
}));

describe("User Api call", () => {
  it("renders Users display page when '/admin/user' is hit", () => {
    const user = shallow(<User />);
    expect(user.find("h2")).toHaveLength(1);
    expect(user.find("div pre")).toHaveLength(1);
  });
});
