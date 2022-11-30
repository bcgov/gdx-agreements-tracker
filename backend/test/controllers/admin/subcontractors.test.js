const { getAll, getOne, updateOne, addOne } = require("@controllers/admin/subcontractors.js");
const subcontractorsModel = require("@models/admin/subcontractors.js");

const subcontractors = [
  {
    id: 1,
    subcontractor_name: "ITI",
  },
  {
    id: 2,
    subcontractor_name: "Jacob",
  },
  {
    id: 3,
    subcontractor_name: "Jackie",
  },
  {
    id: 4,
    subcontractor_name: "Jefferson",
  },
  {
    id: 5,
    subcontractor_name: "John",
  },
];

// Mock user DB methods.
jest.mock("@models/admin/subcontractors");

describe("Testing user controllers", () => {
  it("Gets an array of all subcontractors", async () => {
    subcontractorsModel.findAll.mockResolvedValue(subcontractors);
    const sampleRequest = {
      user: {
        capabilities: ["subcontractors_read_all"],
      },
    };

    const result = await getAll(sampleRequest);
    expect(Array.isArray(result)).toBe(true);
    result.forEach((subcontractorsObject) => expect("id" in subcontractorsObject).toBe(true));
  });

  it("Gets a single subcontractor", async () => {
    const expectedResult = subcontractors[3];
    subcontractorsModel.findById.mockResolvedValue(expectedResult);
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

  it("Updates a single subcontractor", async () => {
    subcontractorsModel.updateOne.mockResolvedValue({
      id: 4,
      subcontractor_name: "test",
      is_active: false,
    });
    const sampleRequest = {
      params: {
        id: 4,
      },
      body: {
        subcontractor_name: "test",
        is_active: "false",
      },
      user: {
        capabilities: ["subcontractors_update_mine"],
      },
    };

    const result = await updateOne(sampleRequest);
    expect(result.subcontractor_name).toBe("test");
  });

  it("Adds a single subcontractor", async () => {
    // knex.insert on postgres returns 1 if the 'returning' parameter is set
    subcontractorsModel.addOne.mockResolvedValue({
      id: 4,
      subcontractor_name: "test",
      is_active: false,
    });
    const sampleRequest = {
      body: {
        subcontractor_name: "test",
      },
      user: {
        capabilities: ["subcontractors_add_one"],
      },
    };

    const result = await addOne(sampleRequest);
    expect(result).toStrictEqual({ id: 4, subcontractor_name: "test", is_active: false });
  });
});

exports.subcontractors = subcontractors;
