// Commenting this test out for now, as fastify hooks is handling permission, so need to re-think.
/*

const { getAll } = require("@controllers/admin/suppliers.js");
const suppliersModel = require("@models/admin/suppliers.js");

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
jest.mock("@models/admin/suppliers");

describe("Testing user controllers", () => {
  it("Gets an array of all suppliers", async () => {
    suppliersModel.findAll.mockResolvedValue(suppliers);   
    const result = await getAll();
    expect(result).toBeInstanceOf(Array);
    result.forEach((suppliersObject) => expect("id" in suppliersObject).toBe(true));
  });
});

exports.suppliers = suppliers;
*/
