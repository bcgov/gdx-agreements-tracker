const { getAll, getOne, updateOne, addOne } = require("@controllers/ministry");
const ministriesModel = require("@models/ministry");

const ministries = [
  {
    id: 1,
    ministry_name: "Ministry of Truth",
    ministry_short_name: "Minitrue",
    is_active: false,
  },
  {
    id: 2,
    ministry_name: "Ministry of Peace",
    ministry_short_name: "Minipax",
    is_active: true,
  },
  {
    id: 3,
    ministry_name: "Ministry of Love",
    ministry_short_name: "Miniluv",
    is_active: true,
  },
  {
    id: 4,
    ministry_name: "Ministry of Plenty",
    ministry_short_name: "Miniluv",
    is_active: false,
  },
];

// Mock user DB methods.
jest.mock("@models/ministry");

describe("Testing ministries controllers", () => {
  it("Gets an array of all ministries", async () => {
    ministriesModel.findAll.mockResolvedValue(ministries);
    const sampleRequest = {
      user: {
        capabilities: ["ministries_read_all"],
      },
    };
    const result = await getAll(sampleRequest);
    expect(result).toBeInstanceOf(Array);
    result.forEach((ministriesObject) => expect("id" in ministriesObject).toBe(true));
  });

  it("Gets a single ministry", async () => {
    const expectedResult = ministries[3];
    ministriesModel.findById.mockResolvedValue([expectedResult]);
    const sampleRequest = {
      params: {
        id: 4,
      },
      user: {
        capabilities: ["ministries_read_all"],
      },
    };

    const result = await getOne(sampleRequest);
    expect(result).toStrictEqual({
      id: 4,
      ministry_name: "Ministry of Plenty",
      ministry_short_name: "Miniluv",
      is_active: false,
    });
  });

  it("Updates a single ministry", async () => {
    // The number of records changed should be 1
    ministriesModel.updateOne.mockResolvedValue(1);
    const sampleRequest = {
      params: {
        id: 4,
      },
      body: {
        ministry_name: "test ministry",
      },
      user: {
        capabilities: ["ministries_update_mine"],
      },
    };

    const result = await updateOne(sampleRequest);
    expect(result).toBe(1);
  });

  it("Adds a single ministry", async () => {
    // knex.insert on postgres returns 1 if the 'returning' parameter is set
    ministriesModel.addOne.mockResolvedValue(1);
    const sampleRequest = {
      body: {
        ministry_name: "test_name",
        ministry_short_name: "test",
        is_active: false,
      },
      user: {
        capabilities: ["ministries_add_one"],
      },
    };

    const result = await addOne(sampleRequest);
    expect(result).toBe(1);
  });
});

exports.ministries = ministries;
