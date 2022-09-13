const model = require("../../src/models/ministry.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/ministry.js");

testRoutes([
  {
    request: { method: "GET", url: "/ministries" },
    modelFunction: model.findAll,
    capabilities: ["admin_form_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/ministries/1" },
    modelFunction: model.findById,
    capabilities: ["admin_form_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "/ministries/1",
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
      url: "/ministries",
      payload: {
        ministry_name: "Test ministry",
        ministry_short_name: "TSMN",
      },
    },
    modelFunction: model.addOne,
    capabilities: ["admin_form_add_one"],
    type: routeTypes.General,
  },
]);
