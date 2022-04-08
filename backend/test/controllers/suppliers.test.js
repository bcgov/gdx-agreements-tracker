const suppliers = require("../../src/database/seeds/05_suppliers")
const { getAll, getOne } = require("../../src/controllers/suppliers");
const suppliersModel = require("../../src/models/suppliers.js");

// Mock user DB methods.
jest.mock("../../src/models/suppliers");

describe("Testing user controllers", () => {
  it("Gets an array of all suppliers", async () => {
    suppliersModel.findAll.mockResolvedValue(suppliers);
    const sampleRequest = {
      user: {
        capabilities: ["suppliers_read_all"],
      },
    };
    const result = await getAll(sampleRequest);
    expect(result.suppliers).toBeInstanceOf(Array)
    result.suppliers.forEach((suppliersObject) => expect("id" in suppliersObject).toBe(true));
  });

});
