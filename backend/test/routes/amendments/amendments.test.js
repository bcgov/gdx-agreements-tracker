const model = require("@models/amendments/index");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/amendments/index");

testRoutes([
  {
    request: { method: "GET", url: "contracts/1/amendments" },
    modelFunction: model.findAll,
    capabilities: ["contracts_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "contracts/1/amendments/1" },
    modelFunction: model.findById,
    capabilities: ["contracts_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "amendments/1",
      payload: {
        email: "me@gov.bc.ca",
      },
    },
    modelFunction: model.updateOne,
    capabilities: ["contracts_update_one"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "POST",
      url: "amendments",
      payload: {
        contract_id: 1,
        amendment_number: 2,
        amendment_date: "2011-11-11T11:11:11+00:00",
      },
    },
    modelFunction: model.addOne,
    capabilities: ["contracts_add_one"],
    type: routeTypes.General,
  },
]);
