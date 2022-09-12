const userModel = require("../../src/models/users.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/users.js");

testRoutes([
  {
    request: { method: "GET", url: "/users" },
    modelFunction: userModel.findAll,
    capabilities: ["users_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/users/1" },
    modelFunction: userModel.findById,
    capabilities: ["users_read_all"],
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
    capabilities: ["users_create_all"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "POST",
      url: "/users",
      payload: {
        email: "me@gov.bc.ca",
        name: "Shawn Turple",
        role_id: 2,
      },
    },
    modelFunction: userModel.addOne,
    capabilities: ["users_create_all"],
    type: routeTypes.General,
  },
  {
    request: {
      method: "DELETE",
      url: "/users/2",
    },
    modelFunction: userModel.removeOne,
    capabilities: ["users_delete_all"],
    type: routeTypes.Specific,
  },
]);
