const { getAll } = require("../../src/controllers/suppliers");
const suppliersModel = require("../../src/models/suppliers.js");

const suppliers = [
  {
    id: 1,
    name: "ITI",
    signing_authority: "Lara",
    financial_contact: "Executive",
    province_state: "CA",
  },
  {
    id: 2,
    name: "Jacob",
    signing_authority: "Sierra",
    financial_contact: "UX Designer",
    province_state: "BC",
  },
  {
    id: 3,
    name: "Jackie",
    signing_authority: "James",
    financial_contact: "Director",
    province_state: "ON",
  },
  {
    id: 4,
    name: "Jefferson",
    signing_authority: "Marston",
    financial_contact: "Scrum Master",
    province_state: "AB",
  },
  {
    id: 5,
    name: "John",
    signing_authority: "Lara",
    financial_contact: "Product Owner",
    province_state: "BC",
  },
];

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
    expect(result).toBeInstanceOf(Array);
    result.forEach((suppliersObject) => expect("id" in suppliersObject).toBe(true));
  });
});

exports.suppliers = suppliers;
