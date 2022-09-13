const model = require("../../src/models/contacts.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/contacts.js");

const capability = ["contacts_update_all"];

testRoutes([
  {
    request: { method: "GET", url: "/contacts" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/contacts/1" },
    modelFunction: model.findById,
    capabilities: capability,
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "/contacts/1",
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
      url: "/contacts",
      payload: {
        first_name: "John",
        last_name: "Testman",
      },
    },
    modelFunction: model.addOne,
    capabilities: capability,
    type: routeTypes.General,
  },
]);
