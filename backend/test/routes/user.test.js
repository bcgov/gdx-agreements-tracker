const userModel = require("../../src/models/users.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/users.js");

const capability = ["users_update_all"];

testRoutes([
  {
    request: { method: "GET", url: "/users" },
    modelFunction: userModel.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/users/1" },
    modelFunction: userModel.findById,
    capabilities: capability,
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "/users/1",
      payload: {
        email: "me@gov.bc.ca",
      },
    },
    modelFunction: userModel.updateOne,
    capabilities: capability,
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "POST",
      url: "/users",
      payload: {
        email: "me@gov.bc.ca",
        name: "John Testman",
        role_id: 2,
      },
    },
    modelFunction: userModel.addOne,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: {
      method: "DELETE",
      url: "/users/2",
    },
    modelFunction: userModel.removeOne,
    capabilities: capability,
    type: routeTypes.Specific,
  },
]);
