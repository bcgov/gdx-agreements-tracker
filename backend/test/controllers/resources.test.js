const { getAll } = require("../../src/controllers/resources");
const resourcesModel = require("../../src/models/resources.js");

const resources = [
  {
    id: 1,
    resource_id: 100,
    supplier_id: null,
    subcontractor_id: 4,
    resource_last_name: "kirk",
    resource_first_name: "james",
  },
  {
    id: 2,
    resource_id: 101,
    supplier_id: 3,
    subcontractor_id: null,
    resource_last_name: "bob",
    resource_first_name: "smith",
  },
  {
    id: 3,
    resource_id: 102,
    supplier_id: 2,
    subcontractor_id: null,
    resource_last_name: "jane",
    resource_first_name: "jones",
  },
];

// Mock user DB methods.
jest.mock("../../src/models/resources");

describe("Testing resource controller with proper permission", () => {
  it("Gets an array of all resources", async () => {
    resourcesModel.findAll.mockResolvedValue(resources);
    const sampleRequest = {
      user: {
        capabilities: ["resources_read_all"],
      },
    };
    const result = await getAll(sampleRequest);
    expect(result).toBeInstanceOf(Array);
    result.forEach((resourcesObject) => expect("id" in resourcesObject).toBe(true));
  });
});

describe("Testing resource controller with no permission", () => {
  it("Should return a message for not the correct permission.", async () => {
    resourcesModel.findAll.mockResolvedValue(resources);
    const sampleRequest = {
      user: {
        capabilities: ["some_capability"],
      },
    };
    const sampleReply = {
      code: (code) => {
        return code;
      },
    };
    const result = await getAll(sampleRequest, sampleReply);
    expect(result.message).toBe("You don't have the correct permission");
  });
});

exports.resources = resources;
