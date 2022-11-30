const model = require("@models/admin/users");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/admin/users");

testRoutes([
  {
    request: { method: "GET", url: "/users" },
    modelFunction: model.findAll,
    capabilities: ["users_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/users/1" },
    modelFunction: model.findById,
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
    modelFunction: model.updateOne,
    capabilities: ["users_update_one"],
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
    capabilities: ["users_add_one"],
    type: routeTypes.General,
  },
  {
    request: {
      method: "DELETE",
      url: "/users/2",
    },
    modelFunction: model.removeOne,
    capabilities: ["users_delete_one"],
    type: routeTypes.Specific,
  },
]);
