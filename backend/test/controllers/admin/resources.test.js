const { getAll } = require("@controllers/admin/resources");
const resourcesModel = require("@models/admin/resources");

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
jest.mock("@models/admin/resources");

describe("Testing resource controller with proper permission", () => {
  it("Gets an array of all resources", async () => {
    resourcesModel.findAll.mockResolvedValue(resources);
    const sampleRequest = {
      user: {
        capabilities: ["admin_form_read_all"],
      },
    };
    const sampleReply = {
      code: (code) => {
        return code;
      },
    };
    const result = await getAll(sampleRequest, sampleReply);
    expect(result).toBeInstanceOf(Array);
    result.forEach((resourcesObject) => expect("id" in resourcesObject).toBe(true));
  });
});
// Commenting this test out for now, as fastify hooks is handling permission, so need to re-think.
/*
describe("Testing resource controller with no permission", () => {
  it("Should return a message for not the correct permission.", async () => {
    resourcesModel.findAll.mockResolvedValue(resources);
    const sampleRequest2 = {
      user: {
        capabilities: ["some_capability"],
      },
    };
    const sampleReply = {
      code: (code) => {
        return code;
      },
    };
    const result = await getAll(sampleRequest2, sampleReply);
    expect(result).not.toBeDefined();
  });
});*/

exports.resources = resources;
