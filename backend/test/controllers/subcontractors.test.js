const { getAll, getOne } = require("../../src/controllers/subcontractors");
const subcontractorsModel = require("../../src/models/subcontractors.js");

const subcontractors = [
  {
    id: 1,
    name: "ITI",
  },
  {
    id: 2,
    name: "Jacob",
  },
  {
    id: 3,
    name: "Jackie",
  },
  {
    id: 4,
    name: "Jefferson",
  },
  {
    id: 5,
    name: "John",
  },
];

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
    expect(result).toBeInstanceOf(Array);
    result.forEach((subcontractorsObject) => expect("id" in subcontractorsObject).toBe(true));
  });

  it("Gets a single subcontractor if user has permissions", async () => {
    subcontractorsModel.findById.mockResolvedValue([
      {
        id: 4,
        subcontractor_name: "Jefferson",
      },
    ]);

    const sampleRequest = {
      params: {
        id: 4,
      },
      user: {
        capabilities: ["subcontractors_read_all"],
      },
    };

    const result = await getOne(sampleRequest);
    expect(result).toStrictEqual({ id: 4, subcontractor_name: "Jefferson" });
  });
});

exports.subcontractors = subcontractors;
