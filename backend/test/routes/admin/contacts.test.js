const model = require("@models/admin/contacts.js");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/admin/contacts");

testRoutes([
  {
    request: { method: "GET", url: "/contacts" },
    modelFunction: model.findAll,
    capabilities: ["admin_form_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/contacts/1" },
    modelFunction: model.findById,
    capabilities: ["admin_form_read_all"],
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
    capabilities: ["admin_form_update_one"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "POST",
      url: "/contacts",
      payload: {
        first_name: "John",
        last_name: "Tester",
      },
    },
    modelFunction: model.addOne,
    capabilities: ["admin_form_add_one"],
    type: routeTypes.General,
  },
]);
