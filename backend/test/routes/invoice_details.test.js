const model = require("../../src/models/invoice_details.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/invoice_details.js");

testRoutes([
  {
    request: { method: "GET", url: "/invoices/1/resources" },
    modelFunction: model.findResourcesByInvoiceId,
    capabilities: ["contracts_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/invoices/1/deliverables" },
    modelFunction: model.findDeliverablesByInvoiceId,
    capabilities: ["contracts_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "invoices/resources/1" },
    modelFunction: model.findResourceById,
    capabilities: ["contracts_read_all"],
    type: routeTypes.Specific,
  },
]);
