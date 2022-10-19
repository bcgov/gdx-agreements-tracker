const model = require("../../src/models/invoice_deliverables.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/invoice_deliverables.js");

testRoutes([
  {
    request: { method: "GET", url: "/invoices/1/deliverables" },
    modelFunction: model.findAllByInvoiceId,
    capabilities: ["contracts_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/invoices/deliverables/1" },
    modelFunction: model.findById,
    capabilities: ["contracts_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "PUT", url: "/invoices/deliverables/1", payload: {} },
    modelFunction: model.updateOne,
    capabilities: ["contracts_update_one"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "POST", url: "/invoices/1/deliverables", payload: {} },
    modelFunction: model.addOneWithInvoiceId,
    capabilities: ["contracts_add_one"],
    type: routeTypes.General,
  },
]);
