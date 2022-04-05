const contacts = require("../../src/database/seeds/04_contacts")
const { getAll, getOne } = require("../../src/controllers/contacts");
const contactsModel = require("../../src/models/contacts.js");

// Mock user DB methods.
jest.mock("../../src/models/contacts");

describe("Testing user controllers", () => {
  it("Gets an array of all contacts", async () => {
    contactsModel.findAll.mockResolvedValue(contacts);
    const sampleRequest = {
      user: {
        capabilities: ["contacts_read_all"],
      },
    };
    const result = await getAll(sampleRequest);
    expect(result.contacts).toBeInstanceOf(Array)
    result.contacts.forEach((contactsObject) => expect("id" in contactsObject).toBe(true));
  });

});
