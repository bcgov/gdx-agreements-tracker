const subcontractors = require("../../src/database/seeds/06_subcontractors");
const { getAll } = require("../../src/controllers/subcontractors");
const subcontractorsModel = require("../../src/models/subcontractors.js");

// Mock user DB methods.
jest.mock("../../src/models/subcontractors");

describe("Testing user controllers", () => {
  it("Gets an array of all subcontractors", async () => {
    subcontractorsModel.findAll.mockResolvedValue(subcontractors);
    const sampleRequest = {
      user: {
        capabilities: ["subcontractors_read_all"],
      },
    };
    const result = await getAll(sampleRequest);
    expect(result.subcontractors).toBeInstanceOf(Array);
    result.subcontractors.forEach((subcontractorsObject) =>
      expect("id" in subcontractorsObject).toBe(true)
    );
  });
});
