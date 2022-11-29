const model = require("@models/invoice_resources");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/invoice_resources");

testRoutes([
  {
    request: { method: "GET", url: "/invoices/1/resources" },
    modelFunction: model.findAllByInvoiceId,
    capabilities: ["contracts_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/invoices/resources/1" },
    modelFunction: model.findById,
    capabilities: ["contracts_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "PUT", url: "/invoices/resources/1", payload: {} },
    modelFunction: model.updateOne,
    capabilities: ["contracts_update_one"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "POST", url: "/invoices/1/resources", payload: {} },
    modelFunction: model.addOneWithInvoiceId,
    capabilities: ["contracts_add_one"],
    type: routeTypes.General,
  },
]);
