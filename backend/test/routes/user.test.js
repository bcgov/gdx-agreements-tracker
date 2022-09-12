const model = require("../../src/models/users.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/users.js");

const capability = ["users_update_all"];

testRoutes([
  {
    request: { method: "GET", url: "/users" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/users/1" },
    modelFunction: model.findById,
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
    modelFunction: model.updateOne,
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
    modelFunction: model.addOne,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: {
      method: "DELETE",
      url: "/users/2",
    },
    modelFunction: model.removeOne,
    capabilities: capability,
    type: routeTypes.Specific,
  },
]);
